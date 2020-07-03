'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SliderImage extends Model {
    static get table () {
        return 'sliderimages';
    }
    static boot () {
        super.boot()
        this.addHook('beforeDelete', 'SliderImageHook.delete_imgfile')
    }
}

module.exports = SliderImage
