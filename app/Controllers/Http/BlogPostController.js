'use strict'

const BlogPost      =   use( 'App/Models/BlogPost' );
const Utility       =   use('Utility');
const Helpers       =   use('Helpers');
const Drive         =   use('Drive');
const sanitizeHtml  =   require('sanitize-html');

class BlogPostController {
    // get controllers
    async list( { view } ){
        const blogposts = await BlogPost.all();
        return view.render('admin/blogpost/list',{
            blogposts : blogposts.toJSON(),
            blog : true,
        })
    }
    async add_page ( { view } ){
        return view.render('admin/blogpost/form' , {
            add_mode : true,
        })
    }
    async details ( { view , params } ){
        const single_post   =   await BlogPost.find( params.id );
        return view.render('admin/blogpost/details' , {
            single_post : single_post.toJSON(),
        })
    }
    async edit_page ( { view , params } ){
        const single_post   =   await BlogPost.find( params.id );
        return view.render('admin/blogpost/form' , {
            edit_mode : true,
            blogpost   :   single_post.toJSON(),
        })
    }
    async delete_page({ view , params }){
        const single_post =  await BlogPost.find( params.id );
        return view.render('admin/blogpost/delete' , {
            blogpost   :   single_post.toJSON(),
        })
    }
    // post controllers
    async add( { request , response , session} ){
        const { title , post_body } = request.post();
        const postimg_file = request.file( 'blogpost_image' , {
            types : [ 'image' ],
            size : '10mb',
        } );
        const postimg_filename = `${Utility.get_random_str(15)}.${postimg_file.clientName.split('.').pop()}`;
        await postimg_file.move( Helpers.publicPath('uploads/blogpost_images') , {
            name : postimg_filename,
        });
        if(!postimg_file.moved()){
            session.flash({
                postImgUploadErr : 'Error While uploading post image',
            });
            return response.redirect('back')
        }
        
        const new_blogpost          =   new BlogPost();
        new_blogpost.title          =   title;
        new_blogpost.image_url      =   `/uploads/blogpost_images/${postimg_filename}`;
        new_blogpost.post_body      =   post_body;
        new_blogpost.published      =   1;

        try{
            await new_blogpost.save();
            return response.redirect(`/admin/blogpost/${new_blogpost.id}/details`);
        }catch (e) {
            console.log(e);
            session.flash({
                addBlogPostErr : 'Error while adding a new post',
            });
            return response.redirect('back');
        }
    }
    async edit ( { request , response , params , session } ){
        const { title , post_body } = request.post();
        const old_blogpost      =   await BlogPost.find( params.id );
        const new_post_img_file = request.file( 'blogpost_image' ,{
            types : [ 'image' ],
            size  : '10mb',
        } )
        if(new_post_img_file){
            const postimg_filename = `${Utility.get_random_str(15)}.${new_post_img_file.clientName.split('.').pop()}`;
            await new_post_img_file.move( Helpers.publicPath('uploads/blogpost_images') , {
                name : postimg_filename,
            });
            if(!new_post_img_file.moved()){
                session.flash({
                    postImgUploadErr : 'Error While uploading post image',
                });
                return response.redirect('back')
            }
            await Drive.delete( Helpers.publicPath(old_blogpost.image_url));
            old_blogpost.image_url  =   `/uploads/blogpost_images/${postimg_filename}`;
        }

        old_blogpost.title      =   title;
        old_blogpost.post_body  =   post_body ;

        try{
            await old_blogpost.save();
            return response.redirect(`/admin/blogpost/${old_blogpost.id}/details`);
        }catch (e) {
            console.log(e);
            session.flash({
                editBlogPostErr : 'Error while updating a post',
            });
            return response.redirect('back');
        }
    }
    async delete ( { response , params , session } ){
        const blogpost = await BlogPost.find( params.id );
        try{
            await blogpost.delete();
            return response.redirect(`/admin/blogpost/list`);
        } catch ( e ){
            session.flash({
                blogPostDeleteErr : 'Error while deleting blogpost !',
            })
            return response.redirect('back');
        }
    }
}

module.exports = BlogPostController
