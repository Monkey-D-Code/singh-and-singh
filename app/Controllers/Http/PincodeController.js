'use strict'

const Pincode       =       use('App/Models/Pincode');


class PincodeController {
    async add_page({ view }){
        return view.render('admin/pincode/form' , {
            add_mode    :   true,
        });
    }
    async edit_page({ view , params }){
        const pincode   =   await Pincode.find( params.id );
        return view.render('admin/pincode/form' , {
            edit_mode  :    true,
            pincode    :    pincode.toJSON(),
        })
    }
    async delete_page({ view , params }){
        const pincode   =   await Pincode.find( params.id );
        return view.render('admin/pincode/delete',{
            pincode     :   pincode.toJSON(),
        });
    }

    // post controllers
    async add({ request , response , session }){
        const { area , pincode }    =   request.post();
        const new_pincode   =   new Pincode();
        new_pincode.area    =   area;
        new_pincode.pincode =   pincode;

        try{
            await new_pincode.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(err){
            console.log(err);
            session.flash({
                addPincodeErr : 'Error while adding new pincode',
            });
        }
    }
    async edit({ request , response , session , params }){
        const { area , pincode }    =   request.post();
        const old_pincode   =   await Pincode.find( params.id );
        old_pincode.area    =   area;
        old_pincode.pincode =   pincode;

        try{
            await old_pincode.save()
            return response.redirect('/admin/frontend/1/details');
        }catch(e){
            console.log(e)
            session.flash({
                addPincodeErr : 'Error while updating pincode',
            });
        }
    }
    async delete({ response , session , params }){
        const pincode   =   await Pincode.find( params.id );

        try{
            await pincode.delete();
            return response.redirect('/admin/frontend/1/details');
        }catch(e){
            console.log(e);
            session.flash({
                pincodeDeleteErr : 'Error while updating pincode',
            });
        }
    }
}

module.exports = PincodeController
