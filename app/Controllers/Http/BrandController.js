'use strict'

const Brand     =      use( 'App/Models/Brand' );


class BrandController {
    async list ({view}){
        const brands    =   await Brand.query().orderBy( 'created_at' , 'desc' ).fetch();
        return view.render('admin/brand/list',{ 
            brands : true,
            brands : brands.toJSON(),
        })
    }
    async add_page(context){
        const {view} = context;
        return view.render('admin/brand/form', { add_mode : true })
    }
    async edit_page({ view , params }){
        const brand     =   await Brand.find( params.id );
        return view.render('admin/brand/form', { 
            edit_mode : true,
            brand : brand.toJSON(),
         })
    }
    async delete_page({ view , params }){
        const brand     =   await Brand.find( params.id );
        return view.render('admin/brand/delete' , {
            brand : brand.toJSON(),
        })
    }
    async details({view,params}){
        const brand     =   await Brand.find( params.id );
        const medicines =   await brand.medicines().fetch();
        return view.render( 'admin/brand/details' , {
            brand : brand.toJSON(),
            medicines : medicines.toJSON(),
        } );
    }

    // post controllers
    async add({ request , response , session }){
        const {
            name,
            cover_image,
            about,

        } = request.post();

        const new_brand = new Brand();
        new_brand.name        = name;
        new_brand.cover_image = cover_image;
        new_brand.about       = about;

        try{
            await new_brand.save();
            return response.redirect(`/admin/brand/${new_brand.id}/details`);
        }catch(err){
            console.log(err);
            session.flash({
                brandSaveErr : 'Error while creating brand',
            })
            return response.redirect('back');
        }
        
    }
    async edit({request,response,session,params}){
        const {
            name,
            cover_image,
            about,
        } = request.post();

        const brand     =   await Brand.find( params.id );
        brand.name          =   name;
        brand.cover_image   =   cover_image;
        brand.about         =   about;

        try{
            await brand.save();
            return response.redirect(`/admin/brand/${brand.id}/details`);
        }catch(err){
            console.log(err);
            session.flash({
                brandSaveErr : "Error while updating brand",
            })
            return response.redirect('back');
        }
    }
    async delete({ response , params }){
        const brand = await Brand.find( params.id );

        try{
            await brand.delete();
            return response.redirect(`/admin/brand/list`); 
        }catch(err){
            console.log(err);
            session.flash({
                brandDeleteErr : 'Error while deleting brand',
            });
            return response.redirect('back');
        }
        

    }
}

module.exports = BrandController
