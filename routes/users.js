var express = require("express");
var router = express.Router();
const moment = require('moment');
var blogModule = require("../models/blogs");
var userModule = require("../models/users");
var jobModule = require("../models/jobs");

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
    res.render("Home/login");
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
    res.render("Home/login");
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
    res.render("Home/login");
  }
});

//GET Contest Page
router.get("/contest", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    var user = userModule.findOne({ username: username });
    user.exec((err, data) => {
      if (err) throw err;
      res.render("User/contest", { username: username, user: data });
    });
  } else {
    res.render("Home/login");
  }
});

module.exports = router;
