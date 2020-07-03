'use strict'

const Frontend      = use( 'App/Models/Frontend' );
const SliderImage   = use( 'App/Models/SliderImage' );
const WhoWeAre      =    use('App/Models/WhoWeAre');
const Testimonial   =   use('App/Models/Testimonial');
const Term          =   use('App/Models/Term');
const Pincode       =   use('App/Models/Pincode');

const Utility       =   use('Utility');
const Helpers       =   use('Helpers');
const Drive         =   use('Drive');

class FrontendController {

    // get controllers
    async add_page({ view }){
        return view.render('admin/frontend/form' , {
            add_mode : true,
        })
    }
    async edit_page( { view , params } ){
        const frontend      =      await Frontend.find( params.id );
        return view.render('admin/frontend/form' , {
            edit_mode : true,
            frontend : frontend.toJSON(),
        })
    }
    async details( { view , params } ) {
        const frontend = await Frontend.find( params.id );
        const slider_images     =   await SliderImage.query().orderBy( 'created_at' , 'desc' ).fetch();
        const who_we_ares       =   await WhoWeAre.query().orderBy( 'created_at' , 'desc' ).fetch();
        const testimonials      =   await Testimonial.query().orderBy( 'created_at' , 'desc' ).fetch();
        const terms             =   await Term.query().orderBy( 'created_at' , 'desc' ).fetch();
        const pincodes          =   await Pincode.query().orderBy( 'created_at' , 'desc' ).fetch();

        return view.render('admin/frontend/details' , {
            frontend : frontend ? frontend.toJSON() : false,
            slider_images : slider_images.toJSON(),
            who_we_ares : who_we_ares.toJSON(),
            testimonials : testimonials.toJSON(),
            terms        : terms.toJSON(),
            pincodes     :  pincodes.toJSON(),

            website : true,
        });
    }

    // post controllers
    async add( { request , response , session } ){
        const { company_name , email , phone , address , facebook_link } = request.post();
        const logoimg_file = request.file( 'logo' , {
            types : [ 'image' ],
            size : '10mb',
        } );
        const logoimg_filename = `${Utility.get_random_str(15)}.${logoimg_file.clientName.split('.').pop()}`;
        await logoimg_file.move( Helpers.publicPath('uploads/frontend') , {
            name : logoimg_filename,
        });
        if(!logoimg_file.moved()){
            session.flash({
                logoImgUploadErr : 'Error While uploading logo image',
            });
            return response.redirect('back')
        }

        const new_frontend = new Frontend();
        new_frontend.company_name   =   company_name;
        new_frontend.logo_url       =   `/uploads/frontend/${logoimg_filename}`;
        new_frontend.email          =   email;
        new_frontend.phone          =   phone;
        new_frontend.address        =   address;
        new_frontend.facebook_link  =   facebook_link;

        try{
            await new_frontend.save();
            return response.redirect(`/admin/frontend/${new_frontend.id}/details`);
        }catch (e) {
            console.log(e);
            session.flash({
                addFrontendErr : 'Error while adding front end data',
            });
            return response.redirect('back');
        }
    }
    async edit( { request , response , params , session } ){
        const { company_name , email , phone , address , facebook_link } = request.post();
        const old_frontend = await Frontend.find( params.id );
        const new_logo_img_file = request.file( 'logo' ,{
            types : [ 'image' ],
            size  : '10mb',
        } )
        if(new_logo_img_file){
            const logoimg_filename = `${Utility.get_random_str(15)}.${new_logo_img_file.clientName.split('.').pop()}`;
            await new_logo_img_file.move( Helpers.publicPath('uploads/frontend') , {
                name : logoimg_filename,
            });
            if(!new_logo_img_file.moved()){
                session.flash({
                    logoImgUploadErr : 'Error While uploading logo image',
                });
                return response.redirect('back')
            }
            await Drive.delete( Helpers.publicPath(old_frontend.logo_url));
            old_frontend.logo_url  =   `/uploads/frontend/${logoimg_filename}`;
        }

        old_frontend.company_name   =   company_name;
        old_frontend.email          =   email;
        old_frontend.phone          =   phone;
        old_frontend.address        =   address;
        old_frontend.facebook_link  =   facebook_link;

        try{
            await old_frontend.save();
            return response.redirect(`/admin/frontend/${old_frontend.id}/details`);
        }catch (e) {
            console.log(e);
            session.flash({
                addFrontendErr : 'Error while adding front end data',
            });
            return response.redirect('back');
        }

    }
}

module.exports = FrontendController
