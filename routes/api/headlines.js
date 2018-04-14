var Headline = require("../../models/Headline.js");

module.exports = function(app) {
    app.get("/headlines", function(req, res) {
    //   // Grab every document in the Articles collection
      Headline.find({})
        .then(function(dbHeadline) {
    //       // If we were able to successfully find Articles, send them back to the client
          res.json(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
    });
}

