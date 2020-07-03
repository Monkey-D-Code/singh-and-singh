'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Frontend      =     use('App/Models/Frontend');

class FrontendDatum {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ view }, next) {
    const frontend      =     await Frontend.find(1);
    view.share({
      frontend  :   frontend ? frontend.toJSON() : false,
    })
    // call next to advance the request
    await next()
  }
}

module.exports = FrontendDatum
