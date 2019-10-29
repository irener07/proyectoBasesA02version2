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
        }, $expr: { $gt: [ "$maximumCapacity", "$ticketsSold"]} });
        if (flightsFound.length<1){
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

router.get('/clients/confirmPurchase/:idFlight', async (req, res) => {
    const flight = await flights.findById(req.params.idFlight);
    dataUserConnected.idFlight=flight.id;
    res.render('clients/confirmPurchase',{dataUserConnected});
});

router.post('/clients/confirmPurchase/:idFlight', async (req, res) => {
    const {ticketsNumber, suitcases, observation}= req.body;
    const errors=[];
    const idF = await flights.findOne({id: dataUserConnected.idFlight});
    const tS = parseInt(idF.ticketsSold);
    const mC = parseInt(idF.maximumCapacity);
    const tN=parseInt(ticketsNumber)+tS;
    if (tN>=mC){
        errors.push({text: 'The Number of Tickets is Greater than the Maximum Capacity of the Flight'});
    }
    if(ticketsNumber=='' || suitcases=='' || observation==''){
        errors.push({text: 'Please, Review the Data'});
    }
    if(errors.length>0){
        res.render('clients/confirmPurchase',{errors, ticketsNumber, suitcases, observation,dataUserConnected});
    }
    else{
        const idC = await purchases.findOne().sort({$natural:-1}).limit(1);
        const idClient = dataUserConnected.idUserConnected;
        const idFlight = dataUserConnected.idFlight;
        const status = 'Bought';
        const numSeats = [];
        if(!idC){
            const id = 1;
            const newPurchase = new purchases({id, idClient, idFlight, ticketsNumber, suitcases, observation, status, numSeats});
            await newPurchase.save();
            await flights.findOneAndUpdate({id:idFlight}, {ticketsSold:ticketsSold+ticketsSold});
            req.flash('success_msg', 'Successful Purchase');
            res.redirect('/clients/purchasesClients');
        }
        else{
            const id = idC.id + 1;
            const newPurchase = new purchases({id, idClient, idFlight, ticketsNumber, suitcases, observation, status, numSeats});
            await newPurchase.save();
            await flights.findOneAndUpdate({id:idFlight}, {ticketsSold:tN});
            req.flash('success_msg', 'Successful Purchase');
            res.redirect('/clients/purchasesClients');
        }
    }
});

router.get('/clients/checkIn', (req, res) => {
    res.render('clients/checkIn');
});

router.post('/clients/checkIn-clients', async (req,res) => {
    const {clientId, flightId}= req.body;
    const errors=[];
    const purchase = await purchases.findOne({idClient: clientId, idFlight: flightId});
    if(flightId=='' || clientId==''){
        errors.push({text: 'Please, Insert the Data Required'});
    }
    if(errors.length>0){
        res.render('clients/checkIn', {errors});
    }
    else{
        if (purchase.idClient!=clientId){
            errors.push({text: 'The Purchase Corresponds to Another Customer'});
            res.render('clients/checkIn', {errors});
        }
        res.render('clients/checkIn', {errors});
    }
});

router.put('/clients/checkIn-clients', async (req,res) => {
    const {clientId, flightId}= req.body;
    const errors=[];
    const purchase = await purchases.findOne({idClient: clientId, idFlight: flightId});
    if(flightId=='' || clientId==''){
        errors.push({text: 'Please, Insert the Data Required'});
    }
    if(errors.length>0){
        //const airport = {id, name, country, state, address, email, telephone, webPage};
        //res.render('airports/edit-airports',{errors,airport});
        res.redirect('/clients/checkIn', )
    }
    await purchases.findAndModify({query:{ idFlight: idFlight,idClient: idClient}, update: {state: "checked"}});
    req.flash('success_msg', 'Successful Check In');
    res.redirect('/clients/checkIn');
});


module.exports = router;