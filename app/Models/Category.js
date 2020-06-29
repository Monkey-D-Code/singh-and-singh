'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get table () {
        return 'categories';
    }

    medicines ( ) {
        return this.hasMany( 'App/Models/Medicine' , 'id' , 'category_id');
    }
}

module.exports = Category
