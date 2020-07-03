'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TermsSchema extends Schema {
  up () {
    this.create('terms', (table) => {
      table.increments();
      table.string('heading' , 255).notNullable();
      table.text('desc').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('terms')
  }
}

module.exports = TermsSchema
