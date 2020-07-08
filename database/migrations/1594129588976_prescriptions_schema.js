'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrescriptionsSchema extends Schema {
  up () {
    this.create('prescriptions', (table) => {
      table.increments();
      table.integer( 'user_id' ).notNullable();
      table.string( 'image_url' , 255 ).notNullable();
      table.decimal( 'total' );
      table.boolean('new').defaultTo(true);
      table.boolean('confirmed').defaultTo(false);
      table.boolean('dispatched').defaultTo(false);
      table.boolean('delivered').defaultTo(false);
      table.boolean('cancelled').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('prescriptions')
  }
}

module.exports = PrescriptionsSchema
