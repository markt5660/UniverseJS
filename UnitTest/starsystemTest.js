var starsystem = require('../Gurps/starsystem.js')

var numStars = starsystem.generateStarCount()
var testSystem = starsystem.generateStars(numStars, true)

console.log('NumStars = ' + numStars)
console.log('NumPrimaryOrbits = ' + testSystem.orbits.length)
console.log(JSON.stringify(testSystem))
