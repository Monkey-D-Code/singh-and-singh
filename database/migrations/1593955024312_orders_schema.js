'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments();
      table.integer( 'user_id' ).notNullable();
      table.boolean( 'new' ).defaultTo(true);
      table.boolean( 'dispatched' ).defaultTo(false);
      table.boolean( 'delivered' ).defaultTo(false);
      table.boolean( 'cancelled' ).defaultTo(false);
      table.boolean( 'paid_online' ).defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
