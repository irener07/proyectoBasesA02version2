const express = require('express');
const router = express.Router();
const passport = require('passport');
const airline = require('../models/airlines');




router.get('/airlines', async (req,res) => {
    const airlinesFound = await airline.find();
    res.render('airlines/all-airlines', {airlinesFound});
});

router.get('/airlines/modify/:id', async (req, res) => {
    const airlineFound = await airline.findById(req.params.id);
    res.render('airlines/edit-airline', {airlineFound});
});

router.put('/airlines/modify-airline/:id', async (req,res) => {
    const {id, idAirport, name, countries}= req.body;
    const errors = [];
    if(id=='' || idAirport=='' || name=='' || countries.length<1){
        errors.push({text: 'Please, Insert the Data'});
    }
    if (countries==-1){
        errors.push({text: 'Please Select a Country'});
    }
    if(errors.length>0){
        res.render('airlines/new-airline',{errors, id, idAirport, name, countries});
    }
    else {
    await airline.findByIdAndUpdate(req.params.id, {
        id, idAirport, name, countries
    });
    res.redirect('/airlines');
    }
});

router.delete('/airlines/delete/:id', async (req, res) => {
    await airline.findByIdAndDelete(req.params.id);
    res.redirect('/airlines');
});

router.get('/airlines/new-airline', (req, res) => {
    res.render('airlines/new-airline');
});

router.post('/airlines/new-airline', async (req, res) => {

    const {id, idAirport, name, countries}= req.body;
    const errors=[];
    if(id=='' || idAirport=='' || name=='' || countries.length<1){
        errors.push({text: 'Please, Insert the Data'});
    }
    if (countries==-1){
        errors.push({text: 'Please Select a Country'});
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