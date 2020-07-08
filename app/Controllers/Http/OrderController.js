'use strict'

const Order         =   use('App/Models/Order');
const User          =   use('App/Models/User');

class OrderController {
    async list({ view ,request }){
        const current_page      =   parseInt(request.input( 'p' )) || 1;
        const today             =   new Date();
        const date_today        =   `${today.getFullYear()}-${today.getMonth() + 1 < 10 && '0'}${(today.getMonth()+1)}-${today.getDate() < 10 && '0'}${today.getDate()}`;
        const date_string       =   request.input( 'date' ) || date_today;

        const orders            =   await Order.query()
                                               .where('created_at' , 'like' , `${date_string}%`)
                                               .with( 'user' )
                                               .orderBy('created_at','desc')
                                               .paginate( current_page , 10 );
        return view.render('admin/order/list' , {
            orders          :   orders.toJSON(),
            order_page      :   true,
            choosen_date    :   request.input( 'date' ) || null,
        })
    }
    async details_page({ view , params }){
        const order     =   await Order.find( params.id );
        const user      =   await User.find( order.user_id );
        const items     =   await order.items().with('medicine').fetch();
        
        if(order.new){
            order.new   =   false;
            try{
                await order.save();
            }catch(e){
                console.log(e);
            }
        }
        return view.render('admin/order/details' , {
            order       :   order.toJSON(),
            user        :   user.toJSON(),
            items       :   items.toJSON(),
        });
    }


    // post controllers
    async edit_order({ request , response , params , session}){
        const { dispatched , delivered , cancelled }    =   request.post();
        const order     =   await Order.find( params.id );
        order.dispatched =   dispatched;
        order.delivered =   delivered;
        order.cancelled =   cancelled;
        try{
            await order.save();
            session.flash({
                orderEditSuccess : 'Order Saved',
            });
            return response.redirect(`/admin/order/${order.id}/details`);
        }   catch(e){
            console.log(e);
            session.flash({
                orderEditErr : 'Error while updating order',
            });
            return response.redirect('back');
        }
    }

}

module.exports = OrderController
