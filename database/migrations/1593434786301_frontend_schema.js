'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FrontendSchema extends Schema {
  up () {
    this.create('frontends', (table) => {
      table.increments();
      table.string( 'company_name' , 255 ).notNullable();
      table.string( 'logo_url' , 255 ).notNullable();
      table.string( 'email' , 255 ).notNullable();
      table.bigInteger( 'phone' ).notNullable();
      table.text( 'address' ).notNullable();
      table.string( 'facebook_link' , 255);
      table.timestamps()
    })
  }

  down () {
    this.drop('frontends')
  }
}

module.exports = FrontendSchema
