'use strict'

class AdminController {

    // get controllers
    async home (context){
        const { response,view } = context;
        return view.render('admin/home',{ home : true })
    }
    async login_page( context ) {
        const { view } = context;
        return view.render('admin/login')
    }
    async logout ( { auth , response } ) {
        await auth.logout();
        return response.redirect('/admin/login');
    }

    // post controllers
    async admin_login ( { request , response , session , auth } ) {
        const { phone , password } = request.post();

        try {
            await auth.attempt( phone, password );
            return response.redirect('/admin');
        }catch (error) {
            session.flash({
                adminLoginErr : 'Admin Details Not Valid !',
            })
            return response.redirect('back');
        }
        
    }
}

module.exports = AdminController
