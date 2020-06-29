'use strict'

class AdminLogin {
  get rules () {
    return {
      'phone' : 'required|number|min:10|max:10|exists:users,phone|checkAdmin',
      'password' : 'required|alphaNumeric|min:8|max:20',
    }
  }

  get messages () {
    return {
      'phone.required' : 'Phone Number is necessary for login',
      'phone.number'   : 'Enter a number please',
      'phone.min'      : '10 digits minimum',
      'phone.max'      : '10 digits maximum',
      'phone.exists'   : 'Phone number not registered',
      'phone.checkAdmin' : 'This is not an admin phone number',

      'password.required' : 'Password is necessary for login',
      'password.alphaNumeric' : 'Password must be letters and numbers',
      'password.min'           : '8 characters min',
      'password.max'           : '20 characters max',
    }
  }
}

module.exports = AdminLogin
