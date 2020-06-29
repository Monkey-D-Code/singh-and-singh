'use strict'

class StoreMedicineImage {
  get rules () {
    return {
      "medicine_image" : "file|file_ext:png,jpg,jpeg|file_size:10mb|file_types:image",
      "caption"        : "required|min:3|string|max:255",
    }
  }

  get messages ( ) {
    return {
      "medicine_image.file"        : "Please choose a file",
      "medicine_image.file_ext"    : "Unsupported file extention, try .png, .jpg, .jpeg files.",
      "medicine_image.file_size"   : "File size too big. Max size is 10 mb",
      "medicine_image.file_types"  : "Please upload a proper image file",

      "caption.required"    : "A caption is required",
      "caption.min"         : "{{ field }} too short. Minimum 3 characters",
      "caption.max"         : "{{ field }} too long. Maximum 255 characters",
    }
  }
}

module.exports = StoreMedicineImage
