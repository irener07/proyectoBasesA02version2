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
        var id = 0;
        if (!idC){
            id = 1;   
        }
        else{   
            id = idC.id + 1;
        }
        const ticketsSold = 0;
        const seatNumber = 0;
        console.log (id);
        const newFlight = new flights({id, idAirline, name, origin, destination, 
            itinerary, dateTime, restrictions, 
            services, status, maximumCapacity,  ticketsSold, seatNumber, price});
        
        await newFlight.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/employees/moduleManagers');
    } 

});


//              Show flights
router.get('/flights', async (req,res) => {
    const flightsFound = await flights.find();
    res.render('flights/moduleFlights', {flightsFound});
});


//              Modify flights
router.get('/flights/modify/:id', async (req, res) => {
    const airlinesFound = await airlines.find();
    const flightFound = await flights.findById(req.params.id);
    res.render('flights/editFlight', {flightFound, airlinesFound});
});

router.put('/flights/modify-flight/:id', async (req,res) => {
    
    const { idAirline, name, origin, destination, 
        itinerary, dateTime, restrictions, 
        services, status, maximumCapacity,  tickectsSold, seatNumber, price}= req.body;
    await flights.findByIdAndUpdate(req.params.id, {
         idAirline, name, origin, destination, 
            itinerary, dateTime, restrictions, 
            services, status, maximumCapacity,  tickectsSold, seatNumber, price
    });
    res.redirect('/employees/moduleManagers');
});

// BORRAR UN VUELO
router.delete('/flights/delete/:id', async (req, res) => {
    await flights.findByIdAndDelete(req.params.id);
    res.redirect('/flights');
});


module.exports = router;


