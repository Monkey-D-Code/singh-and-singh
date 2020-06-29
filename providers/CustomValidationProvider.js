'use strict'

const { ServiceProvider } = require('@adonisjs/fold');


class ExistsValidationProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  async _exists (data,field,message,args,get) {
        const value = get(data,field);
        const Database = use('Database')
        if(!value) return;
        const [ table , column ] = args;
        const row = await Database.table(table).where(column,value).first();
        if(!row) throw message;
  }

  async _is_admin ( data , field , message , args , get) {
      const value = get(data,field);
      const Database = use('Database');
      if(!value) return;
      const row = await Database
                          .table('users')
                          .where('phone',value)
                          .where('is_admin', true)
                          .first()
      if(!row) throw message;
  }
  

  boot () {
    const Validator = use('Validator');
    Validator.extend('exists', this._exists.bind(this));
    Validator.extend('checkAdmin',this._is_admin.bind(this));
  }
}

module.exports = ExistsValidationProvider
