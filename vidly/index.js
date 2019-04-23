const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const error = require('./middleware/error');
const config  = require('config');
const auth = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const Users = require('./routes/users');

winston.handleExceptions( new winston.transports.File( { filename: 'uncaughtExceptions.log '}));        // using winston to log

process.on('unhandledRejection', (ex) => {      // using process object to log
    throw ex;       // winston will automatically caught the unhadled exception and log it(line 18)
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly',
    level: 'error'      // only error will be logged. check error.js in middleware.
});

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB....'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error); // Express Error Middleware

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));