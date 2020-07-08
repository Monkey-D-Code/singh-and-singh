'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Prescription extends Model {
    static get table () {
        return 'prescriptions';
    }

    user(){
        return this.belongsTo( 'App/Models/User' );
    }
}

module.exports = Prescription
