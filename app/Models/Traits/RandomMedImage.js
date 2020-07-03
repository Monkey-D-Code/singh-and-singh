'use strict'

class RandomMedImage {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.getRandomImage = async function () {
      const image     =     await this.images().first().fetch();
      return image.image_url;
    }
  }
}

module.exports = RandomMedImage
