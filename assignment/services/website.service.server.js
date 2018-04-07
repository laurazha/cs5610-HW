module.exports = function (app) {
  var websiteModel = require("../model/website/website.model.server");
  var userModel = require("../model/user/user.model.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res) {
    var userId = req.params["userId"];
    var website = {
      name: req.body.name,
      description: req.body.description
    };
    websiteModel.createWebsiteForUser(userId, website)
      .then(function (website) {
        userModel.findUserById(userId)
          .then(function (user) {
            user.websites.push(website);
            userModel.updateUser(userId, user).then();
          });
        res.json(website);
      });
  }

  function findAllWebsitesByUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId)
      .then(function (website) {
        res.json(website);
      });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website).then();
    websiteModel.findWebsiteById(websiteId)
      .then(function (website) {
        res.json(website);
      });
  }

  function findWebsiteIndex(array, websiteId) {
    array.forEach(function (w) {
      console.log(w);
      console.log(w._id.str === websiteId);
      if (w._id.str === websiteId) return w;
    });
    return -1;
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    /*
        websiteModel.findWebsiteById(websiteId)
          .then(function (website) {
            userModel.findUserById(website._user)
              .then(function (user) {
                console.log('user: '+user);
                var index = findWebsiteIndex(user.websites, websiteId);
                console.log('index = '+index);
                user.websites.splice(1, 1);
                console.log('user.websites: '+user.websites);
                userModel.updateUser(user._id, user).then();
              })
          });
    */
    websiteModel.deleteWebsite(websiteId)
      .then(function (status) {
        res.send(status);
      });
  }
};

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
