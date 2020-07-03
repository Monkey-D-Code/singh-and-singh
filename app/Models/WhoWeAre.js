'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WhoWeAre extends Model {
    static get table () {
        return 'whoweares';
    }
}

module.exports = WhoWeAre
