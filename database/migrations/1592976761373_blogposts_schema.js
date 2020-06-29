'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogpostsSchema extends Schema {
  up () {
    this.create('blogposts', (table) => {
      table.increments();
      table.string( 'title' , 255 ).notNullable();
      table.string( 'image_url' , 255 ).notNullable();
      table.text( 'post_body' ).notNullable();
      table.boolean( 'published' ).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('blogposts')
  }
}

module.exports = BlogpostsSchema
