const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index');
});

router.get('/clients/signUpClients', (req, res) => {
    res.render('clients/signUpClients');
  });

router.get('/airports/new', (req, res) => {
    res.render('airports/new-airport');
  });

  router.get('/employees/signUpEmployees', (req, res) => {
    res.render('employees/signUpEmployees');
  });

    router.post('/employees/signUpEmployees', (req, res) => {
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



