var dice = require('../diceV3.js')
var orbit = require('./orbit.js')

var objects = {

  PlanetaryClassEnum: {
    GAS_GIANT: 'G',
    PLANETOID_BELT: 'B',
    TERRESTRIAL: 'T',
    NONE: 'N'
  },

  /**
   * Fill orbits with gas giants
   * (GT:First In, Ch 4, Step 8, Fill Planetary Orbits)
   */
  createGasGiant: function (star, stellarOrbit) {
    var planetaryClass = this.PlanetaryClassEnum.NONE
    var d6 = dice.createD6()

    // Pg 56, Check for gas giants
    var roll = d6(3)
    if (!stellarOrbit.forbidden) {
      if (stellarOrbit.zone === orbit.ZoneEnum.INNER && roll <= 3) {
        planetaryClass = this.PlanetaryClassEnum.GAS_GIANT
      } else if (stellarOrbit.zone === orbit.ZoneEnum.LIFE && roll <= 4) {
        planetaryClass = this.PlanetaryClassEnum.GAS_GIANT
      } else if (stellarOrbit.zone === orbit.ZoneEnum.MIDDLE && roll <= 7) {
        planetaryClass = this.PlanetaryClassEnum.GAS_GIANT
      } else if (stellarOrbit.zone === orbit.ZoneEnum.OUTER && roll <= 14) {
        planetaryClass = this.PlanetaryClassEnum.GAS_GIANT
      }
    }

    var planetarySize = createSize(star, stellarOrbit, planetaryClass)
    var satellites = createSatellites(star, stellarOrbit, planetaryClass, planetarySize.diameter)

    return {
      roll: roll,
      class: planetaryClass,
      size: planetarySize,
      satellites: satellites
    }
  },

  /**
   * Fill remaining orbits with planetoid belts and terrestrial planets
   * (GT: First In, Ch 4, Step 8, Fill Planetary Orbits)
   */
  createBeltOrPlanet: function (star, stellarOrbit, nextOuterObjectGasGiant, nextOuterOrbitForbidden) {
    var planetaryClass = stellarOrbit.planetaryObject.class
    var d6 = dice.createD6()

    // Pg 56, Check for planetoid belts and/or terrestrial planets
    var roll = d6(3)
    if (!stellarOrbit.forbidden && planetaryClass === this.PlanetaryClassEnum.NONE) {
      if (nextOuterObjectGasGiant && roll <= 15) {
        planetaryClass = this.PlanetaryClassEnum.PLANETOID_BELT
      } else if (nextOuterOrbitForbidden && roll <= 12) {
        planetaryClass = this.PlanetaryClassEnum.PLANETOID_BELT
      } else if (roll <= 6) {
        planetaryClass = this.PlanetaryClassEnum.PLANETOID_BELT
      } else {
        planetaryClass = this.PlanetaryClassEnum.TERRESTRIAL
      }
    }

    var planetarySize = createSize(star, stellarOrbit, planetaryClass)
    var satellites = createSatellites(star, stellarOrbit, planetaryClass, planetarySize.diameter)

    return {
      // outerGasGiant: nextOuterObjectGasGiant, // DEBUG
      // outerForbidden: nextOuterOrbitForbidden, // DEBUG
      roll: roll, // DEBUG
      class: planetaryClass,
      diameter: planetarySize.diameter,
      density: planetarySize.density,
      mass: planetarySize.mass,
      surfaceGravity: planetarySize.surfaceGravity,
      satellites: satellites
    }
  }

}

/**
   * Determine the size
   * (GT: First In, Ch 4, Step 9, Planet Size)
 */
var createSize = function (star, stellarOrbit, planetaryClass) {
  var d6 = dice.createD6()

  var diameterMod = 0

  // Diameter Orbit modifier

  if (stellarOrbit.position === 0) {
    // innermost orbit
    diameterMod -= 4
  } else if (stellarOrbit.zone !== 'OUTER') {
    // Inside the Snow Line
    diameterMod -= 2
  } else {
    // Outside the Snow Line
    if (stellarOrbit.zonePosition === 0) {
      diameterMod += 6
    } else if (stellarOrbit.zonePosition === 1) {
      diameterMod += 4
    }
  }

  // Diameter Star modifier

  if (star.luminosityClass === 'V') {
    // Main Sequence star
    if (star.spectralType === 'M') {
      if (star.spectralSubtype === '0') {
        // M0 through M4
        diameterMod -= 1
      } else if (star.spectralSubtype === '5') {
        // M5 through M8
        diameterMod -= 2
      }
    }
  }

  var diameterRoll = d6(2)
  var diameterAdj = d6(2) - 7

  var diameter = 0
  if (planetaryClass === objects.PlanetaryClassEnum.TERRESTRIAL) {
    diameter = (diameterRoll + diameterMod) * 1000
    diameter = (diameter < 1000) ? 1000 : diameter
    diameter += diameterAdj * 100
  } else if (planetaryClass === objects.PlanetaryClassEnum.GAS_GIANT) {
    diameter = (diameterRoll + diameterMod) * 5000
    diameter = (diameter < 25000) ? 25000 : diameter
    diameter += diameterAdj * 500
  }

  var densityMod = 0
  var densityRoll = 0

  var density = 0.0
  if (planetaryClass === objects.PlanetaryClassEnum.TERRESTRIAL) {
    // Density Age modifier
    // -1 for each full 500 million years of the star system's age
    densityMod = (star.stellarAge / 0.5) * -1
    densityRoll = d6(3)

    density = (densityRoll + densityMod) / 10

    // Terrestrial Density table (inside/outside snow line), pg 57
    if (diameter < 3000) {
      density += (stellarOrbit.zone !== 'OUTER') ? 3.2 : 2.3
    } else if (diameter < 6000) {
      density += (stellarOrbit.zone !== 'OUTER') ? 4.4 : 1.6
    } else if (diameter < 9000) {
      density += (stellarOrbit.zone !== 'OUTER') ? 5.3 : 1.8
    } else {
      density += (stellarOrbit.zone !== 'OUTER') ? 5.9 : 1.9
    }
  } else if (planetaryClass === objects.PlanetaryClassEnum.GAS_GIANT) {
    // Gas Giant Denisty table, pg 58
    if (diameter < 40000) {
      density = 1.4
    } else if (diameter < 60000) {
      density = 1.0
    } else if (diameter < 80000) {
      density = 0.7
    } else if (diameter < 85000) {
      density = 1.0
    } else {
      density = 1.4
    }
  }

  density = Math.floor(density * 10) / 10

  var diameterInThousandsCubed = Math.pow((diameter / 1000), 3)
  var mass = (density * diameterInThousandsCubed) / 2750
  mass = Math.floor(mass * 100) / 100

  var surfaceGravity = 0.0228 * density * (diameter / 1000)
  surfaceGravity = Math.floor(surfaceGravity * 100) / 100

  return {
    // diameterMod: diameterMod, // DEBUG
    // diameterRoll: diameterRoll, // DEBUG
    // diameterAdj: diameterAdj, // DEBUG
    diameter: diameter,
    // densityMod: densityMod, // DEBUG
    // densityRoll: densityRoll, // DEBUG
    density: density,
    mass: mass,
    surfaceGravity: surfaceGravity
  }
}

/**
 * Determine satellite counts for planetary body
   * (GT: First In, Ch 4, Step 10: Place Moons

 * @param {*} star 
 * @param {*} stellarOrbit 
 * @param {*} planetaryClass 
 * @param {*} planetaryDiameter 
 */
var createSatellites = function (star, stellarOrbit, planetaryClass, planetaryDiameter) {
  var d6 = dice.createD6()

  var innerFamilyCount = 0
  var innerFamilyMod = 0
  var innerFamilyRoll = 0
  var middleFamilyCount = 0
  var middleFamilyMod = 0
  var middleFamilyRoll = 0
  var outerFamilyCount = 0
  var outerFamilyMod = 0
  var outerFamilyRoll = 0

  var middleFamilyOrbits = []

  // Pg 60, fill orbits with gas giants
  if (planetaryClass === objects.PlanetaryClassEnum.GAS_GIANT) {
  
    // Set modifiers
    if (stellarOrbit.radius < 0.5) {
      middleFamilyMod += -5
      outerFamilyMod += -5
    } else if (stellarOrbit.radius < 0.75) {
      middleFamilyMod += -3
      outerFamilyMod += -3
    } else if (stellarOrbit.radius < 1.5) {
      middleFamilyMod += -1
      outerFamilyMod += -1
    }

    // Modifier not currently supported: nearby planetary belts (page 61)
    // if (a planetary belt (class "B") within 3 AU)
    //    outerFamilyMod += 4

    innerFamilyRoll = d6(2)
    innerFamilyCount = innerFamilyRoll

    middleFamilyRoll = d6(1)
    middleFamilyCount = middleFamilyRoll + middleFamilyMod
    if (middleFamilyCount < 0)
      middleFamilyCount = 0

    outerFamilyRoll = d6(1)
    outerFamilyCount = outerFamilyRoll + outerFamilyMod
    if (outerFamilyCount < 0)
      outerFamilyCount = 0
  
    // Middle Family orbits/sizes
    for (i=0; i < middleFamilyCount; i++) {
      var moonClass = ''
      var moonRadius = 0
      var moonSize = 0

      // Size of large moon
      var moonSizeMod = 0
      if (planetaryDiameter < 2000)
        moonSizeMod = -5
      else if (planetaryDiameter < 4000)
        moonSizeMod = -4
      else if (planetaryDiameter < 6000)
        moonSizeMod = -3
      else if (planetaryDiameter < 8000)
        moonSizeMod = -2
      else if (planetaryDiameter < 10000)
        moonSizeMod = -1
      else if (planetaryDiameter > 60000)
        moonSizeMod = 2
      else if (planetaryDiameter > 40000)
        moonSizeMod = 1

      var moonSizeRoll = d6(2) - 7
      moonSize = moonSizeRoll + moonSizeMod
      if (moonSize <= 0)
        moonSize = 100
      else
        moonSize = moonSize * 1000

      // Keep generating moon's radius until it is
      // at least 2 radii away from every other moon
      // (NOTE: limited to 20 attempts)
      var radiusAttempts = 1
      while (moonClass == '' && radiusAttempts < 20) {
        var moonRadius = d6(3) + 3
        if (moonRadius >= 15) moonRadius += d6(2)

        moonClass = 'L'
        for (j=0; j < middleFamilyOrbits.length && moonClass == 'L'; j++) {
          var radiusDiff = Math.abs(middleFamilyOrbits[j].radius - moonRadius)
          if (radiusDiff < 2) {
            moonClass = ''
          }
        }

        radiusAttempts += 1
      }
      
      middleFamilyOrbits.push({ 
        radius: moonRadius, 
        class: moonClass, 
        size: moonSize
      })
    }

    // Sort middle family results by radius
    middleFamilyOrbits.sort((orbit1, orbit2) => {
      return orbit1.radius - orbit2.radius
    })

  } else if (planetaryClass === objects.PlanetaryClassEnum.TERRESTRIAL) {
  
    // Set modifiers
    if (stellarOrbit.radius < 0.5)
      middleFamilyMod += -99 // should generate no moons
    else if (stellarOrbit.radius < 0.75) 
      middleFamilyMod += -3
    else if (stellarOrbit.radius < 1.5)
      middleFamilyMod += -1
    
    if (planetaryDiameter < 2000)
      middleFamilyMod += -2
    else if (planetaryDiameter < 4000)
      middleFamilyMod += -1
    else if (planetaryDiameter > 9000)
      middleFamilyMod += 1

    // Number of large Moons
    middleFamilyRoll = d6(1) - 4
    middleFamilyCount = middleFamilyRoll + middleFamilyMod
    if (middleFamilyCount < 0) {
      middleFamilyCount = d6(1) - 2 + middleFamilyMod
    }

    // If no large moons, number of small moons
    if (middleFamilyCount < 0) {
      middleFamilyCount = 0
    }
  
  }

  return {
    innerFamilyMod: innerFamilyMod,
    innerFamilyRoll: innerFamilyRoll,
    innerFamilyCount: innerFamilyCount,
    middleFamilyMod: middleFamilyMod,
    middleFamilyRoll: middleFamilyRoll,
    middleFamilyCount: middleFamilyCount,
    outerFamilyMod: outerFamilyMod,
    outerFamilyRoll: outerFamilyRoll,
    outerFamilyCount: outerFamilyCount,
    middleFamilyOrbits: middleFamilyOrbits
  }
}

module.exports = objects
