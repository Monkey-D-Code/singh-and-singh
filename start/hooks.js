const  { hooks } = require( '@adonisjs/ignitor' );
const moment = require( 'moment' );

hooks.after.providersBooted(()=>{
    const View = use('View');
    

    View.global('format_date', ( timestamp ) => {
        return moment( timestamp ).format( 'MMMM Do YYYY, h:mm a' )
    });
    View.global('readable_date', ( timestamp ) => {
        return moment( timestamp ).format( 'MMMM Do YYYY' )
    });
    View.global('date_only', ( timestamp ) => {
        return timestamp.split(' ')[0];
    });

    View.global('clip_words' , ( paragraph ) => {
        return paragraph.substring(0 , 100);
    });
    View.global('round_up' , ( number )=>{
        return Math.ceil(number);
    })
})