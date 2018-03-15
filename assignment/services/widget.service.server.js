module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var widgets = [
    // user 456, website 456, page 321
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
      "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
      "url": "https://www.youtube.com/embed/aFuA50H9uek"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
    // user 123, website 890, page 654
    {"_id": "111", "widgetType": "HEADING", "pageId": "654", "size": 2, "text": "Super Bowl 2018"},
    {"_id": "222", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "333", "widgetType": "IMAGE", "pageId": "654", "width": "100%",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Alpy_Landscape_wikiskaner_27.jpg"
    },
    {"_id": "444", "widgetType": "HTML", "pageId": "654", "text": "Lorem ipsum"},
    {"_id": "555", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "666", "widgetType": "YOUTUBE", "pageId": "654", "width": "100%",
      "url": "https://www.youtube.com/embed/k2qgadSvNyU"
    },
    {"_id": "777", "widgetType": "HTML", "pageId": "654",
      "text": "<strong>Below is a formatted TEXT widget.</strong>"},
    {"_id": "888", "widgetType": "TEXT", "pageId": "654", "text": "TEXT text example", "size:": 2,
      "placeholder": "TEXT placeholder example", "formatted": true}
  ];

  // var baseUrl = 'http://localhost:3100';
  var baseUrl = 'https://cs5610-hw-xiaoshuang.herokuapp.com';

  function uploadImage(req, res) {
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;
    var widgetId      = req.body.widgetId;
    var myFile        = req.file;

    var callbackUrl = baseUrl+"/profile/"+userId+
      "/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    if (myFile === null) {
      res.redirect(callbackUrl);
      return;
    }
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        widgets[i].url = baseUrl+'/assets/uploads/'+filename;
        break;
      }
    }

    res.redirect(callbackUrl);
  }

  function reorderWidgets(req, res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);

    var widgetsByPageId = widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
    var widgetToMove = widgetsByPageId[startIndex];
    var startIndexInWidgets = widgets.findIndex((function(wid) {
      return wid._id === widgetToMove._id;}));
    var endIndexInWidgets = widgets.findIndex((function(wid) {
      return wid._id === widgetsByPageId[endIndex]._id;}));

    if (startIndex <= endIndex) {
      // move down to after-wid2
      widgets.splice(startIndexInWidgets, 1);
      widgets.splice(endIndexInWidgets, 0, widgetToMove);
    } else {
      // move up to before-wid2
      widgets.splice(startIndexInWidgets, 1);
      widgets.splice(endIndexInWidgets - 1, 0, widgetToMove);
    }
    res.json({});
  }

  function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + '';
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    var widgetsByPageId = widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
    res.json(widgetsByPageId);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        res.json(widgets[i]);
        return;
      }
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        widgets[i].widgetType = widget.widgetType;
        widgets[i].pageId = widget.pageId;
        widgets[i].size = widget.size;
        widgets[i].text = widget.text;
        widgets[i].width = widget.width;
        widgets[i].url = widget.url;
        widgets[i].placeholder = widget.placeholder;
        res.json(widgets[i]);
        return;
      }
    }
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgets.splice(widgets.findIndex(function (widget) {
      return widget._id === widgetId;
    }), 1);
    res.json({});
  }

};
