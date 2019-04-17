const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views','./views'); // optional, all views in single view folder

// To know the current Environment (Development/Production/Testing/Staging)
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));



// condition only to use Morgan when the environment is Development mode
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}

app.use(logger);


// PORT
const port = process.env.port || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}