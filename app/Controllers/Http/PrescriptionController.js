'use strict'

const Prescription      =   use('App/Models/Prescription');
const User              =   use('App/Models/User');

class PrescriptionController {

    async list({ request , view }){
        const current_page      =   parseInt(request.input( 'p' )) || 1;
        const today             =   new Date();
        const date_today        =   `${today.getFullYear()}-${today.getMonth() + 1 < 10 && '0'}${(today.getMonth()+1)}-${today.getDate() < 10 && '0'}${today.getDate()}`;
        const date_string       =   request.input( 'date' ) || date_today;

        const prescriptions     =   await Prescription.query()
                                                    .where('created_at' , 'like' , `${date_string}%`)
                                                    .with( 'user' )
                                                    .orderBy('created_at','desc')
                                                    .paginate( current_page , 10 );
        return view.render('admin/prescription/list' , {
            prescriptions          :   prescriptions.toJSON(),
            prescription_page      :   true,
            choosen_date           :   request.input( 'date' ) || null,
        })
    }

    async details({ view , params }){
        const prescription      =   await Prescription.find( params.id );
        const user              =   await User.find( prescription.user_id );
        if(prescription.new){
            prescription.new    =   false;
            try{
                await prescription.save()
            }catch(e){
                console.log(e);
            }
        }
        return view.render('admin/prescription/details',{
            prescription    :   prescription.toJSON(),
            user            :   user.toJSON(),
        });
    }

    // post controllers
    async  edit({ request , response , params , session }){
        const { confirmed , dispatched , delivered , cancelled , total }    =   request.post();
        const prescription      =   await Prescription.find( params.id );
        
        prescription.confirmed  =   confirmed;
        prescription.dispatched =   dispatched;
        prescription.delivered  =   delivered;
        prescription.cancelled  =   cancelled;
        prescription.total      =   total;

        try{
            await prescription.save();
            session.flash({
                presSaveSuccess : "Prescription saved",
            });
            return response.redirect(`/admin/prescription/${prescription.id}/details`);
        }catch(e){
            console.log(e);
            session.flash({
                presSaveErr : "Prescription Saving Error",
            });
            return response.redirect('back');
        }

    }


}

module.exports = PrescriptionController
