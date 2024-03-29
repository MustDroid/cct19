const {Book, validate} = require('../model/book'); 
const {Theme} = require('../model/theme');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find().sort('name');
  res.send(books);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const theme = await Theme.findById(req.body.genreId);
  if (!theme) return res.status(400).send('Invalid genre.');

  const book = new Book({ 
    title: req.body.title,
    theme: {
      _id: theme._id,
      name: theme.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  book = await book.save();
  
  res.send(book);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const theme = await Theme.findById(req.body.genreId);
  if (!theme) return res.status(400).send('Invalid theme.');

  const book = await Book.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      theme: {
        _id: theme._id,
        name: theme.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!book) return res.status(404).send('The book with the given ID was not found.');
  
  res.send(book);
});

router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.send(book);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).send('The book with the given ID was not found.');

  res.send(book);
});

module.exports = router; 