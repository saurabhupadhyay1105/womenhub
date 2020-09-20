var express = require("express");
var router = express.Router();
const moment = require('moment');
var blogModule = require("../models/blogs");
var userModule = require("../models/users");
var jobModule = require("../models/jobs");
var contestModule = require("../models/contests");

//GET user dashboard
router.get("/dashboard", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;

    var user = userModule.findOne({ username: username });
    user.exec((err, data) => {
      if (err) throw err;
      console.log(data);
      res.render("User/index", { username: username, user: data });
    });
  } else {
    res.redirect("/login");
  }
});

//GET Blog Page
router.get("/blogs", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    var user = userModule.findOne({ username: username });
    user.exec((err, data) => {
      if (err) throw err;
      blogModule.find({username: username})
      .exec((err, data1) =>{
        if(err) throw err;
        res.render("User/blogs", { username: username, user: data, blogs:data1, moment: moment });
      });
    });
  } else {
    res.redirect("/login");
  }
});


//GET Job Page
router.get("/job", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    var user = userModule.findOne({ username: username });
    user.exec((err, data) => {
      if (err) throw err;
      jobModule.find({username: username})
      .exec((err, data1) =>{
        if(err) throw err;
        res.render("User/jobs", { username: username, user: data, jobs:data1, moment: moment });
      });
    });
  } else {
    res.redirect("/login");
  }
});

//GET Contest Page
router.get("/contest", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    var user = userModule.findOne({ username: username });
    user.exec((err, data) => {
      if (err) throw err;
      contestModule.find({username: username})
      .exec((err, data1) =>{
        if(err) throw err;
        res.render("User/contest", { username: username, user: data, contests:data1, moment: moment });
      });
    });
  } else {
    res.redirect("/login");
  }
});


//GET User Profile
router.get('/:username', (req, res, next) =>{
  var user = userModule.findOne({ username: req.params.username });
  user.exec((err, data) => {
    if(err) throw err;
    if(data != null){
      if (req.session.uniqueId) {
        var username = req.session.user.username;
        res.render("Home/profile", { user: data, isloggedin: username });
      } else {
        res.render("Home/profile", { user: data, isloggedin: "login/register" });
      }
    } else {
      res.render('error', {isloggedin: "login/register"});
    }
  })
});

module.exports = router;
