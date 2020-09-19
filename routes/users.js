var express = require('express');
var router = express.Router();

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
  res.render('User/index');
});


//GET Blog Page
router.get("/blogs", (req, res, next) =>{
  res.render('User/blogs');
});


//GET Job Page
router.get("/job", (req, res, next) =>{
  res.render('User/jobs');
});


//GET Contest Page
router.get("/contest", (req, res, next) =>{
  res.render('User/contest');
});


module.exports = router;
