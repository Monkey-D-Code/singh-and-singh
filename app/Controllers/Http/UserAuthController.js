'use strict'

const User          =   use('App/Models/User');
const Order         =   use('App/Models/Order');
const Orderitem     =   use('App/Models/Orderitem');
const Prescription  =   use('App/Models/Prescription');
const Utility       = use('Utility');

class UserAuthController {
    async login_page({ request , view }){
        console.log(request.intended());
        return view.render('website/auth/login');
    }

    async profile_page({ view }){
        return view.render('website/auth/profile');
    }

    async your_orders_page({ view , auth }){
        const user      =   await auth.getUser();
        const orders    =   await Order.query().orderBy('created_at' , 'desc')
                                       .where('user_id' , user.id).fetch();
        return view.render('website/auth/your-orders',{
            orders  :   orders.toJSON(),
        })
    }

    async your_prescriptions_page({ view , auth }){
        const prescriptions =   await Prescription.query()
                                                  .orderBy('created_at','desc')
                                                  .where('user_id',auth.user.id)
                                                  .fetch();
        return view.render('website/auth/your-prescriptions',{
            prescriptions   :   prescriptions.toJSON(),
        })
    }

    async single_prescription({ view , params }){
        const prescription  =   await Prescription.find( params.id );
        return view.render('website/auth/single-prescription',{
            pres    :   prescription.toJSON(),
        })
    }

    async  order_details_page({ view , auth , params }){
        const order     =   await Order.find( params.id );
        const items     =   await order.items().with('medicine').fetch();
        return view.render('website/auth/order-details' ,{
            order   :   order.toJSON(),
            items   :   items.toJSON(),
        })
    }

    async logout ( { auth , response } ) {
        await auth.logout();
        return response.route('auth.login');
    }

    // post controllers
    async verify_otp_page({ request , view , response , session }){
        const { name , pincode , phone }    =   request.post();
        const new_otp   =   Utility.generate_otp();
        const user      =   await User.findOrCreate(
            { phone : phone },
            {
                phone       :   phone,
                pincode     :   pincode,
                name        :   name,
                password    :   new_otp,
            }
        );
        if(user.is_admin){
            session.flash({
                userLoginErr : 'Enter a different phone number',
            })
            return response.route('auth.login');
        }
        user.last_otp   =   new_otp;
        user.password   =   new_otp;
        try{
            await user.save();
            return view.render('website/verify-otp',{
                phone   :   phone,
            })
        }catch(e){
            console.log(e);
            session.flash({
                userLoginErr : 'Error while logging you in',
            })
            return response.redirect('back');
        }
    }

    async confirm_login({ request , response , session ,auth , view }){
        const { phone , otp }   =   request.post();
        if(!phone) return response.route('auth.login');
        try {
            await auth.attempt( phone, otp );
            return response.route('auth.profile');
        }catch (error) {
            return view.render('website/verify-otp',{
                phone   :   phone,
                otpError : 'Invalid OTP',
            });
        }

    }
}

module.exports = UserAuthController
