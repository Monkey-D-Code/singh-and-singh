'use strict'

class AddBlogPost {
  get rules () {
    return {
      'title'          : 'required|string|min:5|max:255',
      'blogpost_image' : "file|file_ext:png,jpg,jpeg|file_size:10mb|file_types:image",
      'post_body'      : "required"
    }
  }

  get messages(){
    return {
      'title.required'    :   'A post must have a title',
      'title.string'      :   'Post title must be a string',
      'title.min'         :   'Title too short. Must be minimum 5 characters',
      'title.max'         :   'Title too long. Maximum 255 characters',

      "blogpost_image.file"        : "Please choose a file",
      "blogpost_image.file_ext"    : "Unsupported file extention, try .png, .jpg, .jpeg files.",
      "blogpost_image.file_size"   : "File size too big. Max size is 10 mb",
      "blogpost_image.file_types"  : "Please upload a proper image file",

      "post_body.required"         : "Post content is required",
    }
  }
}

module.exports = AddBlogPost
