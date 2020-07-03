'use strict'

const User      =   use('App/Models/User');

class UserAuthController {
    async login_page({ view }){
        return view.render('website/auth/login');
    }


    // post controllers
    async user_login({ request , response , session }){
        const { name , pincode , phone }    =   request.post();
        return request.post();
    }
}

module.exports = UserAuthController
