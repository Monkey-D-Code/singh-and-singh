// ************************ SIDE MENU *********************************
const sideMenuTimeline = gsap.timeline({paused : true});
sideMenuTimeline.to(".navigation-2 .side-menu",{
    right : "-1px",
    duration : 0.05,
    ease : "ease",
}).from(".navigation-2 .side-menu ul li" , {
    opacity : 0,
    x : "250px",
    duration : 0.06,
    stagger : 0.04,
});
// pincode toggle
const pinCodeToggleTimeline = gsap.timeline({paused : true});
pinCodeToggleTimeline.to(".navigation-2 .side-menu",{
    width : "90%",
    duration : 0.3,
}).from(".navigation-2 .side-menu .enter-pincode-mobile",{
    scaleX : 0,
    transformOrigin : "left",
    duration : 0.3,
})

// *********************************************************************

// ****************** NAVIGATION MENU **********************************
const navAminationTimeline = gsap.timeline({paused : false})
navAminationTimeline.from(".navigation-2 .search-bar .brand img" , {
    duration : 1,
    width : "50px",
    ease : "elastic"
}).from(".navigation-2 .search-bar .search" , {
    duration : 0.4,
    y : "-100px",
    opacity : 0,
    ease : "ease",
});

const cartPopupTimeLine = gsap.timeline({paused : true});
cartPopupTimeLine.from(".navigation-2 .search-bar .options .cart-popup" ,{
    scale : 0,
    duration : 0.3,
    transformOrigin : "top right",
    ease : Power4.ease,
}).from(".navigation-2 .search-bar .options .cart-popup .item-list .single-item",{
    opacity : 0,
    duration : 0.5,
    stagger : 0.1,
},"-=0.2")

const pincodePopupTimeline = gsap.timeline({paused : true});
pincodePopupTimeline.from(".navigation-2 .search-bar .options .enter-pincode",{
    scale : 0,
    duration : 0.3,
    transformOrigin : "top right",
    ease : Power4.ease,
})

// ***********************************************************************

// ********************* HOME PAGE *************************************

// SLIDER
var no_of_slides = document.querySelectorAll(".hero-slider .slide-container .slide").length;
var slideTimeline = gsap.timeline({delay  :1 ,repeat : -1 , yoyo : true});
var hero_slider = document.querySelector(".hero-slider");
var slide_width = hero_slider ? hero_slider.clientWidth : 0;

if(no_of_slides){
    slideTimeline.to(".hero-slider .slide-container" , {
        x : `-${slide_width * (no_of_slides - 1)}px` , 
        duration : (no_of_slides * 3),
        ease : "none",
    });

}

// WHAT WE DO
const whatWeDo = document.querySelector(".our-services");
const whatWeDoTimeline = gsap.timeline({paused : true});
if(whatWeDo){
    whatWeDoTimeline.from(".our-services .lead-img",{
        x : "80%",
        duration : 0.6,
        ease : "ease",
    }).from(".our-services .list .service",{
        scale : 0,
        duration : 0.3,
        stagger : 0.2
    },"-=0.3")
}

// TOP RATED PRODUCTS
const topRatedProducts = document.querySelector(".top-rated-products");
const topRatedProductsTimeline = gsap.timeline({paused : true});
if(topRatedProducts){
    topRatedProductsTimeline.from(".top-rated-products svg",{
        scaleX : 0,
        transformOrigin : "top left",
        duration : 0.8,
        ease : Power1.ease,
    }).from(".top-rated-products .heading",{
        scale : 0,
        duration : 0.9,
        ease : "elastic",
    },"-=0.6").from(".top-rated-products .product-list .single-product",{
        scale : 0,
        duration : 0.4,
        ease : Power2.ease,
        stagger : 0.2
    },"-=0.1")
}

// FEATURED BRANDS
const featuredBrands = document.querySelector(".featured-brands");
const featuredBrandsTimeline = gsap.timeline({paused : false});
if(featuredBrands){
    featuredBrandsTimeline.from(".featured-brands h1",{
        scale : 0,
        duration : 2,
        ease : "elastic"
    }).from(".featured-brands .brand-list .brand-card",{
        opacity : 0,
        scaleX : 0,
        transformOrigin : "top left",
        duration : 0.5,
        stagger : 0.2,
    },"-=1.5")
}

// **********************************************************************


// *************************** ORDER MEDICINE ***************************
const testimonialTimeline = gsap.timeline({paused : true});
const testimonials = document.querySelector(".testimonials");
if(testimonials){
    testimonialTimeline.from(".testimonials .testimonial-list .single-testimonial",{
        scale : 0,
        transformOrigin : "top left",
        duration : 1,
        stagger : 0.3,
        delay : 0.6,
    })
}

// **********************************************************************


// *************************** SEARCH RESULTS ***************************
const searchResults = document.querySelector(".search-results");
const searchResultsTimeline = gsap.timeline({paused : false});
if(searchResults){
    searchResultsTimeline.from(".search-results .results-container .single-result",{
        scaleY : 0,
        opacity : 0,
        transformOrigin : "top",
        duration : 1.5,
        stagger : 0.5,
    })
}


// **********************************************************************


// ******************** LOGIN ERROR MESSAGE *****************************
const loginErrorMsg = document.querySelector(".login .login-container .server-msg");
const loginErrorMsgTimeline = gsap.timeline({paused : true});
if(loginErrorMsg){
    loginErrorMsgTimeline.to(".login .login-container .server-msg",{
        scale : 0,
        duration : 1.5,
    })
}
// ***********************************************************************