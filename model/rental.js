const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  student: { 
    type: new mongoose.Schema({
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
    }),  
    required: true
  },
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
}));

function validateRental(rental) {
  const schema = {
    studentId: Joi.objectid().required(),
    bookId: Joi.objectid().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;