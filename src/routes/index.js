const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index');
});

router.get('/clients/signUpClients', (req, res) => {
    res.render('clients/signUpClients');
  });

module.exports = router;



