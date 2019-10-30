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
router.get('/employees', async (req,res) => {
    const employeesFound = await employees.find();
    res.render('employees/mostVisitedDestinations', {employeesFound});
});


//Fourth Query Manager
router.get('/employees/checkNumberTickets', async (req,res) => {
    res.render('employees/ticketsPurchaseOperations');
});

router.post('/employees/checkNumberTickets/search', async (req,res) => {
    const {clientId, date01, date02, status}= req.body;
    const cli = await clients.find();
    const purch = await purchases.find();
    const errors=[];
    var numT=0;
    var rest=0;
    var cop=0;
    var name01,name02,name03;
    var tickets01=0, tickets02=0, tickets03=0;
    if(date01>date02 ){
        errors.push({text: 'Please, Review the Dates'});
    }
    if(clientId=='' &&  date01.length==0 && date02.length==0 && status==-1 ){
        errors.push({text: 'Please, Insert the Data Required1'});
    }
    if(errors.length>0){
        res.render('employees/ticketsPurchaseOperations', {errors});
    }
    else{
        if(clientId!='' && date01.length==0 && date02.length==0 && status==-1){
            const purchase = await purchases.find({idClient: clientId});
            if(!purchase){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(i=0;i<purchase.length;i++){
                numT+=parseInt(purchase[i].ticketsNumber);
            }
        }

        if(clientId!='' && date01.length==0 && date02.length==0 && status!=-1){
            const purchase = await purchases.find({idClient:clientId});
            const flight = await flights.find({status:status});
            if(!purchase || !flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(j=0;j<purchase.length;j++){
                numT+=parseInt(purchase[j].ticketsNumber);
            }
            for(i=0;i<flight.length;i++){
                cop+=parseInt(flight[i].ticketsSold);
            }
            for(j=0;j<flight.length;j++){
                for(i=0;i<purchase.length;i++){
                    if(flight[j].id == purchase[i].idFlight){
                        rest+=parseInt(purchase[i].ticketsNumber);
                    }
                }
            }
            numT=numT+cop-rest;
        }

        if(clientId!='' && date01.length!=0 && date02.length!=0 && status!=-1){
            const purchase = await purchases.find({idClient:clientId});
            const flight = await flights.find({status:status, dateTime: {
                $gte: date01,
                $lt: date02
            },});
            if(!purchase || !flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(j=0;j<purchase.length;j++){
                numT+=parseInt(purchase[j].ticketsNumber);
            }
            for(i=0;i<flight.length;i++){
                cop+=parseInt(flight[i].ticketsSold);
            }
            for(j=0;j<flight.length;j++){
                for(i=0;i<purchase.length;i++){
                    if(flight[j].id == purchase[i].idFlight){
                        rest+=parseInt(purchase[i].ticketsNumber);
                    }
                }
            }
            numT=numT+cop-rest;
        }

        if(clientId!='' && date01.length!=0 && date02.length!=0 && status==-1){
            const purchase = await purchases.find({idClient:clientId});
            const flight = await flights.find({ dateTime: {
                $gte: date01,
                $lt: date02
            },});
            if(!purchase || !flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(j=0;j<purchase.length;j++){
                numT+=parseInt(purchase[j].ticketsNumber);
            }
            for(i=0;i<flight.length;i++){
                cop+=parseInt(flight[i].ticketsSold);
            }
            for(j=0;j<flight.length;j++){
                for(i=0;i<purchase.length;i++){
                    if(flight[j].id == purchase[i].idFlight){
                        rest+=parseInt(purchase[i].ticketsNumber);
                    }
                }
            }
            numT=numT+cop-rest;
        }

        if(clientId=='' && date01.length!=0 && date02.length!=0 && status!=-1){
            const flight = await flights.find({status:status, dateTime: {
                $gte: date01,
                $lt: date02
            },});
            if(!flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(i=0;i<flight.length;i++){
                numT+=parseInt(flight[i].ticketsSold);
            }
        }

        if(clientId=='' && date01.length!=0 && date02.length!=0 && status==-1){
            const flight = await flights.find({ dateTime: {
                $gte: date01,
                $lt: date02
            },});
            if(!flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(i=0;i<flight.length;i++){
                numT+=parseInt(flight[i].ticketsSold);
            }
        }

        if(clientId=='' && date01.length==0 && date02.length==0 && status!=-1){
            const flight = await flights.find({ status:status});
            if(!flight){
                errors.push({text: 'Please, Review the Data. There are no Purchases with these Parameters'});
                res.render('employees/ticketsPurchaseOperations', {errors});
            }
            for(i=0;i<flight.length;i++){
                numT+=parseInt(flight[i].ticketsSold);
            }
        }

        for(i=0; i<cli.length; i++){
            var numP=0;
            for(j=0;j<purch.length;j++){
                if(cli[i].id==purch[j].idClient){
                    numP+=1;
                }
            }
            if(numP>tickets01 && numP>tickets02 && numP>tickets03){
                tickets01=numP;
                name01=cli[i].firstName + " " + cli[i].lastName;
            }

            if(numP<tickets01 && numP>tickets02 && numP>tickets03){
                tickets02=numP;
                name02=cli[i].firstName + " " + cli[i].lastName;
            }

            if(numP<tickets01 && numP<tickets02 && numP>tickets03){
                tickets03=numP;
                name03=cli[i].firstName + " " + cli[i].lastName;
            }

        }

        const topClients = {name01,tickets01,name02,tickets02,name03,tickets03};
        res.render('employees/ticketsPurchaseOperations', {numT,topClients});
    }
});

module.exports = router;
