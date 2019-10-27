const express = require('express');
const router = express.Router();
const employees = require('../models/employees');
const currentDate = Date.now;

router.get('/employees/signUpEmployees', (req, res) => {
    res.render('employees/signUpEmployees');
  });

  router.post('/employees/signUpEmployees', async (req, res) => {
      const { id, firstName, lastName, type, jobArea, email, password }= req.body;
      const errors=[];
      console.log(req.body);

    if(type==-1){
        errors.push({text: 'Please, Select the type of worker'});
    }
    if(jobArea==-1){
        errors.push({text: 'Please, Select a department'});
    }
    if(id=='' || firstName=='' ||  lastName=='' ||  password=='' 
    ||  email==''){
        errors.push({text: 'Please, Insert the complete Data'});
    }
    if(errors.length>0){
        res.render('employees/signUpEmployees',{errors, id, firstName, lastName, type, 
            jobArea, email, password });   }
            
        else{
            const idE = await employees.findOne({id: id});
            const emailEmployee = await employees.findOne({email: email});
            if (emailEmployee || idE){
                req.flash('error_msg', 'The ID or Email is Already Registered');
                res.redirect('/employees/signUpEmployees');
            }

            const newEmployee = new employees( {id, firstName, lastName, type, currentDate, 
            jobArea, email, password } );
            newEmployee.password = await newEmployee.encryptPassword(password);
            await newEmployee.save();
            req.flash('success_msg', 'Successful Registration');
            res.redirect('/employees/moduleEmployees');
    
        } 
    
    });

    router.get('/employees/moduleEmployees', (req, res) => {
        res.render('employees/moduleEmployees');
      });

//                          Information of all airports and CRUD options
router.get('/employees', async (req, res) => {
    const employeesFound = await employees.find();
    res.render('employees/moduleEmployees', {employeesFound});
});


//                          Update airport information 
router.get('/employees/editEmployees/:id', async (req, res) => {
    const employee = await employees.findById(req.params.id);
    res.render('employees/editEmployees', {employee});
});


router.put('/employees/editEmployees/:id', async (req,res) => {
    const {id, firstName, lastName, type, hiringDate, jobArea, email, password}= req.body;
    await employees.findByIdAndUpdate(req.params.id, {
        id, firstName, lastName, type, hiringDate, jobArea, email, password
    });
    res.redirect('/employees');
});


router.delete('/employees/delete/:id', async (req, res) => {
    await employees.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
});


    
module.exports = router;

