var dice = require('../diceV3.js')
var star = require('./starV2.js')
var orbit = require('./orbit.js')
var planetaryObject = require('./planetaryobject.js')

var objects = {

  /**
   * Generate the number of stars in this system
   * (GT: First In, Ch 4, Step 1: Number of Stars)
   */
  generateStarCount: function () {
    var d6 = dice.createD6()
    var diceRoll = d6(3)
    if (diceRoll < 11) {
      return 1
    } else if (diceRoll < 16) {
      return 2
    } else {
      return 3
    }
  },

  /**
   * Generate the star details for the number of stars indicated
   */
  generateStars: function (count, hasEarthlikeWorld) {
    var primary
    for (var i = 0; i < count; i++) {
      if (i === 0) {
        primary = star.createPrimary(hasEarthlikeWorld)
      } else {
        primary = star.createCompanion(false, primary)
      }
    }
    return primary
  },

  /**
   * Generate the planetary orbits for the given star.
   * (GT: First In, Ch 4, Step 7: Place Planetary Orbits)
   */
  generateOrbits: function (star) {
    // Pg 55 Calculate Bode Sequence and create orbit
    var planetaryOrbit = orbit.create(star, star.orbits.length)
    while (planetaryOrbit.radius < star.outerLimit) {
      star.orbits.push(planetaryOrbit)
      planetaryOrbit = orbit.create(star, star.orbits.length)
      if (star.orbits.length > 50) {
        break
      }
    }

    return star
  },

  /**
   * Pg 55 Exclude orbits that fall within companion stars' forbidden zones
   */
  stripForbiddenOrbits: function (orbits) {
    var beforeCount = orbits.length
    orbits = orbits.filter(function (orbit) {
      return !orbit.forbidden
    })
    var afterCount = orbits.length
    console.log('Number of forbidden orbits = ' + (beforeCount - afterCount))
    return orbits
  },

  /**
   * Populate orbits with planetery bodies' initial class: Gas Giant, Planetoid Belt, Terrestrial
   * (GT: First In, Ch 4, Step 8: Fill Planetary Orbits
   */
  populateOrbits: function (star, orbits) {
    if (orbits) {
      // Pg 56, fill orbits with gas giants
      for (var i = 0; i < orbits.length; i++) {
        orbits[i].planetaryObject = planetaryObject.createGasGiant(star, orbits[i])
      }

      // Pg 56, fill remaining orbits with planetary belts and terrestrial planets
      for (i = 0; i < orbits.length; i++) {
        var nextOuterObjectGasGiant = (i + 1 < orbits.length)
          ? orbits[i + 1].planetaryObject.class === planetaryObject.PlanetaryClassEnum.GAS_GIANT
          : false // default for outermost orbit
        var nextOuterOrbitForbidden = (i + 1 < orbits.length)
          ? orbits[i + 1].forbidden
          : false // default for outermost orbit
        orbits[i].planetaryObject =
          planetaryObject.createBeltOrPlanet(star, orbits[i], nextOuterObjectGasGiant, nextOuterOrbitForbidden)
      }
    }

    return orbits
  }

}

module.exports = objects
