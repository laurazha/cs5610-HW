
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser'); 
var session = require('express-session');

var secret = "random";
if (process.env.SESSION_SECRET) {
  secret = process.env.SESSION_SECRET;
}
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));
// app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets/uploads', express.static(path.join(__dirname, '/src/assets/uploads')));


//CORS
// var baseUrl = 'https://cs5610-hw-xiaoshuang.herokuapp.com/';
var baseUrl = "http://localhost:4200";
app.use(function(reg, res, next){
  res.header("Access-Control-Allow-Origin", baseUrl);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', "true");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);
const server = http.createServer(app);

require("./assignment/app")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});

