const express = require('express');
const router = express.Router();
const employees = require('../models/employees');
const purchases = require('../models/purchases');
const flights = require('../models/flights');
const clients = require('../models/clients');
const airports = require('../models/airports');
const airlines = require('../models/airlines');




//TERCERA CONSULTA
router.get('/employees', async (req,res) => {
    const employeesFound = await employees.find();
    res.render('employees/mostVisitedDestinations', {employeesFound});
});