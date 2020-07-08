'use strict'


const User      =   use('App/Models/User');

class UserinfoController {

    async list_page({ view , }){
        const users     =   await User.all();
        return view.render('admin/users/list' , {
            users       :   users.toJSON(),
            user_list   :   true,
        })
    }

}

module.exports = UserinfoController
