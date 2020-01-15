const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Teacher , validate} = require('../model/teacher');


router.get('/', async (req, res) => {
  const teachers = await Teacher.find().sort('name');
  res.send(teachers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let teacher = new Teacher({ name: req.body.name });
  teacher = await teacher.save();
  
  res.send(teacher);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const teacher = await Teacher.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!teacher) return res.status(404).send('The teacher with the given ID was not found.');
  
  res.send(teacher);
});

router.delete('/:id', async (req, res) => {
  const teacher = await Teacher.findByIdAndRemove(req.params.id);

  if (!teacher) return res.status(404).send('The student with the given ID was not found.');

  res.send(teacher);
});

router.get('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) return res.status(404).send('The student with the given ID was not found.');

  res.send(teacher);
});

module.exports = router;