'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    static get table () {
        return 'orders';
    }

    user(){
        return this.belongsTo( 'App/Models/User' );
    }

    items(){
        return this.hasMany( 'App/Models/Orderitem' , 'id' , 'order_id' );
    }
}

module.exports = Order
