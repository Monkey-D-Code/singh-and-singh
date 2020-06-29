'use strict'

// Category Model
const Category = use('App/Models/Category');

class CategoryController {

    // get controllers
    async list (context){
        const {view} = context;
        const  category_list = await Category.query().orderBy( 'created_at' , 'desc' ).fetch();
        return view.render('admin/category/list',{ 
            categories : true,
            category_list : category_list.toJSON(),
        })
    }
    async add_page(context){
        const {view} = context;
        return view.render('admin/category/form', { add_mode : true })
    }
    async details(context){
        const { view , params } = context;
        const category = await Category.find( params.id );
        const medicines = await category.medicines().fetch();
        return view.render('admin/category/details' , { 
            category : category.toJSON(),
            medicines : medicines.toJSON(), 
        });
    }
    async edit_page(context){
        const { view , params } = context;
        const category = await Category.find( params.id );
        return view.render('admin/category/form' , {
            edit_mode : true,
            category : category.toJSON(),
        })
    }
    async delete_page(context){
        const { view , params } = context;
        const category = await Category.find( params.id );
        return view.render('admin/category/delete' , {
            category : category.toJSON(),
        })
    }


    // post controllers
    async add_category(context){
        const {request,response} = context;
        const {
            category_name,
            cover_image,
            description,

        } = request.post();

        const new_category = new Category();
        new_category.category_name = category_name;
        new_category.cover_image = cover_image;
        new_category.description = description;

        await new_category.save();

        return response.redirect(`/admin/category/${new_category.id}/details`);
    }
    async edit_category(context){
        const {request , response , params} = context;
        const {
            category_name,
            cover_image,
            description,

        } = request.post();

        const category = await Category.find( params.id );

        category.category_name = category_name;
        category.cover_image = cover_image;
        category.description = description;

        await category.save();

        return response.redirect(`/admin/category/${category.id}/details`); 
    }
    async delete_category(context){
        const { response , params } = context;
        const category = await Category.find( params.id );

        await category.medicines().delete();
        await category.delete();

        return response.redirect(`/admin/category/list`); 

    }
}

module.exports = CategoryController
