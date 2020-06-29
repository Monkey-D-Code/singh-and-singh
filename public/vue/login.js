const loginApp = new Vue({
    el : "#login-app",
    data : {
        form_data : {
            name : '',
            pincode : '',
            phone : '',
        },
        loading : false,
        show_server_error : true,
        server_error_msgs : [
            'Provide Your name',
            'Delivery not Available @ 721507',
            'Please enter a phone number',
        ],
        
    },
    methods : {
        login : function(){
            this.loading = true;
        }
    }
})