const express = require("express");
const app = express();
const ejs = require("ejs");
const { data } = require("jquery");

// set up
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

// defining routes
app.get("/", function (req, res) {
  res.redirect(__dirname + "/index.html");
});
app.post("/calibration", function (req, res) {
  // console.log(req.body.videoUrl);
  res.redirect("/calibration");
});
app.get("/calibration", function (req, res) {
  res.sendFile(__dirname + "/calibration.html");
});

//starting server
app.listen(port, function () {
  console.log("server running on port" + port);
});
