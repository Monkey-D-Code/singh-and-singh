'use strict'

const Drive     =   use( 'Drive' );
const Helpers   =   use( 'Helpers' );

const BlogPostHook = exports = module.exports = {}

BlogPostHook.method = async (modelInstance) => {
}

BlogPostHook.delete_imgfile = async (post) => {
    await Drive.delete(Helpers.publicPath(post.image_url));
}