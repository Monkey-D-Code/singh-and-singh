'use strict'

class StorePincode {
  get rules () {
    return {
      area      :   'required|string|min:5|max:200',
      pincode   :   'required|number|min:6|max:6',
      
    }
  }

  get messages () {
    return {
      'area.required'   :   'Mention an area',
      'area.string'     :   'Name must be a string',
      'area.min'        :   'Minimum 5 characters required',
      'area.max'        :   'Maximum 200 characters',

      'pincode.required'   :   'Enter the pincode',
      'pincode.number'     :   'Pincode must be number',
      'pincode.min'        :   'Minimum 6 digits required',
      'pincode.max'        :   'Maximum 6 digits',

    }
  }
}

module.exports = StorePincode
