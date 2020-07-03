'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WhoweareSchema extends Schema {
  up () {
    this.create('whoweares', (table) => {
      table.increments();
      table.string( 'heading' , 255 ).notNullable();
      table.text( 'desc' ).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('whoweares')
  }
}

module.exports = WhoweareSchema
