const mongoose = require('mongoose');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const themes = require('./routes/themes');
const books = require('./routes/books');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const express = require('express');
const app = express();

const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/cct19', { useNewUrlParser: true,
useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/students', students);
app.use('/api/teachers', teachers);
app.use('/api/themes', themes);
app.use('/api/books', books);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));