'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MedicineImage extends Model {
    static get table () {
        return 'medicine_images';
    }
    static boot () {
        super.boot()
        this.addHook('beforeDelete', 'MedicineImageHook.delete_imgfile')
    }
}

module.exports = MedicineImage
