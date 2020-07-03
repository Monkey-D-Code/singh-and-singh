'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager');

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
Route
    .get('/' , 'WebsiteController.home_page' )
    .as( 'home' )
    .middleware(['frontend_data']);
Route
    .get('order-medicine' , 'WebsiteController.order_medicine_page' )
    .as( 'order_medicine_page' )
    .middleware(['frontend_data']);
Route
    .get('order-by-prescription' , 'WebsiteController.order_by_prescription_page')
    .as( 'order_by_prescription_page' )
    .middleware(['frontend_data']);
Route
    .get('category-list' , 'WebsiteController.category_list_page')
    .as( 'category_list_page' )
    .middleware(['frontend_data']);
Route
    .get(':id/category-details' , 'WebsiteController.category_details_page')
    .as('category_details_page')
    .middleware(['frontend_data']);
Route
    .get(':id/brand-details' , 'WebsiteController.brand_details_page')
    .as('brand_details_page')
    .middleware(['frontend_data']);
Route
    .get(':id/medicine-details' , 'WebsiteController.medicine_details_page')
    .as('medicine_details_page')
    .middleware(['frontend_data']);
Route
    .get(':id/blogpost' , 'WebsiteController.blopost_details_page' )
    .as( 'blogpost_details_page' )
    .middleware(['frontend_data']);

Route
    .get('terms' , 'WebsiteController.terms_page' )
    .as( 'terms_page' )
    .middleware(['frontend_data']);

Route
    .get( 'search-results'  , ({response})=>{return response.redirect('back')});
Route
    .post( 'search-results' , 'WebsiteController.search_results_page' )
    .as('search_results_page')
    .middleware(['frontend_data']);

Route.group(()=>{
    Route.get('login' , 'UserAuthController.login_page')
         .as( 'auth.login' );


}).prefix('auth').middleware(['frontend_data']);





// API routes
Route
    .post('search-pin' , 'WebsiteController.search_pin_api' );





// **********************************************************************************
// *************************** Admin Routes *****************************************
// **********************************************************************************

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

// BRAND ROUTES
Route.group(()=>{
    Route.get('list' , 'BrandController.list').as('brand.list');
    Route.get(':id/details' , 'BrandController.details').as( 'brand.details' );
    Route
        .get('add' , 'BrandController.add_page' )
        .as('brand.add_page');
    Route
        .get(':id/edit' , 'BrandController.edit_page')
        .as( 'brand.edit_page' );
    Route
        .get(':id/delete' , 'BrandController.delete_page')
        .as( 'brand.delete_page' );

    Route
        .post('add' , 'BrandController.add' )
        .validator( 'StoreBrand' )
        .as('brand.add');
    Route
        .post(':id/edit' , 'BrandController.edit' )
        .validator( 'StoreBrand' )
        .as( 'brand.edit' );
    Route
        .post(':id/delete' , 'BrandController.delete')
        .as( 'brand.delete' );


}).prefix('admin/brand').middleware(['is_admin_auth']);

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
    Route
        .get( ':id/details' , 'FrontendController.details' )
        .as( 'frontend.details' );
    Route
        .get('add' , 'FrontendController.add_page' )
        .as( 'frontend.add_page' )
        .middleware(['frontend_exist']);
    Route
        .get(':id/edit' , 'FrontendController.edit_page' )
        .as( 'frontend.edit_page' );

    Route
        .post('add' , 'FrontendController.add' )
        .validator( 'StoreFrontend' )
        .middleware(['frontend_exist'])
        .as( 'frontend.add' );
    Route
        .post( ':id/edit' , 'FrontendController.edit' )
        .validator( 'EditFrontend' )
        .as( 'frontend.edit' );
    

}).prefix('admin/frontend').middleware(['is_admin_auth']);


// SLIDER IMAGE ROUTES
Route.group(()=>{
    Route
        .get( 'add' , 'SliderImageController.add_page' )
        .as( 'slider_image.add_page' );
    Route
        .get( ':id/delete' , 'SliderImageController.delete_page' )
        .as('slider_image.delete_page');


    Route
        .post( 'add' , 'SliderImageController.add' )
        .validator( 'AddSliderImage' )
        .as( 'slider_image.add' );
    Route
        .post( ':id/delete' , 'SliderImageController.delete' )
        .as( 'slider_image.delete' );

}).prefix('admin/sliderimage').middleware(['is_admin_auth']);


// WHO WE ARE ROUTES
Route.group(()=>{
    Route
        .get('add' , 'WhoWeAreController.add_page' )
        .as( 'who_we_are.add_page' );
    Route
        .get(':id/edit' , 'WhoWeAreController.edit_page' )
        .as('who_we_are.edit_page');
    Route
        .get(':id/delete' , 'WhoWeAreController.delete_page')
        .as( 'who_we_are.delete_page' )
        
    Route
        .post( 'add' , 'WhoWeAreController.add' )
        .validator( 'WhoWeAre' )
        .as( 'who_we_are.add' );
    Route
        .post(':id/edit' , 'WhoWeAreController.edit')
        .validator( 'WhoWeAre' )
        .as( 'who_we_are.edit' );
    Route
        .post(':id/delete' , 'WhoWeAreController.delete')
        .as( 'who_we_are.delete' );


}).prefix('admin/whoweare').middleware(['is_admin_auth']);

// TESTIMONIAL
Route.group(()=>{
    Route
        .get('add' , 'TestimonialController.add_page' )
        .as( 'testimonial.add_page' );
    Route
        .get(':id/edit' , 'TestimonialController.edit_page' )
        .as('testimonial.edit_page');
    Route
        .get(':id/delete' , 'TestimonialController.delete_page')
        .as( 'testimonial.delete_page' )
        
    Route
        .post( 'add' , 'TestimonialController.add' )
        .validator( 'StoreTestimonial' )
        .as( 'testimonial.add' );
    Route
        .post(':id/edit' , 'TestimonialController.edit')
        .validator( 'StoreTestimonial' )
        .as( 'testimonial.edit' );
    Route
        .post(':id/delete' , 'TestimonialController.delete')
        .as( 'testimonial.delete' );


}).prefix('admin/testimonial').middleware(['is_admin_auth']);

// TERMS & CONDITIONS 
Route.group(()=>{
    Route
        .get('add' , 'TermController.add_page' )
        .as( 'term.add_page' );

    Route
        .get(':id/edit' , 'TermController.edit_page' )
        .as('term.edit_page');
    Route
        .get(':id/delete' , 'TermController.delete_page')
        .as( 'term.delete_page' )
        
    Route
        .post( 'add' , 'TermController.add' )
        .validator( 'StoreTerm' )
        .as( 'term.add' );
    Route
        .post(':id/edit' , 'TermController.edit')
        .validator( 'StoreTerm' )
        .as( 'term.edit' );
    Route
        .post(':id/delete' , 'TermController.delete')
        .as( 'term.delete' );

}).prefix('admin/term').middleware(['is_admin_auth']);

// PINCODE ROUTES
Route.group(()=>{
    Route
        .get('add' , 'PincodeController.add_page' )
        .as( 'pincode.add_page' );
    Route
        .get(':id/edit' , 'PincodeController.edit_page' )
        .as( 'pincode.edit_page' );
    Route
        .get(':id/delete' , 'PincodeController.delete_page' )
        .as( 'pincode.delete_page' );

    Route
        .post('add' , 'PincodeController.add' )
        .validator( 'StorePincode' )
        .as( 'pincode.add' );
    Route
        .post(':id/edit' , 'PincodeController.edit' )
        .validator( 'StorePincode' )
        .as( 'pincode.edit' );
    Route
        .post(':id/delete' , 'PincodeController.delete' )
        .as( 'pincode.delete' ); 
    

}).prefix('admin/pincode').middleware(['is_admin_auth']);


// ****************************************************************************
// ****************************************************************************
// ****************************************************************************