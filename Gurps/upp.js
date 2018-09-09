var sizeTbl = [
  { 'code': '0', 'desc': 'Asteroid/Planetoid Belt' },
  { 'code': '1', 'desc': 'Small (1600km)' },
  { 'code': '2', 'desc': 'Small (Luna; 3200km)' },
  { 'code': '3', 'desc': 'Small (Mercury; 4800km)' },
  { 'code': '4', 'desc': 'Small (Mars; 6400km)' },
  { 'code': '5', 'desc': 'Medium (8000km)' },
  { 'code': '6', 'desc': 'Medium (9600km)' },
  { 'code': '7', 'desc': 'Medium (11200km)' },
  { 'code': '8', 'desc': 'Large (Terra; 12800km)' },
  { 'code': '9', 'desc': 'Large (14400km)' },
  { 'code': 'A', 'desc': 'Large (16000km)' },
  { 'code': 'SGG', 'desc': 'Small Gas Giant' },
  { 'code': 'LGG', 'desc': 'Large Gas Giant ' }
]

var atmTbl = [
  { 'code': '0', 'desc': 'None, vacuum' },
  { 'code': '1', 'desc': 'Trace oxygen-nitrogen' },
  { 'code': '2', 'desc': 'Very thin oxygen-nitrogen, polluted' },
  { 'code': '3', 'desc': 'Very thin oxygen-nitrogen' },
  { 'code': '4', 'desc': 'Thin oxygen-nitrogen, polluted' },
  { 'code': '5', 'desc': 'Thin oxygen-nitrogen' },
  { 'code': '6', 'desc': 'Standard oxygen-nitrogen' },
  { 'code': '7', 'desc': 'Standard oxygen-nitrogen, polluted' },
  { 'code': '8', 'desc': 'Dense oxygen-nitrogen' },
  { 'code': '9', 'desc': 'Dense oxygen-nitrogen, polluted' },
  { 'code': 'A', 'desc': 'Thin, standard or dense reducing or exotic' },
  { 'code': 'B', 'desc': 'Thin, standard or dense corrosive' },
  { 'code': 'C', 'desc': 'Thin, standard or dense highly corrosive such as fluorine' }
]

var hydroTbl = [
  { 'code': '0', 'desc': 'Desert World (0%)' },
  { 'code': '1', 'desc': 'Dry World (10%)' },
  { 'code': '2', 'desc': 'Dry World (20%)' },
  { 'code': '3', 'desc': 'Wet World (30%)' },
  { 'code': '4', 'desc': 'Wet World (40%)' },
  { 'code': '5', 'desc': 'Wet World (50%)' },
  { 'code': '6', 'desc': 'Wet World (60%)' },
  { 'code': '7', 'desc': 'Wet World (70%)' },
  { 'code': '8', 'desc': 'Wet World (80%)' },
  { 'code': '9', 'desc': 'Wet World (90%)' },
  { 'code': 'A', 'desc': 'Water World (100%)' }
]

var popTbl = [
  { 'code': '0', 'desc': 'Low (less than ten)' },
  { 'code': '1', 'desc': 'Low (tens)' },
  { 'code': '2', 'desc': 'Low (hundreds)' },
  { 'code': '3', 'desc': 'Low (thousands)' },
  { 'code': '4', 'desc': 'Moderate (ten thousands' },
  { 'code': '5', 'desc': 'Moderate (hundred thousands)' },
  { 'code': '6', 'desc': 'Moderate (millions)' },
  { 'code': '7', 'desc': 'Moderate (ten millions)' },
  { 'code': '8', 'desc': 'Moderate (hundred millions)' },
  { 'code': '9', 'desc': 'High (billions)' },
  { 'code': 'A', 'desc': 'High (ten billions)' }
]

var govTbl = [
  { 'code': '0', 'desc': 'Anarchy or Clan/Tribal' },
  { 'code': '1', 'desc': 'Corporate State' },
  { 'code': '2', 'desc': 'Athenian democracy' },
  { 'code': '3', 'desc': 'Oligarchy,caste or meritocracy' },
  { 'code': '4', 'desc': 'Representative democrach' },
  { 'code': '5', 'desc': 'Technocracy or cybercracy' },
  { 'code': '6', 'desc': 'Colony, subjugated or military government' },
  { 'code': '7', 'desc': 'Multiple societies' },
  { 'code': '8', 'desc': 'Bureaucracy' },
  { 'code': '9', 'desc': 'Bureaucracy' },
  { 'code': 'A', 'desc': 'Dictatorship' },
  { 'code': 'B', 'desc': 'Dictatorship' },
  { 'code': 'C', 'desc': 'Oligarchy' },
  { 'code': 'D', 'desc': 'Theocracy' }
]

var lawTbl = [
  { 'code': '0', 'desc': 'CR 0 (anarchy)' },
  { 'code': '1', 'desc': 'CR 1 (very free)' },
  { 'code': '2', 'desc': 'CR 1 (very free)' },
  { 'code': '3', 'desc': 'CR 2 (free)' },
  { 'code': '4', 'desc': 'CR 2 (free)' },
  { 'code': '5', 'desc': 'CR 3 (moderated)' },
  { 'code': '6', 'desc': 'CR 4 (controlled)' },
  { 'code': '7', 'desc': 'CR 4 (controlled)' },
  { 'code': '8', 'desc': 'CR 5 (repressive)' },
  { 'code': '9', 'desc': 'CR 6 (total control)' }
]

var techTbl = [
  { 'code': '0', 'desc': 'TL 1-3 (Bronze age - Medieval)' },
  { 'code': '1', 'desc': 'TL 4 (Age of Sail)' },
  { 'code': '2', 'desc': 'TL 5 (Industrial Revolution)' },
  { 'code': '3', 'desc': 'TL 5 (Industrial Revolution)' },
  { 'code': '4', 'desc': 'TL 5 (Industrial Revolution)' },
  { 'code': '5', 'desc': 'TL 6 (Mechanized Age)' },
  { 'code': '6', 'desc': 'TL 6 (Mechanized Age)' },
  { 'code': '7', 'desc': 'TL 7 (Nuclear Age)' },
  { 'code': '8', 'desc': 'TL 8 (Digtal Age)' },
  { 'code': '9', 'desc': 'TL 9 (Digtal Age)' },
  { 'code': 'A', 'desc': 'TL 9 (Microtech Age)' },
  { 'code': 'B', 'desc': 'TL 9 (Microtech Age)' },
  { 'code': 'C', 'desc': 'TL 10 (Robotic Age)' },
  { 'code': 'D', 'desc': 'TL 10 (Robotic Age)' },
  { 'code': 'E', 'desc': 'TL 11 (Exotic Matter Age)' },
  { 'code': 'F', 'desc': 'TL 12 (Whatever the GM Wants!)' },
  { 'code': 'G', 'desc': 'TL 12 (Whatever the GM Wants!)' }
]

var dice = require('../diceV2.js')
var methods = {

  getSize: function (upp) {
    return sizeTbl[upp.size]
  },

  getAtmosphere: function (upp) {
    return atmTbl[upp.atm]
  },

  getHydrographics: function (upp) {
    return hydroTbl[upp.hydro]
  },

  getPopulation: function (upp) {
    return popTbl[upp.pop]
  },

  getGovernment: function (upp) {
    return govTbl[upp.gov]
  },

  getLawLevel: function (upp) {
    return lawTbl[upp.law]
  },

  getTechLevel: function (upp) {
    return techTbl[upp.tech]
  },

  create: function () {
    var d6 = dice.create(6)
    var size = d6.roll(2) - 2

    var atm = (size > 0) ? d6.roll(2) - 7 + size : 0
    atm = (atm > 0) ? atm : 0

    var hydroMod = (atm < 2 || atm > 9) ? -4 : 0
    var hydro = d6.roll(2) - 7 + size + hydroMod
    hydro = (hydro > 0) ? hydro : 0
    hydro = (hydro <= 10) ? hydro : 10

    var pop = d6.roll(2) - 2

    var gov = d6.roll(2) - 7 + pop
    gov = (gov > 0) ? gov : 0

    var law = d6.roll(2) - 7 + gov
    law = (law > 0) ? law : 0

    var techMod = 0
    if (size < 2) {
      techMod += 2
    } else if (size < 5) {
      techMod += 1
    }
    if (atm < 4) {
      techMod += 1
    } else if (atm > 9) {
      techMod += 1
    }
    if (hydro > 9) {
      techMod += 2
    } else if (hydro > 8) {
      techMod += 1
    }
    if (pop > 0 && pop < 6) {
      techMod += 1
    } else if (pop > 9) {
      techMod += 4
    } else if (pop > 8) {
      techMod += 2
    }
    if (gov === 0 || gov === 5) {
      techMod += 1
    } else if (gov === 13) {
      techMod -= 2
    }
    var tech = d6.roll(1) + techMod
    tech = (tech > 20) ? 20 : tech
    tech = (tech < 0) ? 0 : tech

    return {
      'size': size,
      'atm': atm,
      'hydro': hydro,
      'pop': pop,
      'gov': gov,
      'law': law,
      'tech': tech
    }
  }

}

module.exports = methods
