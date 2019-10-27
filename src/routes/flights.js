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
    airlinesFound = airlines.find();
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