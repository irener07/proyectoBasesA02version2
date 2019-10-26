const express = require('express');
const router = express.Router();


router.get('/clients/signUpClients', (req, res) => {
    res.render('clients/signUpClients');
});

router.post('/clients/signUpClients', (req, res) => {
    const { firstName, lastName, birthDate, nacionality, country, state, address, email, password, telephone}= req.body;
    const errors=[];
    if(nacionality==-1){
        errors.push({text: 'Please, Select Nacionality'});
    }
    if(country==-1){
        errors.push({text: 'Please, Select Country'});
    }
    if(!state || state==-1){
        errors.push({text: 'Please, Select State'});
    }
    if(firstName=='' || lastName=='' || address=='' || email=='' || password=='' || telephone){
        errors.push({text: 'Please, Insert the Data'});
    }
    if(errors.length>0){
        res.render('clients/signUpClients',{errors, firstName, lastName, birthDate, nacionality, country, state, address, email, password, telephone});
    }
    else{
        res.send('ok');
    }
});

module.exports = router;