module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function createUser(req, res) {
    var userId = Math.floor(Math.random() * 1000000) + '';
    var user = {_id: userId, username: req.body.username, password: req.body.password,
      firstName: req.body.firstName, lastName: req.body.lastName};
    users.push(user);
    res.json(user);
  }

  function findUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
      var userByCredentials =  users.find( function (user) {
        return user.username === username && user.password === password;
      });
      if (userByCredentials) {
        res.json(userByCredentials);
      } else {
        res.json({});
      }
      return;
    } else if (username) {
      var userByUsername = users.find(function(user) {
        return user.username === username;
      });
      if (userByUsername) {
        res.json(userByUsername);
      } else {
        res.json({});
      }
      return;
    }
    res.json(users);  // show all users for admin and easy testing
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var newUser = req.body;

    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].username = newUser.username;
        users[i].password = newUser.password;
        users[i].firstName = newUser.firstName;
        users[i].lastName = newUser.lastName;
        res.json(users[i]);
        return;
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    users.splice(users.findIndex(function(user) {
      return user._id === userId;
    }), 1);
    res.json({});
  }

};




