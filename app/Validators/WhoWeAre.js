'use strict'

class WhoWeAre {
  get rules () {
    return {
      heading : 'required|string|min:5|max:200',
      desc : 'required',
    }
  }

  get messages () {
    return {
      'heading.required': 'A name is necessary',
      'heading.string': 'Name must be a string',
      'heading.min': 'Minimum 5 characters required',
      'heading.max': 'Maximum 200 characters',


      'desc.required' : 'Enter a description',
    }
  }
}

module.exports = WhoWeAre
