'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer( 'last_otp' ).nullable();
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('last_otp');
    })
  }
}

module.exports = UsersSchema
