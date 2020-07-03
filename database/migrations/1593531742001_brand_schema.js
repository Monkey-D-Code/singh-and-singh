'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandSchema extends Schema {
  up () {
    this.create('brands', (table) => {
      table.increments();
      table.string('name',255).notNullable();
      table.string( 'cover_image' , 255 ).notNullable();
      table.text( 'about' ).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('brands')
  }
}

module.exports = BrandSchema
