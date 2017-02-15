//  index.js
//--------------------Declarations-----------------------------
// Declaring the modules required
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()

// tcp connection
var net = require('net');
var client_tcp = new net.Socket();


//client_tcp.write('Hello');


// Listen to a port
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

app.use("/", express.static(__dirname + '/'));

// ---------------------HTTP Requests-----------------------------

// GET requests
app.get('/', (request, response) => {
    console.log("request")

    //response.sendFile(__dirname + '/index.html')
});



// POST requests

// BBB 1 containing the LEDs

// red button 
app.post('/redbtn', function(req, res) {
    var message = new Buffer("LEDR|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
    res.redirect('/');
});

// green button
app.post('/greenbtn', function(req, res) {
    var message = new Buffer("LEDG|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {
        client_tcp.end();
        console.log('Received: ' + data);
    });
    res.redirect('/');
});

//blue button
app.post('/bluebtn', function(req, res) {
    var message = new Buffer("LEDB|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    res.redirect('/');
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
});

// led 1  red on
app.post('/led1_on', function(req, res) {
    var message = new Buffer("LEDR|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });

    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
    res.redirect('/');
});

// led 1  red off
app.post('/led1_off', function(req, res) {
    var message = new Buffer("LEDR|OFF");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
    res.redirect('/');
});

// led 2  green on
app.post('/led2_on', function(req, res) {
    var message = new Buffer("LEDG|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');
        client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
          client_tcp.on('data', function(data) {
            console.log('Received: ' + data);
            client_tcp.end();
            });
        });
    });
    
});

// led 2  green off
app.post('/led2_off', function(req, res) {
    var message = new Buffer("LEDG|OFF");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');
        client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
          client_tcp.on('data', function(data) {
            console.log('Received: ' + data);
            client_tcp.end();
            });
        });
    });
    
    
    
});


// BBB 2 containing the temperature sensor and buzzer

app.get('/gettemp', function(req, res) {
    var message = new Buffer("TEMP|STATUS");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');
        client_tcp.write(message, function(msg, rinfo) {
        console.log("sent temperature query to the edge");
        client_tcp.on('data', function(data) {
        if (data == "temperature|12")
            console.log('Received: ' + data);
        res.send(data);
            client_tcp.end();
    });
    });

    });



    console.log("connection closed");

});

// buzzer on
app.post('/buzz_on', function(req, res) {
    var message = new Buffer("BUZZER|ON");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
    res.redirect('/');
});

// buzzer off
app.post('/buzz_off', function(req, res) {
    var message = new Buffer("BUZZER|OFF");
    client_tcp.connect(3333, '192.168.0.14', function() {
        console.log('tcp_server connection established');

    });
    client_tcp.write(message, function(msg, rinfo) {
        console.log("sent message to the edge");
    });
    client_tcp.on('data', function(data) {

        console.log('Received: ' + data);
    });
    client_tcp.end();
    res.redirect('/');
});


// response from edge via tcp


// Export variables
module.exports.app = app;
module.exports.exphbs = exphbs;
module.exports.express = express;
module.exports.path = path;