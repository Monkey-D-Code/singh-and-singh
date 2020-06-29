'use strict'

class StoreMedicine {
  get rules () {
    return {
      'name' : 'required|string|min:5|max:255',
      'selling_price' : 'required|number',
      'market_price'  : 'required|number',
      'description'   : 'required|string|max:800',
    }
  }

  get messages () {
      return {
        'required' : 'Medicine {{ field }} is required',
        'number'  : '{{ field }} must be a number',
        'string' : "{{ field }} must be a string",
        "name.min" : "Too Short, 5 characters min",
        "name.max" : "Too long, 255 characters max",
        "description.max" : "{{ field }} too long. Maximum 800 characters."
      }
  }
}

module.exports = StoreMedicine
