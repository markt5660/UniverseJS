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
  { 'code': '0', 'desc': 'Vacuum' },
  { 'code': '1', 'desc': 'Vacuum (trace)' },
  { 'code': '2', 'desc': 'Vacuum (very thin, tainted)' },
  { 'code': '3', 'desc': 'Vacuum (very thin)' },
  { 'code': '4', 'desc': 'Thin (tainted)' },
  { 'code': '5', 'desc': 'Thin' },
  { 'code': '6', 'desc': 'Standard' },
  { 'code': '7', 'desc': 'Standard (tainted)' },
  { 'code': '8', 'desc': 'Dense' },
  { 'code': '9', 'desc': 'Dense (tainted)' },
  { 'code': 'A', 'desc': 'Exotic' },
  { 'code': 'B', 'desc': 'Exotic (corrosive)' },
  { 'code': 'C', 'desc': 'Exotic (insidious)' },
  { 'code': 'D', 'desc': 'Exotic (dense, high)' },
  { 'code': 'E', 'desc': 'Exotic (ellipsoid)' },
  { 'code': 'F', 'desc': 'Exotic (thin, low)' }
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
  { 'code': '0', 'desc': 'No Government Structure' },
  { 'code': '1', 'desc': 'Company/Corporation' },
  { 'code': '2', 'desc': 'Participating Democracy' },
  { 'code': '3', 'desc': 'Self-Perpetuating Oligarchy' },
  { 'code': '4', 'desc': 'Representative Democracy' },
  { 'code': '5', 'desc': 'Feudal Technocracy' },
  { 'code': '6', 'desc': 'Captive Government/Colony' },
  { 'code': '7', 'desc': 'Balkanization' },
  { 'code': '8', 'desc': 'Civil Service Bureaucracy' },
  { 'code': '9', 'desc': 'Impersonal Bureaucracy' },
  { 'code': 'A', 'desc': 'Charismatic Dictator' },
  { 'code': 'B', 'desc': 'Non-Charismatic Dictator' },
  { 'code': 'C', 'desc': 'Charismatic Oligarchy' },
  { 'code': 'D', 'desc': 'Religious Dictatorship' },
  { 'code': 'E', 'desc': 'Religious Autocracy' },
  { 'code': 'F', 'desc': 'Totalitarian Oligarchy' }
]

var lawTbl = [
  { 'code': '0', 'desc': 'No law (no prohibitions)' },
  { 'code': '1', 'desc': 'Low law (body pistols, explosives, poison gas prohibited)' },
  { 'code': '2', 'desc': 'Low law (portable energy wpns prohibited)' },
  { 'code': '3', 'desc': 'Low law (machineguns, automatic rifles prohibited)' },
  { 'code': '4', 'desc': 'Moderate law (light assault wpns prohibited)' },
  { 'code': '5', 'desc': 'Moderate law (personal concealable wpns prohibited)' },
  { 'code': '6', 'desc': 'Moderate law (all firearms except shotguns prohibited)' },
  { 'code': '7', 'desc': 'Moderate law (all firearms including shotguns prohibited)' },
  { 'code': '8', 'desc': 'High law (blade wpns controlled, no open display)' },
  { 'code': '9', 'desc': 'High law (all wpn possession outside home prohibited)' },
  { 'code': 'A', 'desc': 'Extreme law (all wpn possession prohibited)' },
  { 'code': 'B', 'desc': 'Extreme law (rigid control of civilian movement)' },
  { 'code': 'C', 'desc': 'Extreme law (unrestricted invaion of privacy)' },
  { 'code': 'D', 'desc': 'Extreme law (paramilitary law enforcement)' },
  { 'code': 'E', 'desc': 'Extreme law (full-fledged police state)' },
  { 'code': 'F', 'desc': 'Extreme law (all facets of daily life rigidly controlled)' },
  { 'code': 'G', 'desc': 'Extreme law (severy punishment for petty offences)' },
  { 'code': 'H', 'desc': 'Extreme law (legalized oppressive practices)' },
  { 'code': 'J', 'desc': 'Extreme law (routinely oppressive practices)' },
  { 'code': 'K', 'desc': 'Extreme law (excessively oppressive practices)' },
  { 'code': 'L', 'desc': 'Extreme law (totally oppressive and restrictive)' }
]

var techTbl = [
  { 'code': '0', 'desc': 'Pre-Industrial (primitive)' },
  { 'code': '1', 'desc': 'Pre-Industrial (bronze, iron)' },
  { 'code': '2', 'desc': 'Pre-Industrial (printing press)' },
  { 'code': '3', 'desc': 'Pre-Industrial (basic science)' },
  { 'code': '4', 'desc': 'Industrial (int. combustion)' },
  { 'code': '5', 'desc': 'Industrial (mass production)' },
  { 'code': '6', 'desc': 'Pre-Stellar (nuclear power)' },
  { 'code': '7', 'desc': 'Pre-Stellar (mini. electronics)' },
  { 'code': '8', 'desc': 'Pre-Stellar (superconductors)' },
  { 'code': '9', 'desc': 'Early Stellar (fusion power)' },
  { 'code': 'A', 'desc': 'Early Stellar (jump drives)' },
  { 'code': 'B', 'desc': 'Average Stellar (large starships)' },
  { 'code': 'C', 'desc': 'Average Stellar (sophisticated robots)' },
  { 'code': 'D', 'desc': 'Average Stellar (holo data storage)' },
  { 'code': 'E', 'desc': 'High Stellar (anti-grav cities)' },
  { 'code': 'F', 'desc': 'High Stellar (antagathics)' },
  { 'code': 'G', 'desc': 'High Stellar (global terraforming)' },
  { 'code': 'H', 'desc': 'Extreme Stellar' },
  { 'code': 'J', 'desc': 'Extreme Stellar' },
  { 'code': 'K', 'desc': 'Extreme Stellar' },
  { 'code': 'L', 'desc': 'Extreme Stellar' }
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
