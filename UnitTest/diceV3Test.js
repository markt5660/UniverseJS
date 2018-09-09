var dice = require('../diceV3.js')

console.log('Roll 1d6:')
var d6 = dice.create(6)
for (var i = 0; i < 5; i++) {
  console.log('roll ' + i + ' = ' + d6(1))
}

console.log('Roll 3d8:')
var d8 = dice.create(8)
for (var j = 0; j < 3; j++) {
  console.log('roll ' + j + ' = ' + d8(3))
}
