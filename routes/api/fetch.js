var axios = require("axios");
var cheerio = require("cheerio");
var Headline = require("../../models/Headline.js");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        axios.get("http://www.chicagotribune.com/").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
      
          // console.log($);
      
          // Now, we grab every h2 within an article tag, and do the following:
          $("li.trb_outfit_list_headline").each(function(i, element) {
          //   // Save an emptys result object
            var result = {};
      
          //   // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .children("a")
              .text();
            result.link = $(this)
              .children("a")
              .attr("href");
            result.saved = false;
            // result.summary = $(this)
            //   .children()
            //   .
      
          // console.log(result);
          //   // Create a new Article using the `result` object built from scraping
          
            Headline.create(result)
              .then(function(dbHeadline) {
          // //       // View the added result in the console
                console.log(dbHeadline);
              })
              .catch(function(err) {
          // //       // If an error occurred, send it to the client
                return res.json(err);
              });
          });
      
         
        });
      });
};
