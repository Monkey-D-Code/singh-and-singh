'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Orderitem extends Model {
    static get table () {
        return 'orderitems';
    }

    medicine(){
        return this.belongsTo('App/Models/Medicine');
    }

}

module.exports = Orderitem
