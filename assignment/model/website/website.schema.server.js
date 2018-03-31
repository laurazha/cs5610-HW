var mongoose = require("mongoose");
var pageSchema = require('../page/page.schema.server');

var WebsiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  name: String,
  description: String,
  pages: [pageSchema],
  dateCreated: {type: Date, default: Date.now}
}, {collection:'website'});

module.exports = WebsiteSchema;
