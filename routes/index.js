var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Home/index");
});

router.get("/opportunities", function (req, res, next) {
  res.render("Home/opportunities");
});

router.get("/blogs", function (req, res, next) {
  res.render("Home/blogs");
});

module.exports = router;
