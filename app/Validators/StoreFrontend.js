'use strict'

class StoreFrontend {
  get rules () {
    return {
      'company_name'          : 'required|string|min:5|max:255',
      'logo'              : "file|file_ext:png,jpg,jpeg|file_size:10mb|file_types:image",
      'email'                 : "required|email|max:200",
      'phone'                 : "required|min:10|max:10|number",
      'address'               : "required",
      'facebook_link'         : "url",
    }
  }

  get messages(){
    return {
      'company_name.required'      :     "Company Name is necessary",
      'company_name.min'           :     "5 characters minimum",
      'company_name.max'           :     "255 characters maximum",

      "logo.file"        : "Please choose a file",
      "logo.file_ext"    : "Unsupported file extention, try .png, .jpg, .jpeg files.",
      "logo.file_size"   : "File size too big. Max size is 10 mb",
      "logo.file_types"  : "Please upload a proper image file", 
      
      'email.required'        :     "An Email is required",
      'email.email'           :     "Please enter a valid email",
      'email.max'             :     "200 characters maximum",

      'phone.required'        :     "A phone is required",
      'phone.min'             :      "Phone must be 10 digits minimum",
      'phone.max'             :     "Phone Must be 10 digits maximum",
      'phone.number'          :     "Enter a valid phone number",

      'address.required'         :     "Enter a address",
      'facebook_link.url'        :     "Enter a valid link",


    }
  }
}

module.exports = StoreFrontend
