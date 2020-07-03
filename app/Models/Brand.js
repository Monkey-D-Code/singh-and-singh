'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brand extends Model {
    static get table () {
        return 'brands';
    }

    medicines ( ) {
        return this.hasMany( 'App/Models/Medicine' , 'id' , 'brand_id');
    }
}

module.exports = Brand
