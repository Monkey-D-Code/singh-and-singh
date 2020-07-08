'use strict'

const Order         =   use('App/Models/Order');
const Prescription  =   use('App/Models/Prescription');

class AdminController {

    // get controllers
    async home ({ request,view }){
        const today             =   new Date();
        const date_today        =   `${today.getFullYear()}-${today.getMonth() + 1 < 10 && '0'}${(today.getMonth()+1)}-${today.getDate() < 10 && '0'}${today.getDate()}`;
        const date_string       =   request.input( 'date' ) || date_today;

        // queries
        const orders_sum            =   await Order.query()
                                               .where('created_at' , 'like' , `${date_string}%`)
                                               .sum('grand_total');
        const pres_sum              =   await Prescription.query()
                                                          .where('created_at' , 'like' , `${date_string}%`)
                                                          .sum('total');        
        return view.render('admin/home',{ 
            home : true,
            choosen_date    :   request.input( 'date' ) || null,
            orders_sum      :   orders_sum[0]['sum(`grand_total`)'],
            pres_sum        :   pres_sum[0]['sum(`total`)'],
        })
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
