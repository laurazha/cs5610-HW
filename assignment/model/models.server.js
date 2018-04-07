var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/cs5610hw');
var db = mongoose.connect('mongodb://laurazha_cs5610hw:cs5610@ds263847.mlab.com:63847/heroku_7d328xn4');
module.exports = db;
