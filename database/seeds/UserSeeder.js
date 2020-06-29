'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User    = use( 'App/Models/User' )

class UserSeeder {
  async run () {
    const new_user = new User();
    new_user.name = 'Victor Pramanik';
    new_user.pincode = 700107;
    new_user.phone = 8670972817;
    new_user.password = 'qwerty12345';
    new_user.is_admin = true;

    await new_user.save();
  }
}

module.exports = UserSeeder
