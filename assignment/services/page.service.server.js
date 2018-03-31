module.exports = function (app) {
  var pageModel = require("../model/page/page.model.server");
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  /*
  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "654", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
    { "_id": "765", "name": "Post 2", "websiteId": "890", "description": "Lorem" },
    { "_id": "876", "name": "Post 3", "websiteId": "890", "description": "Lorem" }
  ];
  */

  function createPage(req, res) {
    var websiteId = req.params["websiteId"];
    const page = {
      name: req.body.name,
      description: req.body.description
    };
    pageModel.createPage(websiteId, page)
      .then(function(page) {
        res.json(page);
      });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function (pages) {
          res.json(pages);
        });
  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page);
      });
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel.updatePage(pageId, page)
      .then(function(data) {});
    pageModel.findPageById(pageId)
      .then(function(page) {
        res.json(page);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
      .then(function(status) {
        res.send(status);
      });
  }
};
