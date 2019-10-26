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

  
  router.get('/airports/all', (req, res) => {
    res.render('airports/all-airports');
  });
module.exports = router;



