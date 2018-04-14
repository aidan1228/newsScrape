var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");



var axios = require("axios");
var cheerio = require("cheerio");


var Headline = require("./models/Headline.js");
var Note = require("./models/Note.js");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/week18Populater");


require("./routes/api/fetch.js")(app);
require("./routes/api/headlines.js")(app);
require("./routes/api/index.js")(app);
require("./routes/api/notes.js")(app);
require("./routes/views/htmlRoutes.js")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});