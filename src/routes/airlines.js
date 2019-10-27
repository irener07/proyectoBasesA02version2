const express = require('express');
const router = express.Router();
const passport = require('passport');
const airline = require('../models/airlines');




router.get('/airlines', (req,res) => {
    res.render('airlines/all-airlines');
});

router.get('/airlines/new-airline', (req, res) => {
    res.render('airlines/new-airline');
});

router.post('/airlines/new-airline', async (req, res) => {
    const {id, idAirport, name, countries}= req.body;
    const errors=[];
    if(id=='' || firstName=='' || lastName=='' || address=='' || email=='' || password=='' || telephone==''){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('airlines/new-airline',{errors, id, idAirport, name, countries});
    }
    else{
        const newAirline = new airline({id,idAirport,name,countries});
        await newAirline.save();
        req.flash('success_msg', 'Successful Registration');
        res.redirect('/airlines');
    }
});

module.exports = router;