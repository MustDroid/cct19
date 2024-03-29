const {User} = require('../model/user');
const config = require('config');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');



router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPW = await bcrypt.compare(req.body.password, user.password);
    if(!validPW) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);
});

function validate(req) {
    const schema = {
      email: Joi.string().min(2).max(255).required(),
      password: Joi.string().min(2).max(1024).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;