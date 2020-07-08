'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.decimal('grand_total');
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('grand_total');
    })
  }
}

module.exports = OrdersSchema
