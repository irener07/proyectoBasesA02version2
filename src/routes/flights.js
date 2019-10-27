const express = require('express');
const router = express.Router();
const airlines = require('../models/airlines');

router.get('/flights/createFlight', async (req, res) => {
    const airlinesFound = await airlines.find();
    res.render('flights/createFlight', {airlinesFound});
});

router.post('/flights/createFlight', async (req, res) => {
    const {name, idAirline, origin, destination, flightFeatures, dateTime, restrictions, services, status, maximumCapacity, price}= req.body;
    const errors=[];
    console.log(req.body);
    console.log(idAirline.id);

/*     if(id=='' || firstName=='' || lastName=='' || address=='' || email=='' || password=='' || telephone==''){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('clients/signUpClients',{errors, id, firstName, lastName, birthDate, nationality, country, state, address, email, password, telephone});
    }
    else{
        const idC = await clients.findOne({id: id});
        const emailClient = await clients.findOne({email: email});
        if (emailClient || idC){
            req.flash('error_msg', 'The ID or Email is Already Registered');
            res.redirect('/clients/signUpClients');
        }
        const newClient = new clients({id, firstName, lastName, birthDate, nationality, country, state, address, email, password, telephone});
        newClient.password = await newClient.encryptPassword(password);
        await newClient.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/');
    } */

});

module.exports = router;