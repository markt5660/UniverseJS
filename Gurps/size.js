var dice = require('../diceV3.js')
var orbit = require('./orbit.js')

var methods = {

  create: function (stellarOrbit) {
    console.log('Size for orbit ' + JSON.stringify(stellarOrbit))
    var mod = 0
    if (stellarOrbit.zone === orbit.ZoneEnum.INNER && stellarOrbit.zonePosition === 2) {
      mod -= 4
    } else if (stellarOrbit.zone !== orbit.ZoneEnum.OUTER) {
      mod -= 2
    }
    console.log('SizeMod=' + mod)

    var d6 = dice.createD6()
    var size = d6(2) - 2 + mod

    return {
      size: size
    }
  }

}

module.exports = methods
