module.exports = function (app) {
  var websiteModel = require("../model/website/website.model.server");
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  /*
  var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
  ];
  */

  function createWebsite(req, res) {
    var userId = req.params["userId"];
    var website = {
      name: req.body.name,
      description: req.body.description
    };
    websiteModel.createWebsiteForUser(userId, website)
      .then(function(website) {
        res.json(website);
      });
  }

  function findAllWebsitesByUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function(websites) {
        res.json(websites);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website)
      .then(function(website) {});
    websiteModel.findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status) {
        res.send(status);
      });
  }
};
