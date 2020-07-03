'use strict'

class StoreBrand {
  get rules () {
    return {
      name : 'required|string|min:5|max:100',
      cover_image : 'required|url|max:255',
      about : 'string',
    }
  }

  get messages () {
    return {
      'name.required': 'A name is necessary',
      'name.string': 'Name must be a string',
      'name.min': 'Minimum 5 characters required',
      'name.max': 'Maximum 100 characters',

      'cover_image.required' : 'Provide a image link',
      'cover_image.url' : 'Enter a valid url',
      'cover_image.max' : 'Url must be within 255 characters',

      'about.string' : 'Description must be text'
    }
  }
}

module.exports = StoreBrand
