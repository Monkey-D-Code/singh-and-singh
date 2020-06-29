const  { hooks } = require( '@adonisjs/ignitor' );
const moment = require( 'moment' );

hooks.after.providersBooted(()=>{
    const View = use('View');
    

    View.global('format_date', ( timestamp ) => {
        return moment( timestamp ).format( 'MMMM Do YYYY, h:mm a' )
    });

    View.global('clip_words' , ( paragraph ) => {
        return paragraph.substring(0 , 100);
    });
})