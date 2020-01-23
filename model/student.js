const Joi = require('joi');
const mongoose = require('mongoose');

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

  function validateStudent(student) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      track : Joi.string().min(2).max(50).required(),
      internCompanyName : Joi.string().min(3).max(50).required()
    };
  
    return Joi.validate(student, schema);
  }
  exports.Student = Student;
  exports.validate = validateStudent;