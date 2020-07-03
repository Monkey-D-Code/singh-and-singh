module.exports = {
    get_random_str : ( length )=>{
        let text = "";
        const possible =   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0 ; i < length ; i++){
            text += possible.charAt(
                Math.floor( Math.random() * possible.length )
            )
        }
        return text;
    },
    generate_otp    :  () => {
        let otp     =   "";
        const possible  =   "1234567890";
        for(let i = 0 ; i < 6 ; i++){
            otp += possible.charAt(
                Math.floor( Math.random() * possible.length )
            )
        }
    }
}