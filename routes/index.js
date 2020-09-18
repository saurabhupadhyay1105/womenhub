var express = require("express");
var userModule = require("../models/users");
var router = express.Router();
var session = require("express-session");
var bcrypt = require("bcryptjs");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Home/index");
});

router.post("/createjobs", function (req, res, next) {
  res.render("Home/opportunities");
});

//GET user dashboard
router.get("/dashboard", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    userModule.find({ mobileno: session.uniqueId }).exec((err, data) => {
      var name = data[0].name.split(" ")[0];

      res.render("Home/dashboard", {
        user: data[0],
        msg: "",
        isloggedin: name,
      });
    });
  } else {
    res.render("Home/login", { message: "", isloggedin: "login" });
  }
});
// GET Register Page
router.get("/register", function (req, res, next) {
  session = req.session;
  // console.log(session.uniqueId);
  if (session.uniqueId) {
    req.session.destroy((err) => {
      console.log(err);
      res.render("Home/register", { msg: "", isloggedin: "login" });
    });
  } else res.render("Home/register", { msg: "", isloggedin: "login" });
});
//post register

router.post("/register", (req, res, next) => {
  var { username, name, password, email, mobileno } = req.body;
  password = bcrypt.hashSync(req.body.password, 12);
  var user = new userModule({ username, name, password, mobileno, email });
  user.save((err, exec) => {
    if (err) {
      return res.status(200).render("Home/register", {
        msg: "fill details properly",
        isloggedin: "login",
      });
    }
    res.send("registered");
    // res.status(200).render("Home/register", {
    //   msg: "user registed successfully",
    //   isloggedin: "login",
    //   mobileno: mobileno,
    //   password: req.body.password,
    // });
  });
});

router.post("/login", function (req, res, next) {
  var mobileno = req.body.mobileno;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(mobileno)) {
    var checkuser = userModule.findOne({ email: mobileno });
  } else {
    var checkuser = userModule.findOne({ mobileno: mobileno });
  }
  checkuser.exec((err, data) => {
    if (data) {
      var userid = data._id;
      var getpassword = data.password;
      var mobileno = data.mobileno;
      session = req.session;
      if (bcrypt.compareSync(password, getpassword)) {
        session.uniqueId = mobileno;
        // console.log(session.uniqueId);

        res.redirect("/redirect");
      } else {
        res.render("Home/login", {
          message: "Invalid username and password",
          isloggedin: "login",
        });
      }
    } else {
      res.render("Home/login", {
        message: "Invalid username and password",
        isloggedin: "login",
      });
    }
  });
});
router.get("/redirect", (req, res) => {
  session = req.session;
  // console.log(session.uniqueId);

  if (session.uniqueId) {
    res.redirect("/dashboard");
  } else {
    res.render("Home/login", {
      message: "",
      isloggedin: "login",
    });
  }
});
router.get("/blogs", function (req, res, next) {
  res.render("Home/blogs");
});

// ajax routes

//checking already registered user

router.post("/checkusername", (req, res, next) => {
  var username = req.body.username;
  userModule.find({ username: usermame }).exec((err, user) => {
    if (err) throw err;
    if (user[0]) res.json({ message: "username already there" });
    else res.json({ message: "username available" });
  });
});

module.exports = router;
