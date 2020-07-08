'use strict'

// importing models
const   Category        =   use('App/Models/Category');
const   Medicine        =   use('App/Models/Medicine');

const   Prescription    =   use('App/Models/Prescription');


const   SliderImage     =   use('App/Models/SliderImage');
const   Brand           =   use('App/Models/Brand');
const   BlogPost        =   use('App/Models/BlogPost');
const   WhoWeAre        =   use('App/Models/WhoWeAre');
const   Testimonial     =   use('App/Models/Testimonial');
const   Term            =   use('App/Models/Term');
const   Pincode         =   use('App/Models/Pincode');

const Helpers           =   use('Helpers');

class WebsiteController {
    async home_page({ view }){

        const slider_images     =   await SliderImage.query().fetch();
        const brands            =   await Brand.query().fetch();
        const blogposts         =   await BlogPost.query().fetch();
        const whoweare          =   await WhoWeAre.query().fetch();
        const medicines         =   await Medicine.query().where('front_page' , true).with('images').fetch();

        return view.render('website/home',{
            brands          :   brands.toJSON(),
            slider_images   :   slider_images.toJSON(),
            blogposts       :   blogposts.toJSON(),
            whoweare        :   whoweare.toJSON(),
            medicines       :   medicines.toJSON(),
        });
    }
    async order_medicine_page({ view }){
        const testimonials      =   await Testimonial.query().fetch();
        return view.render('website/order-medicine',{
            testimonials    :   testimonials.toJSON(),
            orderMedicine   :   true,
        })
    }
    async order_by_prescription_page({ view , auth }){
        let available   =   false;
        if(auth.user){
            const user      =   await auth.getUser();
            available =   await Pincode.query().where( 'pincode' , user.pincode ).first();
        }
        return view.render('website/order-by-prescription',{    
            available   :  available ?  available.toJSON() : false,
        })
    }
    async category_list_page({ view }){
        const categories    =   await Category.query().fetch();
        return view.render('website/category-list',{
            categories  :   categories.toJSON(),
        })
    }
    async category_details_page({ view , params }){
        const category      =   await Category.find( params.id );
        const medicines     =   await category.medicines().with('images').fetch();
        return view.render('website/category-details',{
            category    :   category.toJSON(),
            medicines   :   medicines.toJSON(),
        })
    }
    async brand_details_page({ view , params }){
        const brand     =   await Brand.find( params.id );
        const medicines =   await brand.medicines().with('images').fetch();

        return view.render('website/brand-details',{
            brand       :   brand.toJSON(),
            medicines   :   medicines.toJSON(),
        });
    }
    async medicine_details_page({ view , params }){
        const medicine          =   await Medicine.find( params.id );
        const images            =   await medicine.images().fetch();
        const related_meds      =   await Medicine.pickInverse(4);
        
        return view.render('website/medicine-details',{
            medicine        :   medicine.toJSON(),
            images          :   images.toJSON(),
            related_meds    :   related_meds.toJSON(),
        })
    }
    async blopost_details_page( { view , params } ){
        const blogpost      =   await BlogPost.find( params.id );

        return view.render('website/blog-post' , {
            blogpost    :   blogpost.toJSON(),
        })

    }
    async terms_page({ view , params }){
        const terms     =   await Term.all();

        return view.render('website/terms',{
            terms   :   terms.toJSON(),
        })
    }
    async cart_page({ view }){
        return view.render('website/cart');
    }

    // post controllers
    async search_results_page({ request , view , response , auth}){
        const { search_query , pincode }  =   request.post();
        if(search_query){
            const medicines     =   await Medicine
                                            .query()
                                            .where('name' , 'like' , `%${search_query}%`)
                                            .with('images')
                                            .fetch();
            let pinData =   false;

            if(pincode){
                pinData   =   await Pincode
                                        .query()
                                        .where('pincode' , pincode)
                                        .first();
            }
            return view.render('website/search-results' , {
                search_query       :    search_query,
                medicines          :    medicines.toJSON(),
                pincode            :    pincode,
                pinData            :    pinData ? pinData.toJSON() : false,
                searchResults      :    true,
            });

        }else{
            return response.redirect('back');
        }
    }


    // api controllers
    async   search_pin_api( { request , response }){
        const { pin }   =   request.post();
        const pincode   =   await Pincode.query()
                                    .where('pincode' , pin)
                                    .first();

        if(pincode){
            return response.json({
                msg : 'Home delivery Available'
            })
        }else{
            return response.json({
                msg :  'Delivery not available',
            })
        }
    }

    async upload_prescription({ request }){
        const resObj    =   {
            success     :   true,
            message     :   'Prescription Uploaded successfully',
        }
        const timestamp =   new Date().getTime();
        const { user_id }   =   request.post();
        const image_file    =   request.file('image_file',{
            types   :   ['image'],
            size    :   '6mb',
        })
        const filename  =   `${timestamp}_prescription.${image_file.clientName.split('.').pop()}`;
        await image_file.move( Helpers.publicPath('uploads/prescriptions'),{
            name    :   filename,
        });
        if( !image_file.moved() ){
            resObj.success  =   false;
            resObj.message  =   'Uploading Prescription Failed';
            return resObj;
        }
        const new_prescription      =   new Prescription();
        new_prescription.user_id    =   user_id;
        new_prescription.image_url  =   `/uploads/prescriptions/${filename}`;
        new_prescription.new        =   true;

        try{
            await new_prescription.save();
            return resObj;
        }catch(e){
            console.log(e);
            resObj.success  =   false;
            resObj.message  =   'Prescription Saving Failed';
            return resObj;
        }
    }

}

module.exports = WebsiteController
