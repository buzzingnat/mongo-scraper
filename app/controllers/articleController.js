const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const Article = mongoose.model('Article');
// for scraping
var axios = require("axios");
var cheerio = require("cheerio");
// a list of subreddits to choose from
const subreddits = require('../lib/subredditList.js')();

module.exports = (app) => {
  app.use('/', router);
};

// A GET route for scraping
router.get("/scrape/:index", function(req, res) {
  	axios.get(`http://www.reddit.com/r/${subreddits[req.params.index]}`)
  	.then(function(response) {
	    var $ = cheerio.load(response.data);
	    var results = [];

	    // should I turn this into a bunch of promises?
	    // then I can use .then() when they are finished to run a bulk create...
	    $(".thing.link").each(function(i, element) {
	      var result = {};
	      result.title = $(this)
	        .find("a.title")
	        .text();
	      result.externalLink = $(this).attr("data-url"); //should always be an image/gif/video!
	      result.threadUrl = `https://www.reddit.com` + $(this)
	        .attr("data-permalink");
	      result.author = $(this)
	        .find("a.author")
	        .text();
	        results.push(result);
	    });
		// Create a new Article using the `result` object built from scraping
		// , {runValidators: true, context: 'query'}
		Article.create(results).then(function(dbArticle) {
	        // on success, send a message to the client
	        res.send("Scrape Complete");
	    }).catch(function(err) {
	        // On error, send error message to the client
	        // console.log(err);
	        res.json({length_of_results: results.length, err});
	    });
	});
});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
  	Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Router to empty collection and start from scratch
router.get(`/article/emptyAll`, function(request, response) {
	Article.remove({})
	.then(function(dbArticle) {
      // If all Users are successfully found, send them back to the client
      response.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      response.json(err);
    });
})

// Delete a single article
router.get(`/article/deleteOne/:id`, function(request, response) {
	Article.findByIdAndRemove(request.params.id)
	.then(function(dbArticle) {
      // If all Users are successfully found, send them back to the client
      response.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      response.json(err);
    });
});
