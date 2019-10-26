const express = require('express');
const router = express.Router();

router.get('/signin', (req,res) => {
    res.send('Ingresando a la app');
});

router.get('/signup', (req, res) =>{
    res.send('Registrandose en la app');
});

module.exports = router;