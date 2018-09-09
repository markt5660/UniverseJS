var methods = {

  create: function (size) {
    return function (count) {
      var result = 0
      for (var i = 0; i < count; i++) {
        result += Math.floor(Math.random() * size) + 1
      }
      return result
    }
  },

  createD4: function () {
    return this.create(4)
  },

  createD6: function () {
    return this.create(6)
  },

  createD8: function () {
    return this.create(8)
  },

  createD10: function () {
    return this.create(10)
  },

  createD12: function () {
    return this.create(12)
  },

  createD20: function () {
    return this.create(20)
  },

  createD100: function () {
    return this.create(100)
  }

}

module.exports = methods
