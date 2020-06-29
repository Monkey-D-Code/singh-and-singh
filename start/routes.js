'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// website routes
Route.on('/').render('website/home')
Route.on('/login').render('website/login')


// Admin Routes
Route.group(()=>{
    Route.get('login' , 'AdminController.login_page').as('admin.login_page');
    Route.post('login' , 'AdminController.admin_login' )
            .validator('AdminLogin')
            .as('admin.admin_login');
}).prefix('admin').middleware(['admin_logged_in']);

Route.group(()=>{
    Route.get('/', 'AdminController.home');
    
    Route.get('logout' , 'AdminController.logout' ).as( 'admin.admin_logout' );
        
}).prefix('admin').middleware(['is_admin_auth']);

// CATEGORY
Route.group(()=>{
    Route.get('list' , 'CategoryController.list' );
    Route.get('add' ,  'CategoryController.add_page' );
    
    Route.get(':id/details' , 'CategoryController.details' ).as( 'category.details' );
    Route.get(':id/edit' , 'CategoryController.edit_page').as('category.edit');
    Route.get(':id/delete' , 'CategoryController.delete_page').as('category.delete');

    Route
        .post( 'add', 'CategoryController.add_category' )
        .validator('StoreCategory');
    Route
        .post(':id/edit' , 'CategoryController.edit_category' )
        .validator('StoreCategory');
    Route
        .post(':id/delete' , 'CategoryController.delete_category');
    

}).prefix('admin/category').middleware(['is_admin_auth']);

// MEDICINE
Route.group( ()=>{
    Route.get(':categoryId/add' , 'MedicineController.add_page' );
    Route.get(':id/details' , 'MedicineController.details' ).as( 'medicine.details' );
    Route.get(':id/edit' , 'MedicineController.edit_page' ).as( 'medicine.edit_page' );
    Route.get(':id/delete' , 'MedicineController.delete_page' ).as('medicine.delete_page' );

    Route.post(':categoryId/add' , 'MedicineController.add' )
         .validator( 'StoreMedicine' );
    Route.post(':id/edit' , 'MedicineController.edit' )
        .validator( 'StoreMedicine' )
        .as( 'medicine.edit' );
    Route.post(':id/delete' , 'MedicineController.delete')
         .as( 'medicine.delete' );

} ).prefix('admin/medicine').middleware(['is_admin_auth']);

// MEDICINE IMAGE
Route.group(()=>{
    Route
        .get(':medicine_id/add' , 'MedicineImageController.add_page' )
        .as('medicine_image.add_page');
    Route
        .get(':id/delete' , 'MedicineImageController.delete_page' )
        .as( 'medicine_image.delete_page' );

    Route
        .post(':medicine_id/add' , 'MedicineImageController.add' )
        .validator('StoreMedicineImage')
        .as( 'medicine_image.add' );
        
    Route
        .post(':id/delete' , 'MedicineImageController.delete')
        .as( 'medicine_image.delete' );

}).prefix('admin/medicine-image').middleware(['is_admin_auth']);

// BLOG POST
Route.group(()=>{
    Route
        .get('list' , 'BlogPostController.list' )
        .as( 'blogpost.list' );
    Route
        .get('add' , 'BlogPostController.add_page' )
        .as( 'blogpost.add_page' );
    Route
        .get(':id/details' , 'BlogPostController.details' )
        .as( 'blogpost.details' );
    Route
        .get(':id/edit' , 'BlogPostController.edit_page')
        .as( 'blogpost.edit_page' );
    Route
        .get(':id/delete' , 'BlogPostController.delete_page')
        .as('blogpost.delete_page')

    
    Route
        .post('add' , 'BlogPostController.add')
        .validator( 'AddBlogPost' )
        .as( 'blogpost.add' );
    Route
        .post(':id/edit' , 'BlogPostController.edit')
        .validator( 'EditBlogPost' )
        .as( 'blogpost.edit' );
    Route
        .post(':id/delete' , 'BlogPostController.delete' )
        .as( 'blogpost.delete' );

}).prefix('admin/blogpost').middleware(['is_admin_auth']);


// WEBSITE ROUTES
Route.group(()=>{
    

}).prefix('frontend').middleware(['is_admin_auth']);