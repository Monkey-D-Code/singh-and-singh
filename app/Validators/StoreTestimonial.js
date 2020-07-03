'use strict'

class StoreTestimonial {
  get rules () {
    return {
      name : 'required|string|min:5|max:200',
      message : 'required',
    }
  }

  get messages () {
    return {
      'name.required': 'A name is necessary',
      'name.string': 'Name must be a string',
      'name.min': 'Minimum 5 characters required',
      'name.max': 'Maximum 200 characters',


      'message.required' : 'Enter a message',
    }
  }
}

module.exports = StoreTestimonial
