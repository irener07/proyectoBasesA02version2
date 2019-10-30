const express = require('express');
const router = express.Router();
const employees = require('../models/employees');
const airlines = require('../models/airlines');
const flights = require('../models/flights');
const purchases = require('../models/purchases');
const clients = require('../models/clients');
const currentDate = Date.now;

//              MOSTRAR EMPLEADOS
router.get('/employees', async (req,res) => {
    const employeesFound = await employees.find();
    res.render('employees/all-employees', {employeesFound});
});

//              MODIFICAR EMPLEADOS
router.get('/employees/modify/:id', async (req, res) => {
    const employeeFound = await employees.findById(req.params.id);
    res.render('employees/editEmployees', {employeeFound});
});

router.put('/employees/modify-employee/:id', async (req,res) => {
    const {id, firstName, lastName, type, jobArea, email, password}= req.body;
    await employees.findByIdAndUpdate(req.params.id, {
        id, firstName, lastName, type, jobArea, email, password
    });
    res.redirect('/employees');
});

//              BORRAR EMPLEADOS
router.delete('/employees/delete/:id', async (req, res) => {
    await employees.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
});

router.get('/employees/signUpEmployeees', (req, res) => {
    res.render('employees/signUpEmployeees');
});


router.get('/employees/signUpEmployees', (req, res) => {
    res.render('employees/signUpEmployees');
  });

router.get('/employees/moduleEmployees', (req, res) => {
    res.render('employees/moduleEmployees');
});

router.get('/employees/moduleManagers', (req, res) => {
    res.render('employees/moduleManagers');
});

router.post('/employees/signUpEmployees', async (req, res) => {
      const { id, firstName, lastName, type, jobArea, email, password }= req.body;
      const errors=[];
      console.log(req.body);

    if(type==-1){
        errors.push({text: 'Please, Select the type of worker'});
    }
    if(jobArea==-1){
        errors.push({text: 'Please, Select a department'});
    }
    if(id=='' || firstName=='' ||  lastName=='' ||  password=='' 
    ||  email==''){
        errors.push({text: 'Please, Insert the complete Data'});
    }
    if(errors.length>0){
        res.render('employees/signUpEmployees',{errors, id, firstName, lastName, type, 
            jobArea, email, password });   }
            
        else{
            const idE = await employees.findOne({id: id});
            const emailEmployee = await employees.findOne({email: email});
            if (emailEmployee || idE){
                req.flash('error_msg', 'The ID or Email is Already Registered');
                res.redirect('/employees/signUpEmployees');
            }

            const newEmployee = new employees( {id, firstName, lastName, type, currentDate, 
            jobArea, email, password } );
            newEmployee.password = await newEmployee.encryptPassword(password);
            await newEmployee.save();
            req.flash('success_msg', 'Successful Registration');
            res.redirect('/employees');
    
        } 
    
    });

router.get('/employees/boarding', (req, res) => {
    res.render('employees/boardingEmployee');
});
    
router.post('/employees/boarding/search', async (req,res) => {
    const {clientId, flightId}= req.body;
    const errors=[];
    const purchase = await purchases.findOne({idClient: clientId, idFlight: flightId, status:'Checkin'});
    if(flightId=='' || clientId==''){
        errors.push({text: 'Please, Insert the Data Required'});
    }
    if(!purchase){
        errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
    }
    if(errors.length>0){
        res.render('employees/boardingEmployee', {errors});
    }
    else{
        res.render('employees/boardingEmployee', {purchase});
    }
});
    
router.post('/employees/boardingEmployee/:_id&:idClient&:idFlight', async (req,res) => {
    const pur = await purchases.findById(req.params._id);
    await purchases.findByIdAndUpdate(req.params._id, { status:'Used'});
    req.flash('success_msg', 'Successful Check In. The Tickets Have Changed Status');
    res.redirect('/employees/boarding');
});

router.get('/employees/allDataClients', async (req, res) => {
    const allClients = await clients.find();
    res.render('employees/consultAllClients', {allClients});
});

router.get('/employees/dataClient', (req, res) => {
    res.render('employees/consultOneClient');
});
    
router.post('/employees/dataClient/search', async (req,res) => {
    const {clientId}= req.body;
    const errors=[];
    const client = await clients.findOne({id:clientId});
    if(clientId==''){
        errors.push({text: 'Please, Insert the Data Required'});
    }
    if(!client){
        errors.push({text: 'Please, Review the Data. There are no Clients with these Parameters'});
    }
    if(errors.length>0){
        res.render('employees/consultOneClient', {errors});
    }
    else{
        res.render('employees/consultOneClient', {client});
    }
});

  
//                      Manager Reports
router.get('/employees/moduleManagers/airlineFlights', async (req, res) => {
    const airlinesFound =  await airlines.find();
    const flightsFound = await flights.find();
    const airlineFlights = new Array();
    flightsFound.forEach( (flight) => {
        airlinesFound.forEach((airline) =>{
            if (flight.idAirline==airline.id){
                const totalAmount = flight.ticketsSold*flight.price;
                const newAirlineFlight = {
                    airlineName: airline.name,
                    flightName: flight.name,
                    origin: flight.origin,
                    destination: flight.destination,
                    date: flight.dateTime,
                    tickets: parseInt(flight.ticketsSold),
                    totalAmount
                };
                airlineFlights.push(newAirlineFlight);

            }
        });
    });
    res.render('employees/airlinesFlights',{airlineFlights});
});
module.exports = router;

router.get('/employees/moduleManagers/passengersTicketsRange', async (req, res) => {
    const clientsFound = await clients.find();
    const purchasesFound = await purchases.find();
    const passengersTicketsRanges = new Array();
    clientsFound.forEach( (client) => {
        var min = 0;
        var max = 0;
        purchasesFound.forEach( (purchase) => {
            if (client.id==purchase.idClient){
                if (min==0 & max==0){
                    min=purchase.ticketsNumber;
                    max=purchase.ticketsNumber;
                }
                if (min>purchase.ticketsNumber){
                    min=purchase.ticketsNumber;
                }
                if (max<purchase.ticketsNumber){
                    max=purchase.ticketsNumber;
                }
            }
        });
        const passengersTicketRange = {
            id: client.id,
            name: client.firstName,
            lastName: client.lastName,
            range: [min,max]
        };
        passengersTicketsRanges.push(passengersTicketRange);
    });
    res.render('employees/passengersTicketsRange',{passengersTicketsRanges});
});

