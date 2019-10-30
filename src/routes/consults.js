const express = require('express');
const router = express.Router();
const employees = require('../models/employees');
const purchases = require('../models/purchases');
const flights = require('../models/flights');
const clients = require('../models/clients');
const airports = require('../models/airports');
const airlines = require('../models/airlines');
const Schema = mongoose.Schema;




//TERCERA CONSULTA

//router.get('/employees/mostVisitedDestinations', (req, res) => {
  //  res.render('employees/mostVisitedDestinations');
//});

/*
router.get('/employees/moduleManagers/mostVisitedDestinations', async (req, res) => {
    const flightsFound =  await flights.find();
    const purchasesFound = await purchases.find();

    const foundDestinations = new Array();
    
    const foundResults = new Array();
    const foundResult = new Schema({
        
        destinationName: {
            type: String
        },
        quantityTickets: {
            type: Number
        }});

    for (flight in flightsFound) {
        for (purchase in purchasesFound){
            if (flight.idAirline==purchase.idFlight){
                //INSERT THE DESTINATIONS IN THE ARRAY
             for(var counter = 0; 
                    counter < foundDestinations.length; counter++) {
                    if (foundDestinations[counter] == flight.destination){
                        break;
                    }
                    else{
                        foundDestinations.push(flight.destination);
                    }
                };
            }
        }
    }
    for(var counter = 0; 
        counter < foundDestinations.length; counter++) {
            var quantityTickets = 0;
        for (flight in flightsFound) {
            for (purchase in purchasesFound){
                if ((flight.idAirline==purchase.idFlight) & (flight.idAirline==foundDestinations[counter])){
                    quantityTickets = quantityTickets + parseInt(purchase.ticketsNumber);
                }
            }
        }
        
        const newFoundResult = new foundResult(
            foundDestinations[counter],
            parseInt(quantityTickets)
        );
        foundResults.push(newFoundResult);
    };
    res.render('employees/mostVisitedDestinations',{foundResults});
});


*/
module.exports = router;
