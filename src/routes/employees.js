const express = require('express');
const router = express.Router();
const employees = require('../models/employees');

router.get('/employees/signUpEmployees', (req, res) => {
    res.render('employees/signUpEmployees');
  });

  router.post('/employees/signUpEmployees', async (req, res) => {
      const { employeeId, employeeName, employeeSecondNames, typeC, WorkDepartmentC}= req.body;
      const errors=[];
      
    if(typeC==-1){
        errors.push({text: 'Please, Select the type of worker'});
    }
    if(WorkDepartmentC==-1){
        errors.push({text: 'Please, Select a department'});
    }
    if(employeeId=='' || employeeName=='' ||  employeeSecondNames==''){
        errors.push({text: 'Please, Insert the complete Data'});
    }
    else{
        const newEmployee = new employees( {id,firstName, lastName, type, hiringDate, jobArea, 
        email, password} );
        await newEmployee.save();
        res.redirect('clients/signUpClients');
    }

    res.render('employees/signUpEmployees');
});


//const passport = require('passport');
//const clients = require('../models/clients');