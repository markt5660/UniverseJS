var starsystem = require('../Gurps/starsystemV2.js')

var numStars = starsystem.generateStarCount()
var testSystem = starsystem.generateStars(numStars, true)
testSystem = starsystem.generateOrbits(testSystem)
testSystem.orbits = starsystem.populateOrbits(testSystem, testSystem.orbits)

console.log('NumStars = ' + numStars)
console.log('NumPrimaryOrbits = ' + testSystem.orbits.length)
console.log(JSON.stringify(testSystem))
