var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [websiteSchema],
  dateCreated: {type: Date, default: Date.now},
  facebook: {
    id:    String,
    token: String
  }
}, {collection:'user'});

module.exports = UserSchema;
