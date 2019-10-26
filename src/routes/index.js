const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index');
});

router.get('/airports/new', (req, res) => {
    res.render('airports/new-airport');
});

module.exports = router;



