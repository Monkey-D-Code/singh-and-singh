'use strict'

const Pincode       =   use('App/Models/Pincode');
const Order         =   use('App/Models/Order');
const Orderitem     =   use('App/Models/Orderitem');

class PaymentController {
    async choose_method_page({ view , auth }){
        const user      =   await auth.getUser();
        const pincode   =   await Pincode.query().where('pincode' , user.pincode).first();
        return view.render('website/payment/choose-method' , {
            delivery    :   pincode ? true : false,
        });
    }

    // api controllers

    async confirm_order_api({ request , response }){
        const { user_id , items , paid_online,grand_total }   =   request.post();
        const resObj    =   {
            success      :   true,
            message      :   'Order Confirmation Successful. Redirecting',
        }

        const new_order         =   new Order();
        new_order.user_id       =   user_id;
        new_order.paid_online   =   paid_online;
        new_order.grand_total   =   grand_total;
        
        try{
            await new_order.save();
            items.forEach( item => {
                item.order_id   =   new_order.id;
            });
            try{
                await Orderitem.createMany(items);
            }catch(e){
                console.log(e);
                resObj.success  =   false;
                resObj.message  =   'Failed to place order items';
            }
        }catch(err){
            console.log(err);
            resObj.success  =   false;
            resObj.message  =   'Failed to place your order';
        }
        return resObj;
    }
}

module.exports = PaymentController
