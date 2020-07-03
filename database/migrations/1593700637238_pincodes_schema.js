'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PincodesSchema extends Schema {
  up () {
    this.create('pincodes', (table) => {
      table.increments()
      table.string( 'area'  , 255 ).notNullable();
      table.bigInteger( 'pincode' ).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('pincodes')
  }
}

module.exports = PincodesSchema
