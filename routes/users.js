var express = require("express");
var router = express.Router();
var blogModule = require("../models/blogs");

//GET user dashboard
router.get("/dashboard", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    res.render("User/index", { username: username });
  } else {
    res.render("Home/login");
  }
});

//GET Blog Page
router.get("/blogs", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;

    res.render("User/blogs", { username: username });
  } else {
    res.render("Home/login");
  }
});

// router.post("/blogs", (req, res) => {
//   var { title, body } = req.body;
//   var username = req.session.user.username;
//   var blog = new blogModule({ username: username, title: title, body: body });
//   blog.save((err, data) => {
//     if (err) throw err;

//     res.render("User/blogs");
//   });
// });

//GET Job Page
router.get("/job", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    res.render("User/jobs", { username: username });
  } else {
    res.render("Home/login");
  }
});

//GET Contest Page
router.get("/contest", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;

    res.render("User/contest", { username: username });
  } else {
    res.render("Home/login");
  }
});

module.exports = router;
