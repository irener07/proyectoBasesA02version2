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
        if (flightsFound==[]){
            errors.push({text: 'Do not exist Flights this filters'});
            res.render('clients/purchasesClients',{errors, origin, destination, date01, date02});
            return;
        }
        else{
            const dataUser = dataUserConnected.idUserConnected;
            res.render('clients/purchasesClients', {flightsFound, dataUser});
        }
    }
});

router.get('/clients/mainModule', (req, res) => {
    console.log(dataUserConnected.idUserConnected);
    res.render('clients/mainModule');
});

router.get('/clients/checkIn', (req, res) => {
    res.render('clients/checkIn');
});

router.get('/clients/confirmPurchase/:idClient/:idFlight', async (req, res) => {
    const flight = await flights.findById(req.params.idFlight);
    dataUserConnected.idFlight=flight.id;
    console.log(dataUserConnected.idFlight);
    res.render('clients/confirmPurchase',{dataUserConnected});
});

router.post('/clients/confirmPurchase/:idClient/:idFlight', async (req, res) => {
    const {ticketsNumber, suitcases, observation}= req.body;
    const errors=[];
    console.log(req.body);
    if(ticketsNumber=='' || suitcases=='' || observation==''){
        errors.push({text: 'Please, Review the Data'});
    }
    if(errors.length>0){
        res.render('clients/confirmPurchase',{errors, ticketsNumber, suitcases, observation,dataUserConnected});
    }
    else{
        const idC = await purchases.findOne().sort({$natural:-1}).limit(1);
        const numID = idC.id + 1;
        const idCl = dataUserConnected.idUserConnected;
        const idFl = dataUserConnected.idFlight;
        const sta = 'Bought';
        const numSeats = [];
        const newPurchase = new purchases({numID, idCl, idFl, ticketsNumber, suitcases, observation, sta, numSeats});
        await newPurchase.save();
        req.flash('success_msg', 'Successful Purchase');
        res.redirect('clients/purchasesClients');
    }
});

module.exports = router;