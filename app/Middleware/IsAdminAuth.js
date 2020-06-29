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
      const user = await auth.getUser();
      if(!user.is_admin){
          await auth.logout();
          return response.redirect('/admin/login');
      }
    }catch( e ){
      return response.redirect('/admin/login');
    }

    await next();
    
  }
}

module.exports = IsAuth
