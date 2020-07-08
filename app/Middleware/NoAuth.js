'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NoAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response ,auth }, next) {
    // call next to advance the request
    try{
      const user  = await auth.getUser();
      return response.redirect('back');
    }catch(e){
      console.log('Not logged in');
      await next()
    }
  }
}

module.exports = NoAuth
