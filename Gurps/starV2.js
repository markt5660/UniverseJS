var dice = require('../diceV3.js')

var objects = {

  LuminosityClassEnum: {
    SUPERGIANT: 'I',
    GIANT: 'III',
    MAIN_SEQUENCE: 'V',
    DWARF: 'D'
  },

  SpectralTypeEnum: {
    HOT_BLUE: 'O',
    BLUE: 'B',
    WHITE: 'A',
    YELLOW_WHITE: 'F',
    YELLOW: 'G',
    ORANGE: 'K',
    RED: 'M'
  },

  SeparationEnum: {
    NONE: 0.0,
    VERY_CLOSE: 0.05,
    CLOSE: 0.5,
    MODERATE: 2,
    WIDE: 10,
    DISTANT: 50
  },

  /**
   * Generate the stats for the primary star.
   * May be part of a primary-companion binary.
   * @param {*} hasEarthlikeWorld
   */
  createPrimary: function (hasEarthlikeWorld) {
    // Pg 47 Primary Star Type
    var stellarType = createPrimaryStellarType(hasEarthlikeWorld)

    // Pg 50 Stellar Characteristics
    var stellarCharacteristics = getStellarCharacteristics(stellarType)

    // Pg 54 Orbital Zones
    var zoneLimits = createZoneLimits(stellarType)

    // Pg 55 Bode Constant and Base Orbital Radius
    var bodeSettings = createBodeSettings(true, zoneLimits.innerLimit)

    return {
      'isPrimary': true,
      'luminosityClass': stellarType.luminosityClass,
      'spectralType': stellarType.spectralType,
      'spectralSubtype': stellarType.spectralSubtype,
      'stellarTemperature': stellarCharacteristics.temperature,
      'stellarLuminosity': stellarCharacteristics.luminosity,
      'stellarMass': stellarCharacteristics.mass,
      'stellarRadius': stellarCharacteristics.radius,
      'stellarAge': stellarCharacteristics.age,
      'innerLimit': zoneLimits.innerLimit,
      'innerLife': zoneLimits.innerLife,
      'outerLife': zoneLimits.outerLife,
      'snowLine': zoneLimits.snowLine,
      'outerLimit': zoneLimits.outerLimit,
      'bodeConstant': bodeSettings.bodeConstant,
      'baseOrbitalRadius': bodeSettings.baseOrbitalRadius,
      'companions': [],
      'orbits': []
    }
  },

  /**
   * Generate the stats for a companion star and attach them to the given primary
   */
  createCompanion: function (hasEarthlikeWorld, primary) {
    var d6 = dice.createD6()

    // Pg 48 Companion Star Type
    var stellarType = createCompanionStellarType(false, primary)

    // Pg 50 Stellar Characteristics
    var stellarCharacteristics = getStellarCharacteristics(stellarType)

    // Pg 49 Orbital Separation and Avg Separation Radius
    var primaryOrbitSeparation = createSeparation(primary.companions.length + 1)
    var primaryAvgOrbitRadius = d6(2) * primaryOrbitSeparation

    // Pg 49 Eccentricity and Separation Radius limits (min and max)
    var primaryOrbitEccentricity = createEccentricity(primaryOrbitSeparation)
    var minPrimarySeparation = (1 - primaryOrbitEccentricity) * primaryAvgOrbitRadius
    var maxPrimarySeparation = (1 + primaryOrbitEccentricity) * primaryAvgOrbitRadius

    // Pg 54 Forbidden Zones
    var minForbiddenDistance = minPrimarySeparation / 3
    var maxForbiddenDistance = maxPrimarySeparation * 3

    primary.companions.push({
      'isPrimary': false,
      'luminosityClass': stellarType.luminosityClass,
      'spectralType': stellarType.spectralType,
      'spectralSubtype': stellarType.spectralSubtype,
      'stellarTemperature': stellarCharacteristics.temperature,
      'stellarLuminosity': stellarCharacteristics.luminosity,
      'stellarMass': stellarCharacteristics.mass,
      'stellarRadius': stellarCharacteristics.radius,
      'stellarAge': stellarCharacteristics.age,
      'primarySeparation': primaryOrbitSeparation,
      'primaryAvgOrbitRadius': Math.round(primaryAvgOrbitRadius * 100) / 100,
      'primaryOrbitEccentricity': primaryOrbitEccentricity,
      'minPrimarySeparation': Math.round(minPrimarySeparation * 100) / 100,
      'maxPrimarySeparation': Math.round(maxPrimarySeparation * 100) / 100,
      'minForbiddenDistance': Math.round(minForbiddenDistance * 100) / 100,
      'maxForbiddenDistance': Math.round(maxForbiddenDistance * 100) / 100,
      'innerLimit': 0,
      'innerLife': 0,
      'outerLife': 0,
      'snowLine': 0,
      'outerLimit': 0,
      'companions': [],
      'orbits': []
    })

    return primary
  }
}

/**
 * Generate Luminosity Class, Spectral Type and Subtype for Primary star
 * (GT: First In, Ch 4, Step 2: Primary Star Type)
 * @param {*} hasEarthlikeWorld
 */
var createPrimaryStellarType = function (hasEarthlikeWorld) {
  var d6 = dice.createD6()

  // pg47 Luminosity Class
  var luminosityClass = '?'

  var luminosityClassRoll = d6(3)
  console.log('primaryLuminosityRoll  = ' + luminosityClassRoll)
  if (luminosityClassRoll < 4) {
    luminosityClass = objects.LuminosityClassEnum.GIANT
  } else if (luminosityClassRoll < 15) {
    luminosityClass = objects.LuminosityClassEnum.MAIN_SEQUENCE
  } else {
    luminosityClass = objects.LuminosityClassEnum.DWARF
  }

  // pg 47 Spectral Type
  var spectralType = '?'

  if (luminosityClass === 'D') {
    spectralType = ''
  } else {
    var spectralTypeRoll =
      (luminosityClass === objects.LuminosityClassEnum.MAIN_SEQUENCE && hasEarthlikeWorld)
        ? d6(1) + 5
        : d6(3)
    console.log('primarySpectralRoll  = ' + spectralTypeRoll)

    if (spectralTypeRoll < 5) {
      spectralType = objects.SpectralTypeEnum.WHITE
    } else if (spectralTypeRoll < 7) {
      spectralType = objects.SpectralTypeEnum.YELLOW_WHITE
    } else if (spectralTypeRoll < 9) {
      spectralType = objects.SpectralTypeEnum.YELLOW
    } else if (spectralTypeRoll < 11) {
      spectralType = objects.SpectralTypeEnum.ORANGE
    } else {
      spectralType = objects.SpectralTypeEnum.RED
    }
  }

  // pg 47 Spectral Subtype
  var spectralSubtypeRoll = d6(1)
  var spectralSubtype = (spectralSubtypeRoll < 4) ? '0' : '5'

  return {
    luminosityClass: luminosityClass,
    spectralType: spectralType,
    spectralSubtype: spectralSubtype
  }
}

/**
 * Generate Luminosity Class, Spectral Type and Subtype for Companion star
 * (GT: First In, Ch 4, Step 3: Companion Star Type)
 * @param {*} hasEarthlikeWorld
 * @param {*} primary
 */
var createCompanionStellarType = function (hasEarthlikeWorld, primary) {
  var d6 = dice.createD6()

  // pg 48 Luminosity Class
  var luminosityLookupTable = [
    objects.LuminosityClassEnum.MAIN_SEQUENCE,
    objects.LuminosityClassEnum.GIANT,
    objects.LuminosityClassEnum.SUPERGIANT
  ]
  var primaryLuminosityIndex = luminosityLookupTable.findIndex(function (element) {
    return element === primary.luminosityClass
  })
  console.log('primaryLuminosityIndex = ' + primaryLuminosityIndex)

  var luminosityClass = '?'
  var spectralType = '?'

  var companionLuminosityIndex = 0
  var companionLuminosityRoll = d6(1)
  switch (companionLuminosityRoll) {
    case 6:
      companionLuminosityIndex = primaryLuminosityIndex - 2
      break
    case 5:
      companionLuminosityIndex = primaryLuminosityIndex - 1
      break
    default:
      companionLuminosityIndex = primaryLuminosityIndex
  }
  console.log('companionLuminosityRoll  = ' + companionLuminosityRoll)
  console.log('companionLuminosityIndex = ' + companionLuminosityIndex)

  if (companionLuminosityIndex < 0) {
    if (d6(1) < 5) {
      luminosityClass = objects.LuminosityClassEnum.MAIN_SEQUENCE
      spectralType = objects.SpectralTypeEnum.RED
    } else {
      luminosityClass = objects.LuminosityClassEnum.DWARF
      spectralType = ''
    }
  } else {
    luminosityClass = luminosityLookupTable[companionLuminosityIndex]
  }

  // pg 48 Spectral Type
  if (spectralType === '?') {
    var spectralLookupTable = [
      objects.SpectralTypeEnum.RED,
      objects.SpectralTypeEnum.ORANGE,
      objects.SpectralTypeEnum.YELLOW,
      objects.SpectralTypeEnum.YELLOW_WHITE,
      objects.SpectralTypeEnum.WHITE,
      objects.SpectralTypeEnum.BLUE,
      objects.SpectralTypeEnum.HOT_BLUE
    ]
    var primarySpectralIndex = spectralLookupTable.findIndex(function (element) {
      return element === primary.spectralType
    })
    console.log('primarySpectralIndex = ' + primarySpectralIndex)

    var companionSpectralIndex = 0
    var companionSpectralRoll = d6(1)
    switch (companionSpectralRoll) {
      case 6:
        companionSpectralIndex = primarySpectralIndex - 3
        break
      case 5:
        companionSpectralIndex = primarySpectralIndex - 2
        break
      case 4:
        companionSpectralIndex = primarySpectralIndex - 1
        break
      default:
        companionSpectralIndex = primarySpectralIndex
    }
    console.log('companionSpectralRoll  = ' + companionSpectralRoll)
    console.log('companionSpectralIndex = ' + companionSpectralIndex)

    if (companionSpectralIndex < 0) {
      spectralType = objects.SpectralTypeEnum.RED
    } else {
      spectralType = spectralLookupTable[companionSpectralIndex]
    }
  }

  // Pg 48 Spectral Subtype
  var spectralSubtypeRoll = d6(1)
  var spectralSubtype = (spectralSubtypeRoll < 4) ? '0' : '5'
  if (spectralSubtype === '5' && primary.spectralSubtype === '0' && spectralType === primary.spectralType) {
    spectralSubtype = '0'
  }

  return {
    luminosityClass: luminosityClass,
    spectralType: spectralType,
    spectralSubtype: spectralSubtype
  }
}

/**
 * Determine stellar characteristics for given star
 * (GT: First In, Ch 4, Step 5: Stellar Characteristics)
 * @param {*} luminosityClass
 * @param {*} spectralType
 * @param {*} spectralSubtype
 */
var getStellarCharacteristics = function (stellarType) {
  // Pg 50 Class V Stellar Characteristics Table
  var classVCharacteristics = {
    'O5': {'temperature': 45000, 'luminosity': 790000, 'mass': 30, 'radius': 0.14, 'lifespan': 0.0},
    'B5': {'temperature': 15000, 'luminosity': 830, 'mass': 5.4, 'radius': 0.040, 'lifespan': 0.1},
    'A0': {'temperature': 9500, 'luminosity': 54, 'mass': 2.7, 'radius': 0.025, 'lifespan': 0.5},
    'A5': {'temperature': 8200, 'luminosity': 14, 'mass': 1.9, 'radius': 0.017, 'lifespan': 1.4},
    'F0': {'temperature': 7200, 'luminosity': 6.5, 'mass': 1.6, 'radius': 0.015, 'lifespan': 2.5},
    'F5': {'temperature': 6400, 'luminosity': 2.9, 'mass': 1.3, 'radius': 0.013, 'lifespan': 4.5},
    'G0': {'temperature': 6000, 'luminosity': 1.5, 'mass': 1.1, 'radius': 0.011, 'lifespan': 7.3},
    'G5': {'temperature': 5800, 'luminosity': 0.79, 'mass': 0.94, 'radius': 0.0082, 'lifespan': 12},
    'K0': {'temperature': 5300, 'luminosity': 0.42, 'mass': 0.81, 'radius': 0.0071, 'lifespan': 19},
    'K5': {'temperature': 4400, 'luminosity': 0.15, 'mass': 0.62, 'radius': 0.0062, 'lifespan': 41},
    'M0': {'temperature': 3900, 'luminosity': 0.063, 'mass': 0.50, 'radius': 0.0051, 'lifespan': 79},
    'M5': {'temperature': 3200, 'luminosity': 0.011, 'mass': 0.21, 'radius': 0.0032, 'lifespan': 190},
    'M8': {'temperature': 2600, 'luminosity': 0.001, 'mass': 0.063, 'radius': 0.0014, 'lifespan': 630}
  }

  // Pg 50 Class III Stellar Characteristics Table
  var classIIICharacteristics = {
    'B5': {'temperature': 15000, 'luminosity': 1800, 'mass': 7.0, 'radius': 0.058, 'age': 0.0},
    'A0': {'temperature': 9500, 'luminosity': 106, 'mass': 4.0, 'radius': 0.035, 'age': 0.2},
    'A5': {'temperature': 8200, 'luminosity': 43, 'mass': 2.5, 'radius': 0.030, 'age': 0.6},
    'F0': {'temperature': 7200, 'luminosity': 20, 'mass': 1.5, 'radius': 0.027, 'age': 3.0},
    'F5': {'temperature': 6400, 'luminosity': 17, 'mass': 1.0, 'radius': 0.031, 'age': 10},
    'G0': {'temperature': 6000, 'luminosity': 34, 'mass': 1.0, 'radius': 0.050, 'age': 10},
    'G5': {'temperature': 5800, 'luminosity': 43, 'mass': 1.1, 'radius': 0.060, 'age': 7.5},
    'K0': {'temperature': 5300, 'luminosity': 60, 'mass': 1.1, 'radius': 0.085, 'age': 7.5},
    'K5': {'temperature': 4400, 'luminosity': 220, 'mass': 1.2, 'radius': 0.24, 'age': 5.8},
    'M0': {'temperature': 3900, 'luminosity': 330, 'mass': 1.2, 'radius': 0.37, 'age': 5.8},
    'M5': {'temperature': 3200, 'luminosity': 930, 'mass': 1.4, 'radius': 0.92, 'age': 3.6},
    'M8': {'temperature': 2600, 'luminosity': 1100, 'mass': 1.6, 'radius': 1.5, 'age': 2.4}
  }

  // Pg 51 Class I Stellar Characteristics Table
  var classICharacteristics = {
    'O5': {'temperature': 45000, 'luminosity': 1100000, 'mass': 70, 'radius': 0.16, 'age': 0.0},
    'B5': {'temperature': 15000, 'luminosity': 52000, 'mass': 20, 'radius': 0.31, 'age': 0.0},
    'A0': {'temperature': 9500, 'luminosity': 35000, 'mass': 16, 'radius': 0.64, 'age': 0.0},
    'A5': {'temperature': 8200, 'luminosity': 35000, 'mass': 13, 'radius': 0.86, 'age': 0.0},
    'F0': {'temperature': 7200, 'luminosity': 32000, 'mass': 12, 'radius': 1.1, 'age': 0.0},
    'F5': {'temperature': 6400, 'luminosity': 32000, 'mass': 10, 'radius': 1.3, 'age': 0.0},
    'G0': {'temperature': 6000, 'luminosity': 30000, 'mass': 10, 'radius': 1.5, 'age': 0.0},
    'G5': {'temperature': 5800, 'luminosity': 29000, 'mass': 12, 'radius': 1.6, 'age': 0.0},
    'K0': {'temperature': 5300, 'luminosity': 29000, 'mass': 13, 'radius': 1.9, 'age': 0.0},
    'K5': {'temperature': 4400, 'luminosity': 38000, 'mass': 13, 'radius': 3.1, 'age': 0.0},
    'M0': {'temperature': 3900, 'luminosity': 41000, 'mass': 13, 'radius': 4.1, 'age': 0.0},
    'M5': {'temperature': 3200, 'luminosity': 300000, 'mass': 19, 'radius': 17, 'age': 0.0},
    'M8': {'temperature': 2600, 'luminosity': 500000, 'mass': 24, 'radius': 32, 'age': 0.0}
  }

  var key = (stellarType.luminosityClass === 'D')
    ? stellarType.luminosityClass
    : stellarType.spectralType.concat(stellarType.spectralSubtype)

  if (stellarType.luminosityClass === 'I') {
    // Pg 50-52 Class I (Supergiant) lookup
    return {
      temperature: classICharacteristics[key].temperature,
      luminosity: classICharacteristics[key].luminosity,
      mass: classICharacteristics[key].mass,
      radius: classICharacteristics[key].radius,
      age: classICharacteristics[key].age
    }
  } else if (stellarType.luminosityClass === 'III') {
    // Pg 50-52 Class III (Giant) lookup
    return {
      temperature: classIIICharacteristics[key].temperature,
      luminosity: classIIICharacteristics[key].luminosity,
      mass: classIIICharacteristics[key].mass,
      radius: classIIICharacteristics[key].radius,
      age: classIIICharacteristics[key].age
    }
  } else if (stellarType.luminosityClass === 'V') {
    // Pg 52 Class V (Main Sequence) age calculation
    var d6 = dice.createD6()
    var baseAgeRoll = d6(3)
    var baseAge = 0
    if (baseAgeRoll > 17) {
      baseAge = 12
    } else if (baseAgeRoll > 14) {
      baseAge = 9
    } else if (baseAgeRoll > 10) {
      baseAge = 6
    } else if (baseAgeRoll > 6) {
      baseAge = 3
    }
    baseAge = baseAge + ((d6(1) - 1) * 0.5)

    // Pg 50-52 Class V (Main Sequence) lookup plus aga calculation
    return {
      temperature: classVCharacteristics[key].temperature,
      luminosity: classVCharacteristics[key].luminosity,
      mass: classVCharacteristics[key].mass,
      radius: classVCharacteristics[key].radius,
      age: Math.min(classVCharacteristics[key].lifespan, baseAge)
    }
  }

  // Default (Dwarf) return
  return {
    temperature: 0.0,
    luminosity: 0.0,
    mass: 0.0,
    radius: 0.0,
    age: 0
  }
}

/**
 * Determine orbital zones for the star
 * (GT: First In, Ch 4, Step 6: Locate Orbital Zones)
 * @param {*} luminosityClass
 * @param {*} spectralType
 * @param {*} spectralSubtype
 */
var createZoneLimits = function (stellarType) {
  var key = (stellarType.luminosityClass !== 'V')
    ? stellarType.luminosityClass
    : stellarType.spectralType.concat(stellarType.spectralSubtype)
  console.log('Orbital Zones for = ' + key)

  // Pg 54 Orbital Zone Table
  var zoneLimitLookup = {
    'A0': {'innerLimit': 0.540, 'innerLife': 7.00, 'outerLife': 9.60, 'snowLine': 37.0, 'outerLimit': 110},
    'A5': {'innerLimit': 0.380, 'innerLife': 3.60, 'outerLife': 4.90, 'snowLine': 19.0, 'outerLimit': 76},
    'F0': {'innerLimit': 0.320, 'innerLife': 2.40, 'outerLife': 3.30, 'snowLine': 13.0, 'outerLimit': 64},
    'F5': {'innerLimit': 0.260, 'innerLife': 1.60, 'outerLife': 2.20, 'snowLine': 8.50, 'outerLimit': 52},
    'G0': {'innerLimit': 0.220, 'innerLife': 1.20, 'outerLife': 1.60, 'snowLine': 6.10, 'outerLimit': 44},
    'G5': {'innerLimit': 0.190, 'innerLife': 0.84, 'outerLife': 1.20, 'snowLine': 4.40, 'outerLimit': 38},
    'K0': {'innerLimit': 0.160, 'innerLife': 0.62, 'outerLife': 0.84, 'snowLine': 3.20, 'outerLimit': 32},
    'K5': {'innerLimit': 0.120, 'innerLife': 0.37, 'outerLife': 0.50, 'snowLine': 1.90, 'outerLimit': 25},
    'M0': {'innerLimit': 0.100, 'innerLife': 0.24, 'outerLife': 0.33, 'snowLine': 1.30, 'outerLimit': 20},
    'M5': {'innerLimit': 0.042, 'innerLife': 0.10, 'outerLife': 0.14, 'snowLine': 0.52, 'outerLimit': 10},
    'M8': {'innerLimit': 0.013, 'innerLife': 0.03, 'outerLife': 0.04, 'snowLine': 0.16, 'outerLimit': 10}
  }

  return (key in zoneLimitLookup)
    ? zoneLimitLookup[key]
    : {
      'innerLimit': 0,
      'innerLife': 0,
      'outerLife': 0,
      'snowLine': 0,
      'outerLimit': 0
    }
}

/**
 * Generate the separation class for the companion star.
 * (GT: First In, Ch 4, Step 4: Companion Star Orbits)
 * @param {*} companionNumber
 */
var createSeparation = function (companionNumber) {
  // Pg 49 Orbital Separation Table
  var separationLookup = [
    objects.SeparationEnum.NONE, // 0
    objects.SeparationEnum.NONE, // 1
    objects.SeparationEnum.NONE, // 2
    objects.SeparationEnum.VERY_CLOSE, // 3
    objects.SeparationEnum.VERY_CLOSE, // 4
    objects.SeparationEnum.VERY_CLOSE, // 5
    objects.SeparationEnum.VERY_CLOSE, // 6
    objects.SeparationEnum.CLOSE,      // 7
    objects.SeparationEnum.CLOSE,      // 8
    objects.SeparationEnum.CLOSE,      // 9
    objects.SeparationEnum.MODERATE,   // 10
    objects.SeparationEnum.MODERATE,   // 11
    objects.SeparationEnum.WIDE,       // 12
    objects.SeparationEnum.WIDE,       // 13
    objects.SeparationEnum.WIDE,       // 14
    objects.SeparationEnum.DISTANT     // 15
  ]

  // Check for the 'no companion' option
  if (typeof companionNumber === 'undefined' || companionNumber < 1) {
    return objects.SeparationEnum.NONE
  }

  var separationMod = 0
  if (companionNumber > 1) {
    separationMod = 6
  }

  var d6 = dice.createD6()
  var separationRoll = d6(3) + separationMod
  if (separationRoll > 15) {
    separationRoll = 15
  }

  return separationLookup[separationRoll]
}

/**
 * Gemerate the orbital eccentricity of the companion star.
 * (GT: First In, Ch 4, Step 4: Conmpanion Star Orbits)
 * @param {*} separation
 */
var createEccentricity = function (separation) {
  // Pg 49 Orbital Eccentricity Table
  var eccentricityLookup = [
    0.05, // 0
    0.05, // 1
    0.05, // 2
    0.05, // 3
    0.1,  // 4
    0.2,  // 5
    0.3,  // 6
    0.4,  // 7
    0.4,  // 8
    0.5,  // 9
    0.5,  // 10
    0.5,  // 11
    0.6,  // 12
    0.6,  // 13
    0.7,  // 14
    0.7,  // 15
    0.8,  // 16
    0.9,  // 17
    0.95  // 18
  ]

  var eccentricityMod = 0
  if (separation === objects.SeparationEnum.VERY_CLOSE) {
    eccentricityMod = -6
  } else if (separation === objects.SeparationEnum.CLOSE) {
    eccentricityMod = -4
  } else if (separation === objects.SeparationEnum.MODERATE) {
    eccentricityMod = -2
  }
  var d6 = dice.createD6()
  var eccentricityRoll = d6(3) + eccentricityMod
  if (eccentricityRoll < 0) {
    eccentricityRoll = 0
  } else if (eccentricityRoll > 18) {
    eccentricityRoll = 18
  }

  return eccentricityLookup[eccentricityRoll]
}

/**
 * Generate the Bode Sequence multiplier and star's Base Orbital Radius
 * (GT: First In, Ch 4, Step 7: Place Planetary Orbits)
 * @param {*} isPrimary
 * @param {*} innerLimit
 */
var createBodeSettings = function (isPrimary, innerLimit) {
  var d6 = dice.createD6()

  var bodeConstant = 0.0
  var baseOrbitalRadius = 0.0

  if (isPrimary) {
    // Page 55 Calculate Bode Constant
    var bodeRoll = d6(1)
    console.log('bodeRoll = ' + bodeRoll)
    if (bodeRoll < 3) {
      bodeConstant = 0.3
    } else if (bodeRoll < 5) {
      bodeConstant = 0.35
    } else {
      bodeConstant = 0.4
    }

    // Page 55 Calculate Base Orbital Radius
    var radiusRoll = d6(1) + 1
    console.log('radiusRoll = ' + radiusRoll)
    baseOrbitalRadius = (radiusRoll / 2.0) * innerLimit
  }

  return {
    'bodeConstant': bodeConstant,
    'baseOrbitalRadius': Math.round(baseOrbitalRadius * 100) / 100
  }
}

module.exports = objects
