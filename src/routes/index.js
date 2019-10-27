const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const client = require('../models/clients');
const employee = require('../models/employees');
const dataUserConnected = require('../configuration/connectDB');



router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
  const {email, password, typeUser}= req.body;
  const errors=[];
  if(email=='' || password==''){
      errors.push({text: 'Please, Insert the Data'});
  }
  if(errors.length>0){
      res.render('index',{errors, email, password});
  }
  else{    
    if(typeUser=="Client"){
      const user = await client.findOne({email: email});
      if(user){
        const match = await user.matchPassword(password);
        if(match){
          dataUserConnected.typeUser="Client";
          dataUserConnected.idUserConnected=user.id;
          res.redirect('clients/moduleClients');
        } else{
          errors.push({text: 'The Password or Email or Type are Incorrect.'});
          res.render('index',{errors, email, password});
        } 
      }
    }
    else if(typeUser=="Employee"){
      const user = await employee.findOne({email: email});
      if(user){
        const match = await user.matchPassword(password);
        if(match){
          const type= user.type;
          if(type!="Manager"){
            dataUserConnected.typeUser="Employee";
            dataUserConnected.idUserConnected=user.id;
            res.redirect('employees/moduleEmployees');
          }
        } else{
          errors.push({text: 'The Password or Email or Type are Incorrect.'});
          res.render('index',{errors, email, password});
        } 
      }
    }
    else if(typeUser=="Manager"){
      const user = await employee.findOne({email: email});
      if(user){
        const match = await user.matchPassword(password);
        if(match){
          const type= user.type;
          if(type=="Manager"){
            dataUserConnected.typeUser="Manager";
            dataUserConnected.idUserConnected=user.id;
            res.redirect('employees/moduleManager');
          }
        } else{
          errors.push({text: 'The Password or Email or Type are Incorrect.'});
          res.render('index',{errors, email, password});
        } 
      }
    }
  }
});

router.get('/airports/new', (req, res) => {
    res.render('airports/new-airport');
});
router.get('/employees/signUpEmployees', (req, res) => {
  res.render('employees/signUpEmployees');
});
  
  router.get('/airports/all', (req, res) => {
    res.render('airports/all-airports');
  });

  router.get('/flights/createFlight', (req, res) => {
    res.render('flights/createFlight');
  });

  router.post('/flights/createFlight', (req, res) => {
    res.render('flights/createFlight');
  });

  router.get('/airlines/createAirline', (req, res) => {
    res.render('airlines/createAirline');
  });

module.exports = router;



