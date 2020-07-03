'use strict'

const SliderImage       =       use('App/Models/SliderImage');
const Utility           = use('Utility');
const Helpers           = use('Helpers');
const Drive             = use('Drive');

class SliderImageController {
    async add_page ( { view  } ){
        return view.render('admin/slider_image/form',{
            add_mode : true,
        });
    }
    async delete_page( { params , view } ) {
        const slider_image = await SliderImage.find( params.id );
        return view.render('admin/slider_image/delete' , {
            slider_image : slider_image.toJSON(),
        })
    }

    // post controllers
    async add( { request , response , session} ){
        const {
            caption,
            heading,

        } = request.post();
        
        const slider_image_file = request.file( 'slider_image' , {
            types : [ 'image' ],
            size  : '10mb',
        } );
        const slider_image_filename = `${Utility.get_random_str(10)}.${slider_image_file.clientName.split('.').pop()}`;

        await slider_image_file.move( Helpers.publicPath('uploads/slider_images') , {
            name : slider_image_filename,
        })

        if(!slider_image_file.moved()){
            session.flash({
                sliderImageUploadErr : 'Error while Uploading slider image',
            })
            return response.redirect('back');
        }

        const new_sliderimage = new SliderImage();
        new_sliderimage.heading   =   heading;
        new_sliderimage.image_url     =   `/uploads/slider_images/${slider_image_filename}`;
        new_sliderimage.caption       =   caption;

        try{
            await new_sliderimage.save();
            response.redirect(`/admin/frontend/1/details`);
        }catch ( e ){
            session.flash({
                sliderImageSaveErr : 'Error while saving slider image',
            })
            return response.redirect('back');
        }
    }
    async delete ( { params , session, response } ) {
        const slider_image = await SliderImage.find( params.id );
        
        try{
            await slider_image.delete();
            return response.redirect(`/admin/frontend/1/details`);
        } catch (e){
            console.log(e);
            session.flash({
                sliderImgDeleteErr : 'Some error occured deleting the file',
            })
            return response.redirect('back');
        }
        
    }
}

module.exports = SliderImageController
