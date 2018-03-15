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
    var user = null;
    if (username && password) {
      user =  users.find( function (user) {
        return user.username === username && user.password === password;
      });
    } else if (username) {
      user = users.find(function(user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    console.log(user.username);
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;

    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].username = user.username;
        users[i].password = user.password;
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;
        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    users.splice(users.findIndex(function(user) {
      return user._id === userId;
    }), 1);
    res.send(200);
  }

};




