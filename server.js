// Get the dependencies

// install express and create an express app
const express = require('express');
const app = express();

// install, load, and configure body parser module, to parse JSON objects
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const http = require('http');
const server = http.createServer(app);

/* APIs belong to USER
app.post('/api/user', function (req, res) {
  res.send();
}
app.get('/api/user/:userId', function (req, res) {
  res.send();
}
app.put('/api/user/:userId', function (req, res) {
  res.send();
}
*/

// IIFE
require("./assignment/app.js")(app);
// app.listen(port, ipaddress);

/*
// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
*/

server.listen( port , function() {
  console.log('Running (port 3100) ...');
});
