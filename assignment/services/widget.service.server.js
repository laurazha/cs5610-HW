module.exports = function (app) {
  var widgetModel = require("../model/widget/widget.model.server");
  var pageModel = require("../model/page/page.model.server");

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);

  var multer = require('multer'); // npm install multer --save
  var upload = multer({dest: __dirname + '/../../src/assets/uploads'});
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  // var baseUrl = 'http://localhost:3100';
  var baseUrl = 'https://cs5610-hw-xiaoshuang.herokuapp.com';
  var n = -1;

  function createWidget(req, res) {
    var pageId = req.params["pageId"];
    n = n + 1;
    const widget = {
      type: req.body.type,
      position: n
    };
    widgetModel.createWidget(pageId, widget)
      .then(function (widget) {
        pageModel.findPageById(pageId)
          .then(function (page) {
            page.widgets.push(widget);
            pageModel.updatePage(pageId, page).then();
          });
        res.json(widget);
      });
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    var newPos = 0;
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        widgets.forEach(function (widget) {
          widget.position = newPos++;
          widgetModel.updateWidget(widget._id, widget).then();
        });
        res.json(widgets);
      });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget).then();
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId)
      .then(function (status) {
        res.send(status);
      });
  }

  function uploadImage(req, res) {
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;
    var myFile = req.file;

    var callbackUrl = baseUrl + "/profile/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    if (myFile === null) {
      res.redirect(callbackUrl);
      return;
    }
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    const widget = {
      url: baseUrl + '/assets/uploads/' + filename
    };

    widgetModel.updateWidget(widgetId, widget).then();
    res.redirect(callbackUrl);
  }

  function reorderWidgets(req, res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);
    widgetModel.reorderWidget(pageId, startIndex, endIndex).then();
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

};


/*
  var widgets = [
    // user 456, website 456, page 321
    {"_id": "123", "type": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "type": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "345", "type": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "type": "HTML", "pageId": "321", "text": "Lorem ipsum"},
    {"_id": "567", "type": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "678", "type": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://www.youtube.com/embed/aFuA50H9uek"
    },
    {"_id": "789", "type": "HTML", "pageId": "321", "text": "Lorem ipsum"},
    // user 123, website 890, page 654
    {"_id": "111", "type": "HEADING", "pageId": "654", "size": 2, "text": "Super Bowl 2018"},
    {"_id": "222", "type": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "333", "type": "IMAGE", "pageId": "654", "width": "100%",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Alpy_Landscape_wikiskaner_27.jpg"
    },
    {"_id": "444", "type": "HTML", "pageId": "654", "text": "Lorem ipsum"},
    {"_id": "555", "type": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "666", "type": "YOUTUBE", "pageId": "654", "width": "100%",
      "url": "https://www.youtube.com/embed/k2qgadSvNyU"
    },
    {"_id": "777", "type": "HTML", "pageId": "654",
      "text": "<strong>Below is a formatted TEXT widget.</strong>"},
    {"_id": "888", "type": "TEXT", "pageId": "654", "text": "TEXT text example", "size:": 2,
      "placeholder": "TEXT placeholder example", "formatted": true}
  ];
  */
