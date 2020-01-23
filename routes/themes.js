const {Theme, validate} = require('../model/theme');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const themes = await Theme.find().sort('name');
  res.send(themes);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let theme = new Theme({ name: req.body.name });
  theme = await theme.save();
  
  res.send(theme);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const theme = await Theme.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!theme) return res.status(404).send('The theme with the given ID was not found.');
  
  res.send(theme);
});

router.delete('/:id', async (req, res) => {
  const theme = await Genre.findByIdAndRemove(req.params.id);

  if (!theme) return res.status(404).send('The theme with the given ID was not found.');

  res.send(theme);
});

router.get('/:id', async (req, res) => {
  const theme = await Theme.findById(req.params.id);

  if (!theme) return res.status(404).send('The theme with the given ID was not found.');

  res.send(theme);
});

module.exports = router;