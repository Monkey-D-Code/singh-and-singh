'use strict'

class GenerateOtp {
  get rules () {
    return {
      name    :   'required|string|min:5|max:200',
      pincode :   'required|number|min:6|max:6|deliveryAvailable',
      phone   :   'required|number|min:10|max:10',
    }
  }

  get messages () {
    return {
      'name.required'   :   'Please enter your name',
      'name.string'     :   'Name must be a string',
      'name.min'        :   'Minimum 5 characters required',
      'name.max'        :   'Maximum 200 characters',
      
      'pincode.required'                  :   'Enter your area pincode',
      'pincode.number'                    :   'Pincode must be a number',
      'pincode.min'                       :   'Minimum 6 digits',
      'pincode.max'                       :   'Maximum 6 digits',
      'pincode.deliveryAvailable'         :   'Home delivery not available here',


      'phone.required'   :   'Enter your phone number',
      'phone.number'     :   'Enter a valid number',
      'phone.min'        :   'Minimum 10 digits',
      'phone.max'        :   'Maximum 10 digits',
      
    }
  }
}

module.exports = GenerateOtp
