'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Frontend    =   use('App/Models/Frontend');

class FrontendExist {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request ,response }, next) {
    const frontend    =   await Frontend.find(1);
    if(frontend){
      return response.redirect('/admin/frontend/1/details');
    }
    await next()
  }
}

module.exports = FrontendExist
