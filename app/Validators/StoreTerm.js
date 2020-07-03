'use strict'

class StoreTerm {
  get rules () {
    return {
      heading : 'required|string|min:5|max:200',
      desc : 'required|min:5',
    }
  }

  get messages () {
    return {
      'heading.required': 'A name is necessary',
      'heading.string': 'Name must be a string',
      'heading.min': 'Minimum 5 characters required',
      'heading.max': 'Maximum 200 characters',


      'desc.required' : 'Enter a message',
      'desc.min'      : 'Minimum 5 characters',
    }
  }
}

module.exports = StoreTerm
