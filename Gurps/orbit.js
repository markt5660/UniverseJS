var objects = {

  /**
   * Orbital zones
   */
  ZoneEnum: Object.freeze({
    INNER: 'INNER',
    LIFE: 'LIFE',
    MIDDLE: 'MIDDLE',
    OUTER: 'OUTER'
  }),

  /**
   * Create an orbit for the given star and orbitalPosition (value is 0+)
   */
  create: function (star, orbitalPosition) {
    // D = baseOrbitalRadius
    // B = bodeConstant
    // 0  D+0B (0 ** 0 = 0) special case
    // 1  D+1B (2 ** 0 = 1)
    // 2  D+2B (2 ** 1 = 2)
    // 3  D+4B (2 ** 2 = 4)
    // 4  D+8B (2 ** 3 = 8)
    // 5  D+16B(2 ** 4 = 16)
    var bodeMultiple = (orbitalPosition === 0) ? 0 : Math.pow(2, (orbitalPosition - 1))
    var radius = star.baseOrbitalRadius + (bodeMultiple * star.bodeConstant)
    var forbidden = isForbidden(radius, star.companions)

    // Radius result rounded to 2 decimal places
    // var roundRadius = Math.round(radius * 100) / 100

    var zone = ''
    var innerBoundary = -1
    if (radius < star.innerLife) {
      zone = this.ZoneEnum.INNER
      innerBoundary = -1
    } else if (radius < star.outerLife) {
      zone = this.ZoneEnum.LIFE
      innerBoundary = star.innerLife
    } else if (radius < star.snowLine) {
      zone = this.ZoneEnum.MIDDLE
      innerBoundary = star.outerLife
    } else {
      zone = this.ZoneEnum.OUTER
      innerBoundary = star.snowLine
    }

    // relative position of orbit within its zone
    var boundaryPosition = orbitalPosition - 1
    var boundaryBodeMultiple = (boundaryPosition === 0) ? 0 : Math.pow(2, (boundaryPosition - 1))
    var boundaryRadius = star.baseOrbitalRadius + (boundaryBodeMultiple * star.bodeConstant)
    while (boundaryPosition >= 0 && boundaryRadius >= innerBoundary) {
      boundaryPosition--
      boundaryBodeMultiple = (boundaryPosition === 0) ? 0 : Math.pow(2, (boundaryPosition - 1))
      boundaryRadius = star.baseOrbitalRadius + (boundaryBodeMultiple * star.bodeConstant)
    }
    var zonePosition = orbitalPosition - boundaryPosition - 1

    return {
      'position': orbitalPosition,
      'bodeMultiple': bodeMultiple,
      'radius': Math.round(radius * 100) / 100,
      'zone': zone,
      'zonePosition': zonePosition,
      'forbidden': forbidden
    }
  }
}

/**
 * Determine if the given orbital radius falls within one of the 'forbidden'
 * zones defined by the companion orbits.
 * @param {*} orbitRadius
 * @param {*} companions
 */
var isForbidden = function (orbitRadius, companions) {
  var result = false
  for (var i = 0; i < companions.length; i++) {
    if (companions[i].minForbiddenDistance && companions[i].maxForbiddenDistance) {
      if (orbitRadius >= companions[i].minForbiddenDistance && orbitRadius <= companions[i].maxForbiddenDistance) {
        result = true
        break
      }
    }
  }
  return result
}

module.exports = objects
