const express = require('express');
const router = express.Router();
const passport = require('passport');
const airports = require('../models/airports');



router.get('/airports/new-airport', (req, res) => {
    res.render('airports/new-airport');
});


//                      Creation of new airport
router.post('/airports/new-airport', async (req, res) => {
    const {id, name, country, state, address, email, telephone, webPage}= req.body;
    const errors=[];

    if(country==-1){
        errors.push({text: 'Please, Select Country'});
    }
    if(!state || state==-1){
        errors.push({text: 'Please, Select State'});
    }
    if(id=='' || name=='' || address=='' || email=='' || telephone=='' || webPage==''){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('airports/new-airport',{id, name, country, state, address, email, telephone, webPage});
    }
    else{
        const idC = await airports.findOne({id: id});
        const emailAirport = await airports.findOne({email: email});
        if (emailAirport || idC){
            req.flash('error_msg', 'The ID or Email is Already Registered');
            res.redirect('/airports/new-airport');
        }
        const newAirport = new airports({id, name, country, state, address, email, telephone, webPage});
        await newAirport.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/airports');
    }
});

//                          Information of all airports and CRUD options
router.get('/airports', async (req, res) => {
    const airportsFound = await airports.find();
    res.render('airports/all-airports.hbs', {airportsFound});
});





module.exports = router;