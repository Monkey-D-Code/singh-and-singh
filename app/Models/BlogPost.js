'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BlogPost extends Model {
    static get table () {
        return 'blogposts';
    }
    static boot () {
        super.boot()
        this.addHook('beforeDelete', 'BlogPostHook.delete_imgfile')
    }
}

module.exports = BlogPost
