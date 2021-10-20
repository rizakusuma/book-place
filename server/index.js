const cors = require("cors");
var routes = require("./src/routes");
var express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  console.log("Express server listening on port " + port);
});

routes(app);

module.exports = app;
