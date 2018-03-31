
module.exports = function(app) {
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
  var db = require("./model/models.server");
};

/*
module.exports=function(app) {
  app.get('/api/test', function (req, res) {
    console.log("msg from app.js");
    res.send();
  });
};
*/
