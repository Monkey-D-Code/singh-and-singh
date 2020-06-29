'use strict'

const MedicineImage = use( 'App/Models/MedicineImage' );
const Utility       = use('Utility');
const Helpers       = use('Helpers');
const Drive         = use('Drive');

class MedicineImageController {

    // get controllers
    async add_page ( { params , view } ) {
        return view.render('admin/medicine_image/form' , {
            add_mode : true,
            medicine_id : params.medicine_id,
        });
    }
    async delete_page( { params , view } ) {
        const medicine_image = await MedicineImage.find( params.id );
        return view.render('admin/medicine_image/delete' , {
            medicine_image : medicine_image.toJSON(),
        })
    }

    // post controllers
    async add ( { request , response , params , session } ) {
        const {
            caption,

        } = request.post();
        
        const medicine_image_file = request.file( 'medicine_image' , {
            types : [ 'image' ],
            size  : '10mb',
        } );
        const medicine_image_filename = `medicine-${params.medicine_id}-${Utility.get_random_str(10)}.${medicine_image_file.clientName.split('.').pop()}`;

        await medicine_image_file.move( Helpers.publicPath('uploads/medicine_images') , {
            name : medicine_image_filename,
        })

        if(!medicine_image_file.moved()){
            session.flash({
                medImageUploadErr : 'Error while Uploading medicine image',
            })
            return response.redirect('back');
        }

        const new_medicineImage = new MedicineImage();
        new_medicineImage.medicine_id   =   params.medicine_id;
        new_medicineImage.image_url     =   `/uploads/medicine_images/${medicine_image_filename}`;
        new_medicineImage.caption       =   caption;

        try{
            await new_medicineImage.save();
            response.redirect(`/admin/medicine/${params.medicine_id}/details`);
        }catch ( e ){
            session.flash({
                medImageSaveErr : 'Error while saving medicine image',
            })
            return response.redirect('back');
        }
    }
    async delete ( { params , session, response } ) {
        const medicine_image = await MedicineImage.find( params.id );
        const medicine_id = medicine_image.medicine_id;
        
        try{
            await medicine_image.delete();
            return response.redirect(`/admin/medicine/${medicine_id}/details`);
        } catch (e){
            console.log(e);
            session.flash({
                medImgDeleteErr : 'Some error occured deleting the file',
            })
            return response.redirect('back');
        }
        
    }
}

module.exports = MedicineImageController
