'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderitemsSchema extends Schema {
  up () {
    this.create('orderitems', (table) => {
      table.increments()
      table.integer( 'order_id' ).notNullable();
      table.integer( 'medicine_id' ).notNullable();
      table.integer( 'quantity' ).notNullable();
      table.decimal( 'total' ).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('orderitems')
  }
}

module.exports = OrderitemsSchema
