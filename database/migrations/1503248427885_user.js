'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80)
      table.bigInteger('phone').notNullable().unique()
      table.integer('pincode').notNullable()
      table.string('profile_img', 200).notNullable().defaultTo(
        '/uploads/assets/default-dp.png'
      )
      table.boolean('is_active').notNullable().defaultTo(true)
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
