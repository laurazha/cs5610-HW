var express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets/uploads', express.static(path.join(__dirname, '/src/assets/uploads')));


//CORS
app.use(function(reg, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  next();
});

const port=process.env.PORT || '3100';
app.set('port', port);
const server = http.createServer(app);

require("./assignment/app")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost:27017/cs5610hw');
// var db = 'mongodb://laurazha_cs5610hw:cs5610@ds263847.mlab.com:63847/heroku_7d328xn4'
// module.exports(db);

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});

