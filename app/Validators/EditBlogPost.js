'use strict'

class EditBlogPost {
  get rules () {
    return {
      'title'          : 'required|string|min:5|max:255',
      'post_body'      : "required"
    }
  }

  get messages(){
    return {
      'title.required'    :   'A post must have a title',
      'title.string'      :   'Post title must be a string',
      'title.min'         :   'Title too short. Must be minimum 5 characters',
      'title.max'         :   'Title too long. Maximum 255 characters',

      "post_body.required"         : "Post content is required",
    }
  }
}

module.exports = EditBlogPost
