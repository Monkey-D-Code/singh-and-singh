'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicinesSchema extends Schema {
  up () {
    this.create('medicines', (table) => {
      table.increments()
      table.integer( 'category_id' ).notNullable().unsigned();
      table.string( 'name' , 255 ).notNullable();
      table.float( 'selling_price' , 2 ).notNullable();
      table.float( 'market_price' , 2 ).notNullable();
      table.text( 'description' ).notNullable();
      table.boolean( 'active' );
      table.boolean( 'prescription_required' );
      table.timestamps()
    })
  }

  down () {
    this.drop('medicines')
  }
}

module.exports = MedicinesSchema
