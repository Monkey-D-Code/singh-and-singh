'use strict'

const Medicine = use('App/Models/Medicine');

class MedicineController {
    // get controllers
    async add_page ( { view , params } ) {
        return view.render('admin/medicine/form' , { 
            add_mode : true,
            categoryId : params.categoryId,
        });
    }
    async details ( { view, params } ) {
        const medicine = await Medicine.find( params.id );
        const images   = await medicine.images().fetch();
        return view.render('admin/medicine/details' , {
            medicine : medicine.toJSON(),
            images   : images.toJSON(),
        })
    }
    async edit_page ( { view , params } ) {
        const medicine = await Medicine.find( params.id );
        return view.render( 'admin/medicine/form' , {
            edit_mode : true,
            medicine : medicine.toJSON(),
        })
    }
    async delete_page( { view , params } ){
        const medicine = await Medicine.find( params.id );
        return view.render('admin/medicine/delete' , {
            medicine : medicine.toJSON(),
        })

    }

    // post controllers
    async add ( { request , response , params , session } ) {
        const { 
                name , 
                selling_price , 
                market_price,
                description,
                active,
                prescription_required,
                
        } = request.post();
        
        const new_medicine = new Medicine()
        new_medicine.category_id            = params.categoryId;
        new_medicine.name                   = name;
        new_medicine.selling_price          = selling_price;
        new_medicine.market_price           = market_price;
        new_medicine.description            = description;
        new_medicine.active                 = active;
        new_medicine.prescription_required  = prescription_required;

        try{
            await new_medicine.save();
            return response.redirect(`/admin/medicine/${new_medicine.id}/details`)
        }catch( error ){
            session.flash({
                medicineCreateErr : 'Error while adding new medicine !',
            })
            return response.redirect('back');
        }
           
    }
    async edit({ request , response , params , session }){
        const { 
                name , 
                selling_price , 
                market_price,
                description,
                active,
                prescription_required,
                
        } = request.post();

        const medicine = await Medicine.find( params.id );

        medicine.name                   =   name;
        medicine.selling_price          =   selling_price;
        medicine.market_price           =   market_price;
        medicine.description            =   description;
        medicine.active                 =   active;
        medicine.prescription_required  =   prescription_required;

        try{
            await medicine.save();
            return response.redirect(`/admin/medicine/${medicine.id}/details`);
        }catch ( e ) {
            session.flash({
                medicineUpdateErr : 'Error while updating medicine !',
            })
            return response.redirect('back');
        }
    }
    async delete ( { response , params , session } ){
        const medicine = await Medicine.find( params.id );
        const category_id = medicine.category_id;
        try{
            await medicine.images().delete();
            await medicine.delete();
            return response.redirect(`/admin/category/${category_id}/details`);
        } catch ( e ){
            session.flash({
                medicineDeleteErr : 'Error while deleting medicine !',
            })
            return response.redirect('back');
        }
    }
}

module.exports = MedicineController
