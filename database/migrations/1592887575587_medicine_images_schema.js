'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicineImagesSchema extends Schema {
  up () {
    this.create('medicine_images', (table) => {
      table.increments();
      table.integer( 'medicine_id' ).notNullable();
      table.string( 'image_url' , 255 ).notNullable();
      table.string( 'caption' , 255 ).nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('medicine_images')
  }
}

module.exports = MedicineImagesSchema
