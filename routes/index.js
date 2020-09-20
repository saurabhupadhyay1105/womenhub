var express = require("express");
var express = require("express");
var userModule = require("../models/users");
var blogModule = require("../models/blogs");
var jobModule = require("../models/jobs");
var contestModule = require("../models/contests");
var router = express.Router();
var session = require("express-session");
var bcrypt = require("bcryptjs");
const moment = require("moment");
var path = require("path");
var multer = require("multer");
var Storage = multer.diskStorage({
  destination: "./public/blogs/",
  filename: (req, file, cb) => {
    var num = Math.floor(Math.random() * 1000000 + 1);
    // console.log(path.extname(file.originalname));
    cb(null, file.fieldname + "_" + num + path.extname(file.originalname));
  },
});
var upload = multer({
  storage: Storage,
}).single("file");

/* GET home page. */
router.get("/", function (req, res, next) {
  blogModule.find({}).exec((err, data) => {
    if (err) throw err;
    jobModule.find({}).exec((err, data1) => {
      if (err) throw err;
      contestModule.find({}).exec((err, data2) => {
        if (err) throw err;
        if (req.session.uniqueId) {
          var username = req.session.user.username;
          res.render("Home/index", {
            isloggedin: username,
            blogs: data,
            jobs: data1,
            contests: data2,
          });
        } else {
          res.render("Home/index", {
            isloggedin: "login/register",
            blogs: data,
            jobs: data1,
            contests: data2,
          });
        }
      });
    });
  });
});

//Get login Page
router.get("/login", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    res.redirect("/users/dashboard");
  } else {
    res.render("Home/login", { isloggedin: "login/register" });
  }
});
router.get("/register", (req, res, next) => {
  if (req.session.uniqueId) {
    var username = req.session.user.username;
    res.redirect("/users/dashboard");
  } else {
    res.render("Home/login", { isloggedin: "login/register" });
  }
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
        isloggedin: "login/register",
      });
    } else {
      session = req.session;
      session.uniqueId = mobileno;
      var userr = {
        username: username,
        name: name,
        password: password,
        email: email,
        mobileno: mobileno,
      };
      session.user = userr;
      res.redirect("/users/dashboard");
    }
    // res.status(200).render("Home/register", {
    //   msg: "user registed successfully",
    //   isloggedin: "login",
    //   mobileno: mobileno,
    //   password: req.body.password,
    // });
  });
});

//checking already registered user

router.post("/checkusername", (req, res, next) => {
  var username = req.body.username;
  userModule.find({ username: username }).exec((err, user) => {
    if (err) throw err;
    if (user[0]) res.json({ message: "username already there" });
    else res.json({ message: "username available" });
  });
});
router.post("/checkemail", (req, res, next) => {
  var email = req.body.email;
  userModule.find({ email: email }).exec((err, user) => {
    if (err) throw err;
    if (user[0]) res.json({ message: "email already there" });
    else res.json({ message: "email available" });
  });
});

router.post("/login", function (req, res, next) {
  var mobileno = req.body.email;
  var password = req.body.password;
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
        session.user = data;
        console.log(session.user);
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
    res.redirect("/users/dashboard");
  } else {
    res.render("Home/login", {
      message: "",
      isloggedin: "login",
    });
  }
});
router.get("/logout", function (req, res, next) {
  req.session.destroy((err) => {
    // console.log(err);
    res.redirect("/login");
  });
});

// Get Blogs page
router.get("/blogs", function (req, res, next) {
  blogModule.find({}).exec((err, data) => {
    if (err) throw err;
    if (req.session.uniqueId) {
      var username = req.session.user.username;
      res.render("Home/blogs", {
        blogs: data,
        isloggedin: username,
        moment: moment,
      });
    } else {
      res.render("Home/blogs", {
        blogs: data,
        isloggedin: "login/register",
        moment: moment,
      });
    }
  });
});

//Get a Blog
router.get("/blog/:id", (req, res, next) => {
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  var id = req.params.id;
  var blogg = blogModule.find({ _id: id });
  blogg.exec((err, data) => {
    // console.log(data);
    res.render("Home/blog", {
      blog: data[0],
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});

// Create a new blog
router.post("/createblog", upload, (req, res, next) => {
  var { title, body } = req.body;
  var image = req.file.filename;
  var username = req.session.user.username;
  var blog = new blogModule({ title, body, username, image });
  // console.log(blog);
  blog.save((err, data) => {
    if (err) throw err;
    res.redirect(`/blog/${data._id}`);
  });
});

//Delete a blog
router.get("/blog/delete/:id", (req, res, next) => {
  var id = req.params.id;
  blogModule.findByIdAndDelete(id).exec((err, data) => {
    res.redirect("/users/blogs");
  });
});

//Get Jobs/Internships page
router.get("/opportunities", (req, res, next) => {
  var opps = jobModule.find({});
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  opps.exec((err, data) => {
    if (err) throw err;
    console.log(data);
    res.render("Home/opportunities", {
      jobs: data,
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});
router.get("/jobs/:id", (req, res, next) => {
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  var id = req.params.id;
  var jobtype;
  if (id == "01") {
    jobtype = "Software Engineering";
  } else if (id == "02") {
    jobtype = "Digital Marketing";
  } else if (id == "03") {
    jobtype = "Human Resources";
  }
  var opps = jobModule.find({ category: jobtype });
  opps.exec((err, data) => {
    if (err) throw err;
    console.log(data);
    res.render("Home/opportunities", {
      jobs: data,
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});

//Get a Job/Internship page
router.get("/opportunity/:id", (req, res, next) => {
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  var id = req.params.id;
  var opp = jobModule.find({ _id: id });
  opp.exec((err, data) => {
    if (err) throw err;
    res.render("Home/opportunity", {
      opportunity: data[0],
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});

// Create a new JOB/INTERNSHIP
router.post("/createjob", (req, res, next) => {
  var {
    title,
    type,
    description,
    organisation,
    applylink,
    category,
  } = req.body;
  var username = req.session.user.username;

  var job = new jobModule({
    title,
    type,
    description,
    organisation,
    applylink,
    category,
    username,
  });
  job.save((err, data) => {
    if (err) throw err;
    res.redirect(`/opportunity/${data._id}`);
  });
});

// Delete a JOB/Internship
router.get("/opportunities/delete/:id", (req, res, next) => {
  var id = req.params.id;
  jobModule.findByIdAndDelete(id).exec((err, data) => {
    res.redirect("/users/job");
  });
});

// Get all contests
router.get("/contests", (req, res, next) => {
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  contestModule.find({}).exec((err, data) => {
    res.render("Home/contests", {
      contests: data,
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});

// Get a contest
router.get("/contest/:id", (req, res, next) => {
  var id = req.params.id;
  if (req.session.uniqueId) {
    var isloggedin = req.session.user.username;
  } else var isloggedin = "login/register";
  var cont = contestModule.findById(id);
  cont.exec((err, data) => {
    if (err) throw err;
    res.render("Home/contest", {
      contest: data,
      isloggedin: isloggedin,
      moment: moment,
    });
  });
});

// Create a new Contest
router.post("/createcontest", (req, res, next) => {
  var { title, summary, applylink } = req.body;
  var username = req.session.user.username;

  var contest = new contestModule({ title, summary, applylink, username });
  contest.save((err, data) => {
    if (err) throw err;
    console.log(data._id);
    res.redirect(`/contest/${data._id}`);
  });
});

//Delete a contest
router.get("/contest/delete/:id", (req, res, next) => {
  var id = req.params.id;
  contestModule.findByIdAndDelete(id).exec((err, data) => {
    res.redirect("/users/contest");
  });
});

module.exports = router;
