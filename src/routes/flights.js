const express = require('express');
const router = express.Router();
const airlines = require('../models/airlines');
const flights = require('../models/flights');

router.get('/flights/createFlight', async (req, res) => {
    const airlinesFound = await airlines.find();
    console.log(airlinesFound);
    res.render('flights/createFlight',{airlinesFound});
});

router.post('/flights/createFlight', async (req, res) => {
    const {name, origin, destination, idAirline, 
        itinerary, dateTime, restrictions, 
        services, status, maximumCapacity, price}= req.body;
    const errors=[];
    console.log(req.body);

    if(name=='' || origin=='' || destination=='' || idAirline=='' || itinerary=='' || dateTime=='' || 
    status==''  || maximumCapacity=='' || price==''){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('flights/createFlight',{errors, name, origin, destination, idAirline, itinerary, dateTime, restrictions, 
            services, status, maximumCapacity, price});
    }
    else{
        const idC = await flights.findOne().sort({$natural:-1}).limit(1);
        const id = idC.id + 1;
        const  tickectsSold = 0;
        const seatNumber = 0;
        console.log (id);
        const newFlight = new flights({id, idAirline, name, origin, destination, 
            itinerary, dateTime, restrictions, 
            services, status, maximumCapacity,  tickectsSold, seatNumber, price});
        
        await newFlight.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/');
    } 

});


//              MOSTRAR VUELOS
router.get('/flights', async (req,res) => {
    const flightsFound = await flights.find();
    res.render('employees/moduleFlights', {flightsFound});
});


//              MODIFICAR VUELOS
router.get('/flights/modify/:id', async (req, res) => {
    const flightFound = await flights.findById(req.params.id);
    res.render('flights/editFlights', {flightFound});
});

router.put('/flights/modify-flight/:id', async (req,res) => {
    const {id, idAirline, name, origin, destination, 
        itinerary, dateTime, restrictions, 
        services, status, maximumCapacity,  tickectsSold, seatNumber, price}= req.body;
    await flights.findByIdAndUpdate(req.params.id, {
        id, idAirline, name, origin, destination, 
            itinerary, dateTime, restrictions, 
            services, status, maximumCapacity,  tickectsSold, seatNumber, price
    });
    res.redirect('/flights');
});


module.exports = router;


/*
const express = require('express');
const router = express.Router();
const flights = require('../models/flights');
const airlines = require('../models/airlines');

// MODIFICAR UN VUELO
router.get('/flights/modify/:id', async (req, res) => {
    const flightFound = await flights.findById(req.params.id);
    res.render('flights/editFlights', {flightFound});
});

router.put('/flights/modify-flight/:id', async (req,res) => {
    const {id, idAirline, name, origin, destination, itinerary, dateTime, price, 
    restrictions, services, status, maximumCapacity, ticketsSold, seatNumber}= req.body;
    await flights.findByIdAndUpdate(req.params.id, {
        id, idAirline, name, origin, destination, itinerary, dateTime, price, 
    restrictions, services, status, maximumCapacity, ticketsSold, seatNumber
    });
    res.redirect('/flights');
});

// BORRAR UN VUELO
router.delete('/flights/delete/:id', async (req, res) => {
    await flights.findByIdAndDelete(req.params.id);
    res.redirect('/flights');
});

router.get('/flights/moduleFlights', (req, res) => {
    res.render('flights/moduleFlights');
});

// CREAR UN VUELO
router.get('/flights/createFlight', (req, res) => {
    res.render('flights/createFlight', {airlinesFound});
  });

//Flights(id, idAirline, name, origin, destination, itinerary{}, date, time, price, 
//restrictions{}, services{}, status, maximumCapacity, ticketsSold, seatNumber);
router.post('/flights/createFlight', async (req, res) => {
    const {name, origin, destination,idAirline, itinerary, dateTime, restrictions, services, status,
        maximumCapacity, price}= req.body;
    const errors=[];
    console.log(req.body); 

   if(id=='' || idAirline=='' || name=='' || origin=='' || destination=='' || itinerary=='' 
   || dateTime=='' || price=='' || status=='' || maximumCapacity=='' 
   ){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('flights/createFlight',{name, origin, destination,idAirline, itinerary, dateTime, restrictions, services, status,
            maximumCapacity, price});
    }
    else{
        const idC = await flights.findOne({id: id});
        if (idC){
            req.flash('error_msg', 'The ID is Already Registered');
            res.redirect('/flights/createFlight');
        }
        const newFlight = new flights({id, idAirline, name, origin, destination, itinerary, dateTime,
            price, restrictions, services, status, maximumCapacity});
        await newFlight.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/flights');
    } 

});



module.exports = router;

*/