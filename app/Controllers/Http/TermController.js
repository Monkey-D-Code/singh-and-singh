'use strict'

const Term      =       use('App/Models/Term');

class TermController {
    async add_page({ view }){
        return view.render('admin/term/form',{
            add_mode : true,
        });
    }
    async edit_page({ view , params }){
        const term = await Term.find( params.id )
        return view.render('admin/term/form',{
            edit_mode : true,
            term : term.toJSON()
        })
    }
    async delete_page( {view,params} ){
        const term = await Term.find( params.id )
        return view.render('admin/term/delete',{
            term : term.toJSON()
        })
    }

    // post controllers
    async add({  request, response , session }){
        const {heading,desc} = request.post();
        const new_term = new Term();
        new_term.heading = heading;
        new_term.desc = desc;

        try{
            await new_term.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(err){
            console.log(err);
            session.flash({
                termSaveErr : "Error while saving term"
            });
            return response.redirect('back');
        }
    }
    async edit({ request , response , params , session }){
        const {heading,desc} = request.post();
        const term = await Term.find( params.id )
        term.heading = heading;
        term.desc = desc;
        try{
            await term.save();
            return response.redirect('/admin/frontend/1/details');
        }catch(error){
            console.log(error);
            session.flash({
                termSaveErr : 'Error while updating term'
            })
            return response.redirect('back');
        }
    }
    async delete({response,params,session}){
        const term = await Term.find( params.id )
        try{
            await term.delete();
            return response.redirect('/admin/frontend/1/details');
        }catch(e){
            console.log(e);
            session.flash({
                termDeleteErr : "Error while deleting term !"
            });
            return response.redirect('back');
        }
    }

}

module.exports = TermController
