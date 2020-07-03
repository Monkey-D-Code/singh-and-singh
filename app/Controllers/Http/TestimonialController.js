'use strict'

const Testimonial   =   use( 'App/Models/Testimonial' );

class TestimonialController {
    async add_page({ view }){

        return view.render('admin/testimonial/form',{
            add_mode : true,
        });
    }
    async edit_page({ view , params }){
        const testimonial = await Testimonial.find( params.id )
        return view.render('admin/testimonial/form',{
            edit_mode : true,
            testimonial : testimonial.toJSON()
        })
    }
    async delete_page( {view,params} ){
        const testimonial = await Testimonial.find( params.id )
        return view.render('admin/testimonial/delete',{
            testimonial : testimonial.toJSON()
        })
    }

    // post controllers
    async add({  request, response , session }){
        const {name,message} = request.post();
        const new_testimonial = new Testimonial();
        new_testimonial.name = name;
        new_testimonial.message = message;

        try{
            await new_testimonial.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(err){
            console.log(err);
            session.flash({
                testimonialSaveErr : "Error while saving testimonial"
            });
            return response.redirect('back');
        }
    }
    async edit({ request , response , params , session }){
        const {name,message} = request.post();
        const testimonial       = await Testimonial.find( params.id )
        testimonial.name        =   name;
        testimonial.message     =   message;
        try{
            await testimonial.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(error){
            console.log(error);
            session.flash({
                testimonialSaveErr : 'Error while updating testimonial'
            })
            return response.redirect('back');
        }
    }
    async delete({response,params,session}){
        const testimonial       = await Testimonial.find( params.id )
        try{
            await testimonial.delete();
            return response.redirect('/admin/frontend/1/details');
        }catch(e){
            console.log(e);
            session.flash({
                testimonialDeleteErr : "Error while deleting testimonial !"
            });
            return response.redirect('back');
        }
    }
}

module.exports = TestimonialController
