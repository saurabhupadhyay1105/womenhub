var express = require("express");
var router = express.Router();
var blogModule = require("../models/blogs");

//GET user dashboard
router.get("/dashboard", (req, res, next) => {
  // session = req.session;
  // // console.log(session.uniqueId);
  // if (session.uniqueId) {
  //   userModule.find({ mobileno: session.uniqueId }).exec((err, data) => {
  //     var name = data[0].name.split(" ")[0];

  //     res.render("User/index", {
  //       user: data[0],
  //       msg: "",
  //       isloggedin: name,
  //     });
  //   });
  // } else {
  //   res.render("Home/login", { message: "", isloggedin: "login" });
  // }
  var username = req.session.user.username;
  res.render("User/index", { username: username });
});

//GET Blog Page
router.get("/blogs", (req, res, next) => {
  var username = req.session.user.username;

  res.render("User/blogs", { username: username });
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
  var username = req.session.user.username;
  res.render("User/jobs", { username: username });
});

//GET Contest Page
router.get("/contest", (req, res, next) => {
  var username = req.session.user.username;

  res.render("User/contest", { username: username });
});

module.exports = router;
