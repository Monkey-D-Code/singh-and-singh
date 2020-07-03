'use strict'

const WhoWeAre          =   use( 'App/Models/WhoWeAre' );

class WhoWeAreController {
    async add_page( { view } ){
        return view.render('admin/who_we_are/form',{
            add_mode : true,
        })
    }
    async edit_page({ view , params }){
        const who_we_are = await WhoWeAre.find( params.id )
        return view.render('admin/who_we_are/form',{
            edit_mode : true,
            who_we_are : who_we_are.toJSON()
        })
    }
    async delete_page( {view,params} ){
        const who_we_are = await WhoWeAre.find( params.id )
        return view.render('admin/who_we_are/delete',{
            who_we_are : who_we_are.toJSON()
        })
    }

    // post controllers
    async add({  request, response , session }){
        const {heading,desc} = request.post();
        const new_whoweare = new WhoWeAre();
        new_whoweare.heading = heading;
        new_whoweare.desc = desc;

        try{
            await new_whoweare.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(err){
            console.log(err);
            session.flash({
                whoWeAreSaveErr : "Error while saving your point"
            });
            return response.redirect('back');
        }
    }
    async edit({ request , response , params , session }){
        const {heading,desc} = request.post();
        const who_we_are = await WhoWeAre.find( params.id );
        who_we_are.heading      =   heading;
        who_we_are.desc         =   desc;
        try{
            await who_we_are.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(error){
            console.log(error);
            session.flash({
                whoWeAreSaveErr : 'Error while updating point'
            })
            return response.redirect('back');
        }
    }
    async delete({response,params,session}){
        const who_we_are = await WhoWeAre.find( params.id );
        try{
            await who_we_are.delete();
            return response.redirect('/admin/frontend/1/details');
        }catch(e){
            console.log(e);
            session.flash({
                whoWeAreDeleteErr : "Error whiile deleting point !"
            });
            return response.redirect('back');
        }
    }
}

module.exports = WhoWeAreController
