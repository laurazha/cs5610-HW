module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

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
      "url": "https://cdn.pixabay.com/photo/2016/02/17/15/37/laptop-1205256_1280.jpg"
    },
    {"_id": "444", "widgetType": "HTML", "pageId": "654", "text": "Lorem ipsum"},
    {"_id": "555", "widgetType": "HEADING", "pageId": "654", "size": 4, "text": "Lorem ipsum"},
    {
      "_id": "666", "widgetType": "YOUTUBE", "pageId": "654", "width": "100%",
      "url": "https://www.youtube.com/embed/k2qgadSvNyU"
    },
    {"_id": "777", "widgetType": "HTML", "pageId": "654", "text": "Lorem ipsum"}
  ];


  function uploadImage(req, res) {
    console.log("uploading");
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;
    var widgetId      = req.body.widgetId;
    var myFile        = req.file;

    console.log('userId: ' + userId);
    console.log('widgetId: ' + widgetId);
    console.log('websiteId: ' + websiteId);
    console.log('pageId: ' + pageId);

    if (myFile === null) {
      console.log('file not exist');
      res.redirect('http://localhost:4200/profile/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId);
      return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log('filename: ' + filename);
    console.log('mimetype: ' + mimetype);
    console.log('path: ' + path);
    console.log('destination: ' + destination);

    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        widgets[i].url = '/assets/uploads/'+filename;
        // res.json(widgets[i]);
        break;
      }
    }

    var callbackUrl   = "http://localhost:4200/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";
    res.redirect(callbackUrl);
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
