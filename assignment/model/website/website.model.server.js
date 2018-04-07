var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model("Website", WebsiteSchema);
var UserModel = require("../user/user.model.server");

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
  website._user = userId;
  return WebsiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.findByIdAndUpdate(websiteId, website);
}

function deleteWebsite(websiteId) {
  return WebsiteModel.remove({_id: websiteId});
}

/*
//refactored version
function createWebsite_new(website)  {
  var newWebsite = null;
  return WebsiteModel
    .create(website)
    .then(function (website) {
      newWebsite = website;
      UserModel
        .findUserById(website.developerId)
        .then(function (user) {
          user.websites.push(newWebsite);
        });
    });
}

function findWebsiteForUser_new(userId) {
  return WebsiteModel
    .find({developerId: userId})
    .populate('developerId', 'username')
    .exec();
}
*/
