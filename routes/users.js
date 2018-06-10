const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const passport = require('passport');
const router = express.Router();


//Cargar el modelo Idea
require('../models/User');
const User = mongoose.model('users');

// User Login Route

router.get('/login', (req, res)=>{
  res.render('users/login');
})

// User register form
router.get('/register', (req, res)=>{
  res.render('users/register');
});

// Register form POST

router.post('/register', (req, res)=>{
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Las contraseñas no coinciden'});
  }
  if(req.body.password.length < 6){
    errors.push({text:'La contraseña debe tener al menos 6 caracteres'})
  }
  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password : req.body.password,
      password2: req.body.password2
    });
  }else{
    const newUser =new User( {
      nombres: req.body.nombres,
      apellidos: req.body.nombres,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err)throw err;
        newUser.password = hash;
        newUser.save()
          .then(user =>{
            req.flash('success_msg', 'Ahora ya estás registrado, puedes logearte');
            res.redirect('/users/login')
          })
          .catch(err =>{
            console.log(err);
            return ;
          })
          
      });
    });
  }
});

module.exports = router;