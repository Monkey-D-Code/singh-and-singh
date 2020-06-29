'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicinesSchema extends Schema {
  up () {
    this.alter('medicines', (table) => {
      // alter table
      table.decimal('selling_price').notNullable().alter();
      table.decimal('market_price').notNullable().alter();

    })
  }

  down () {
    this.table('medicines', (table) => {
      // reverse alternations
      table.float( 'selling_price' , 2 ).notNullable().alter();
      table.float( 'market_price' , 2 ).notNullable().alter();
    })
  }
}

module.exports = MedicinesSchema
