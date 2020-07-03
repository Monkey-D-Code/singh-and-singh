'use strict'
const Drive     =   use( 'Drive' );
const Helpers   =   use( 'Helpers' );


const SliderImageHook = exports = module.exports = {}

SliderImageHook.method = async (modelInstance) => {
}

SliderImageHook.delete_imgfile = async (image) => {
    await Drive.delete(Helpers.publicPath(image.image_url));
}