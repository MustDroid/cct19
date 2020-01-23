const Joi = require('joi');
const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Theme = mongoose.model('Theme', themeSchema);

function validateTheme(theme) {
  const schema = {
    name: Joi.string().min(2).required()
  };

  return Joi.validate(theme, schema);
}

exports.themeSchema = themeSchema;
exports.Theme = Theme; 
exports.validate = validateTheme;