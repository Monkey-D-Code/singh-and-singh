'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Frontend extends Model {
    static get table () {
        return 'frontends';
    }
}

module.exports = Frontend
