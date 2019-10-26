const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index');
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
module.exports = router;



