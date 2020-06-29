// **************** NAVIGATION BAR INTERACTION ***************************
// const navObserver = new IntersectionObserver((entries)=>{
//     if(entries[0].isIntersecting){
//         navAminationTimeline.play();
//     }else{
//         navAminationTimeline.reverse();
//     }
// });
// navObserver.observe(document.querySelector(".navigation-2"))

// cart popup toggle
const cartToggleButton = document.querySelector(".navigation-2 .search-bar .options .cart-toggle");
cartToggleButton.addEventListener("click",()=>{
    if(cartPopupTimeLine.progress() === 0){
        cartPopupTimeLine.play();
    }else if(cartPopupTimeLine.progress() === 1){
        cartPopupTimeLine.seek(0.6).reverse();
    }
})

// pincode popup toggle
const pincodeToggleButton = document.querySelector(".navigation-2 .search-bar .options .pincode-toggle");
pincodeToggleButton.addEventListener("click",()=>{
    if(pincodePopupTimeline.progress() === 0){
        pincodePopupTimeline.play();
    }else if(pincodePopupTimeline.progress() === 1){
        pincodePopupTimeline.reverse();
    }
})

// ************************************************************************

// *********************** SIDE MENU INTERACTION **************************
var hamburger = document.querySelector(".navigation-2 .side-menu .hamburger");
if(hamburger){
    hamburger.addEventListener("click",()=>{
        if(sideMenuTimeline.progress() === 0){
            sideMenuTimeline.play();
        }else if(sideMenuTimeline.progress() ===  1){
            sideMenuTimeline.reverse();
        }
        
    })
}
const pincodeMobile = document.querySelector(".navigation-2 .side-menu ul .pincode-toggle");
if(pincodeMobile){
    pincodeMobile.addEventListener('click',()=>{
        if(pinCodeToggleTimeline.progress() === 0) pinCodeToggleTimeline.play();
        else if(pinCodeToggleTimeline.progress() === 1) pinCodeToggleTimeline.reverse();
    })
}
// ****************************************************************************


// ********************************* ORDER MEDICINE ******************************
if(testimonials){
    const options = {
        rootMargin : screen.width > 768 ? "-250px" : "-100px",
    };
    const testimonialsObserver = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            testimonialTimeline.play();
        } else{
            testimonialTimeline.reverse();
        }
    } , options);   
    testimonialsObserver.observe(testimonials);


}
// *********************************************************************************


// ******************************* HOME PAGE ***********************************
// WHAT WE DO
if(typeof(whatWeDo) !== 'undefined'){
    const options = {
        rootMargin : screen.width > 768 ? "-250px" : "-120px",
    };
    const whatWeDoObserver = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            whatWeDoTimeline.play();
        } else{
            whatWeDoTimeline.reverse();
        }
    } , options);   
    if(whatWeDo) whatWeDoObserver.observe(whatWeDo);
}

// TOP RATED PRODUCTS
if(topRatedProducts){
    const options = {
        rootMargin : screen.width > 768 ? "-200px" : "-130px",
    };
    const topRatedProductsObserver = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            topRatedProductsTimeline.play();
        } else{
            topRatedProductsTimeline.reverse();
        }
    } , options);   
    topRatedProductsObserver.observe(topRatedProducts);
}


// FEATURED BRANDS
if(featuredBrands){
    const options = {
        rootMargin : screen.width > 768 ? "-250px" : "-100px",
    };
    const featuredBrandsObserver = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
            featuredBrandsTimeline.play();
        } else{
            featuredBrandsTimeline.reverse();
        }
    } , options);   
    featuredBrandsObserver.observe(featuredBrands);
}


// *******************************************************************************


// Medicine Quantity Change
var plus = document.querySelector(".medicine-details .product-information .quantity .plus");
var minus = document.querySelector(".medicine-details .product-information .quantity .minus");
var quantity = document.querySelector(".medicine-details .product-information .quantity input");

if(quantity && plus && minus){
    quantity.value = 1;


    plus.addEventListener('click',increase_quantity);
    minus.addEventListener('click',decrease_quantity);

    function increase_quantity(){
        quantity.value = parseInt(quantity.value) + 1;
    }
    function decrease_quantity(){
        if(parseInt(quantity.value) > 1) quantity.value = parseInt(quantity.value) - 1
    }
} 



// LOGIN SERVER MESSAGE
const loginErrorMsgClose = document.querySelector(".login .login-container .server-msg .heading #close");
if(loginErrorMsgClose){
    loginErrorMsgClose.addEventListener('click', () => loginErrorMsgTimeline.play())
}