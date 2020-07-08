'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicinesSchema extends Schema {
  up () {
    this.table('medicines', (table) => {
      // alter table
      table.boolean('front_page').defaultTo(false);
      table.integer( 'brand_id' ).nullable();
      table.integer('offer_id').nullable();
    })
  }

  down () {
    this.table('medicines', (table) => {
      // reverse alternations
      table.dropColumn('front_page');
      table.dropColumn('brand_id');
      table.dropColumn('offer_id');
    })
  }
}

module.exports = MedicinesSchema
