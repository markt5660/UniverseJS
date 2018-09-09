var star = require('../Gurps/star.js')
var orbit = require('../Gurps/orbit.js')
var size = require('../Gurps/size.js')

var testStar = star.create()

for (var i = 0; i < 10; i++) {
  var orbitDetails = orbit.create(testStar, i)
  console.log(JSON.stringify(orbitDetails))
  if (orbitDetails.zone === orbit.ZoneEnum.MIDDLE) {
    console.log('BINGO')
  }
}

var testOrbitDetails = orbit.create(testStar, 3)
var planetSize = size.create(testOrbitDetails)
console.log(JSON.stringify(planetSize))
