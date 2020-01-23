const {Rental, validate} = require('../model/rental'); 
const {Book} = require('../model/book'); 
const {Student} = require('../model/student'); 
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findById(req.body.studentId);
  if (!student) return res.status(400).send('Invalid student.');

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send('Invalid book.');

  if (book.numberInStock === 0) return res.status(400).send('Book not in stock.');

  let rental = new Rental({ 
    student: {
      _id: student._id,
      name: student.name, 
      track: student.track
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: book.dailyRentalRate
    }
  });
    try {
        new Fawn.Task()
   .save('rentals', rental)
   .update('books', {_id: book._id}, {
       $inc : {numberInStock: -1}
   })
    .run();
    res.send(rental);

    } catch(ex) {
        res.status(500).send('something failed:((((');
    }

  /*rental = await rental.save();

  movie.numberInStock--;
  movie.save();
  
  res.send(rental);*/
  //fawn methods
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 