'use strict'

const Drive     =   use( 'Drive' );
const Helpers   =   use( 'Helpers' );

const MedicineImageHook = exports = module.exports = {}

MedicineImageHook.delete_imgfile = async (image) => {
    await Drive.delete(Helpers.publicPath(image.image_url));
}
