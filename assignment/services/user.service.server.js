module.exports = function (app) {
  var userModel = require("../model/user/user.model.server");
  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  /*
  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
  */

  function createUser(req, res) {
    var user = {username: req.body.username, password: req.body.password,
      firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email};
    userModel.createUser(user)
      .then(function(user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function(user) {
          res.json(user);
        });
    } else if (username) {
      userModel.findUserByUsername(username)
        .then(function(user) {
          res.json(user);
        })
    } else {
      userModel.findAllUsers()
        .then(function(users) {
          res.json(users);
        })
    }
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
      .then(function(user) {
        res.json(user);
      })
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function(user) {});
    userModel.findUserById(userId)
      .then(function(user) {
        res.json(user);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId)
      .then(function (status) {
        res.send(status);
      });
  }

};




