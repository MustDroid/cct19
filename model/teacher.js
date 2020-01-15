const Joi = require('joi');
const mongoose = require('mongoose');

const Teacher = mongoose.model('Teacher', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    }
  }));

  function validateTeacher(teacher) {
    const schema = {
      name: Joi.string().min(3).max(50).required()
    };
  
    return Joi.validate(teacher, schema);
  }
  exports.Teacher = Teacher;
  exports.validate = validateTeacher;