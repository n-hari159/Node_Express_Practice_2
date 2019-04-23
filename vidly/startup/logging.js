const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File( { filename: 'uncaughtExceptions.log '}));        // using winston to log

    process.on('unhandledRejection', (ex) => {      // using process object to log
        throw ex;       // winston will automatically caught the unhadled exception and log it(line 18)
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/vidly',
        level: 'error'      // only error will be logged. check error.js in middleware.
    });
}