const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Student = mongoose.model('Student', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  track: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  internCompanyName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
}));

router.get('/', async (req, res) => {
  const students = await Student.find().sort('name');
  res.send(students);
});

router.post('/', async (req, res) => {
  const { error } = validateStudent(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({ 
    name: req.body.name,
    track: req.body.track,
    internCompanyName: req.body.internCompanyName
   });
  student = await student.save();
  
  res.send(student);
});

router.put('/:id', async (req, res) => {
  const { error } = validateStudent(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(req.params.id, { 
    name: req.body.name,
    track: req.body.track,
    internCompanyName: req.body.internCompanyName
   }, {
    new: true
  });

  if (!student) return res.status(404).send('The student with the given ID was not found.');
  
  res.send(student);
});

router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student) return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

function validateStudent(student) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    track : Joi.string().min(3).max(50).required(),
    internCompanyName : Joi.string().min(3).max(50).required()
  };

  return Joi.validate(student, schema);
}

module.exports = router;