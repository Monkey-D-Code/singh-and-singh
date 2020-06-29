// DISPLAYING PRELOADER WHILE LOADING
const preloader = document.querySelector(".pre-loader");
document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        setInterval(()=>{
            document.body.style.overflow = "auto";
            preloader.style.display = "none";
        }, 500)
        
    }else{
        document.body.style.overflow = "hidden";
        preloader.style.display = "block";
    }
};

function searchMedicine(event){
    const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    window.location = `${baseUrl}/search-results.html`
}

const navBarSearch = document.querySelector(".navigation-2 .search-bar .search button");
if(navBarSearch){
    navBarSearch.addEventListener('click',(event)=>searchMedicine(event));
}
const orderMedicineSearch = document.querySelector(".order-medinices .search-medicine .search-input-container .search-field .search-med");
if(orderMedicineSearch){
    orderMedicineSearch.addEventListener('click',(event)=>searchMedicine(event));
}