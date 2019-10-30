const express = require('express');
const router = express.Router();
const employees = require('../models/employees');
const airlines = require('../models/airlines');
const flights = require('../models/flights');
//const Schema = mongoose.Schema;
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

  
//                      Manager Reports
router.get('/employees/moduleManagers/airlineFlights', async (req, res) => {
    const airlinesFound =  await airlines.find();
    const flightsFound = await flights.find();
    const airlineFlights = new Array();
    const airlineFlight = new Schema({
        airlineName: {
            type: String
        },
        flightName: {
            type: String
        },
        origin: {
            type: String
        },
        destination: {
            type: String
        },
        date: {
            type: Date
        },
        tickets: {
            type: Number
        },
        totalAmount: {
            type: Number
        }});
    for (flight in flightsFound) {
        for (airline in airlinesFound){
            if (flight.idAirline==airline.id){
                const totalAmount = parseInt(flight.ticketsSold)*parseInt(flight.price);
                const newAirlineFlight = new airlineFlight(
                    airline.name,
                    flight.name,
                    flight.origin,
                    flight.destination,
                    flight.date,
                    parseInt(flight.ticketsSold),
                    totalAmount
                );
                airlineFlights.push(newAirlineFlight);

            }
        }
    }
    res.render('employees/airlinesFlights',{airlineFlights});
});
module.exports = router;

