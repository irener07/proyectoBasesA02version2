const express = require('express');
const router = express.Router();
const clients = require('../models/clients');
const flights = require('../models/flights');
const purchases = require('../models/purchases');

const dataUserConnected = require('../configuration/connectDB');


router.get('/clients/signUpClients', (req, res) => {
    res.render('clients/signUpClients');
});

router.post('/clients/signUpClients', async (req, res) => {
    const {id, firstName, lastName, birthDate, nationality, country, state, address, email, password, telephone}= req.body;
    const errors=[];
    console.log(req.body);
    if(nationality==-1){
        errors.push({text: 'Please, Select Nationality'});
    }
    if(country==-1){
        errors.push({text: 'Please, Select Country'});
    }
    if(!state || state==-1){
        errors.push({text: 'Please, Select State'});
    }
    if(id=='' || firstName=='' || lastName=='' || address=='' || email=='' || password=='' || telephone==''){
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
    }
});

router.get('/clients/moduleClients', (req, res) => {
    res.render('clients/moduleClients');
});

router.get('/clients/purchasesClients', (req, res) => {
    res.render('clients/purchasesClients');
});

router.post('/clients/purchasesClients', async (req, res) => {
    const {origin, destination, date01, date02}= req.body;
    const errors=[];
    console.log(req.body);
    if(origin==-1 || destination==-1 || origin==destination || date01>date02){
        errors.push({text: 'Please, Review the Data'});
    }
    if(errors.length>0){
        res.render('clients/purchasesClients',{errors, origin, destination, date01, date02});
    }
    else{
        const flightsFound = await flights.find({origin:origin, destination:destination, dateTime: {
            $gte: date01,
            $lt: date02
        }});
        console.log(flightsFound);
        if (flightsFound==[]){
            errors.push({text: 'Do not exist Flights this filters'});
            res.render('clients/purchasesClients',{errors, origin, destination, date01, date02});
            return;
        }
        else{
            res.render('clients/purchasesClients', {flightsFound});
        }
    }
});

router.get('/clients/mainModule', (req, res) => {
    res.render('clients/mainModule');
});



router.get('/clients/confirmPurchase/:id', async (req, res) => {
    const flights = await flights.findById(req.params.id);
    dataUserConnected.idFlight=flights.id;
    console.log(dataUserConnected.idFlight);
    res.render('clients/confirmPurchase',{flights});
});

router.post('/clients/confirmPurchase/', async (req, res) => {
    const {ticketsNumber, suitcases, observation}= req.body;
    const errors=[];
    console.log(req.body);
    if(ticketsNumber=='' || suitcases=='' || observation==''){
        errors.push({text: 'Please, Review the Data'});
    }
    if(errors.length>0){
        res.render('clients/confirmPurchase',{errors, ticketsNumber, suitcases, observation});
    }
    else{
        const flightsFound = await flights.find({origin:origin, destination:destination, dateTime: {
            $gte: date01,
            $lt: date02
        }});
        if (flightsFound.length<1){
            errors.push({text: 'No Flights have been found.'});
            res.render('clients/purchasesClients',{errors, origin, destination, date01, date02});
        }
        else{
            res.render('clients/purchasesClients', {flightsFound});
        }
    }
});

router.get('/clients/checkIn/:id', (req, res) => {
    res.render('clients/checkIn');
});

router.put('/clients/checkIn-clients/:id', async (req,res) => {
    const {clientId, flightId}= req.body;
    const errors=[];

    if(flightId=='' || clientId==''){
        errors.push({text: 'Please, Insert the Data Required'});
    }
    if(errors.length>0){
        //const airport = {id, name, country, state, address, email, telephone, webPage};
        //res.render('airports/edit-airports',{errors,airport});
        res.redirect('/clients/checkIn')
    }
    await purchases.findAndModify({query:{ idFlight: idFlight,idClient: idClient}, update: {state: "checked"}});
    });
    req.flash('success_msg', 'Successful Check In');
    res.redirect('/clients/checkIn');
});


module.exports = router;