var mongoose = require("mongoose");
var WidgetSchema = require("../widget/widget.schema.server");

var PageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
  name: String,
  title: String,
  widgets: [WidgetSchema],
  dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = PageSchema;
