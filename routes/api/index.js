module.exports = function(app) {
    app.get("/headlines/:id", function(req, res) {
    //   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
      Headline.findOne({ _id: req.params.id })
    //     // ..and populate all of the notes associated with it
        .populate("note")
        .then(function(dbHeadline) {
    //       // If we were able to successfully find an Article with the given id, send it back to the client
          res.json(dbHeadline);
        })
        .catch(function(err) {
    //       // If an error occurred, send it to the client
          res.json(err);
        });
    });
}

