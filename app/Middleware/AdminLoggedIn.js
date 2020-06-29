'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminLoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response ,auth }, next) {
    try {
      const user = await auth.getUser();
      if(user.is_admin){
        return response.redirect('/admin');
      }else{
        await auth.logout();
        await next();
      }
    }catch( e ){
      await next()
    }
    
  }
}

module.exports = AdminLoggedIn
