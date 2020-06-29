'use strict'

class StoreCategory {
  get rules () {
    return {
      category_name : 'required|string|min:5|max:100',
      cover_image : 'required|url|max:255',
      description : 'required|string',
    }
  }

  get messages () {
    return {
      'category_name.required': 'A name is necessary',
      'category_name.string': 'Name must be a string',
      'category_name.min': 'Minimum 5 characters required',
      'category_name.max': 'Maximum 100 characters',

      'cover_image.required' : 'Provide a image link',
      'cover_image.url' : 'Enter a valid url',
      'cover_image.max' : 'Url must be within 255 characters',

      'description.required' : 'Enter a description',
      'description.string' : 'Description must be text'
    }
  }
}

module.exports = StoreCategory
