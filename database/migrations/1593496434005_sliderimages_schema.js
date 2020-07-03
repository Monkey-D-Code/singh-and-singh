'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SliderimagesSchema extends Schema {
  up () {
    this.create('sliderimages', (table) => {
      table.increments();
      table.string( 'image_url' , 255 ).notNullable();
      table.string( 'heading' , 255 ).notNullable();
      table.string( 'caption' , 255 ).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('sliderimages')
  }
}

module.exports = SliderimagesSchema
