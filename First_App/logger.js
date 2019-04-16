const EventEmitter = require('events');


console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP Request
        console.log(message);
    
        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' })
    }
}

module.exports = Logger;