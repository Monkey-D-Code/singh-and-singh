'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response , auth }, next) {
    try{
      const user  = await auth.getUser();
      await next();
    }catch(e){
      console.log('Not logged in');
      return response.route('auth.login');
    }
  }
}

module.exports = IsAuth
