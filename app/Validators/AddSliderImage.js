'use strict'

class AddSliderImage {
  get rules () {
    return {
      "slider_image"   : "file|file_ext:png,jpg,jpeg|file_size:10mb|file_types:image",
      "caption"        : "required|min:3|string|max:255",
      "heading"        :  "required|min:3|string|max:255"
    }
  }

  get messages ( ) {
    return {
      "slider_image.file"        : "Please choose a file",
      "slider_image.file_ext"    : "Unsupported file extention, try .png, .jpg, .jpeg files.",
      "slider_image.file_size"   : "File size too big. Max size is 10 mb",
      "slider_image.file_types"  : "Please upload a proper image file",

      "caption.required"    : "A caption is required",
      "caption.min"         : "{{ field }} too short. Minimum 3 characters",
      "caption.max"         : "{{ field }} too long. Maximum 255 characters",

      "heading.required"    : "A caption is required",
      "heading.min"         : "{{ field }} too short. Minimum 3 characters",
      "heading.max"         : "{{ field }} too long. Maximum 255 characters",
    }
  }
}

module.exports = AddSliderImage
