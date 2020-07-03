'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Medicine extends Model {

    static boot(){
        super.boot();
        this.addTrait('RandomMedImage');
    }
    

    images ( ) {
        return this.hasMany( 'App/Models/MedicineImage' , 'id' , 'medicine_id');
    }
}

module.exports = Medicine
