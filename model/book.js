const Joi = require('joi');
const mongoose = require('mongoose');
const {themeSchema} = require('./theme');

const Book = mongoose.model('Books', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  theme: { 
    type: themeSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateBook(book) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    themeId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(book, schema);
}

exports.Book = Book; 
exports.validate = validateBook;