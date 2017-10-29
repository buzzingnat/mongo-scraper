const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const Article = mongoose.model('Article');
// a list of subreddits to choose from
const subreddits = require('../lib/subredditList.js')();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
	Article
    .find({})
    .then(function(articles) {
		res.status(200).render('index', {
			title: 'Cute Animals Forever',
			articles: articles,
			subreddits: subreddits
		});
    })
    .catch(function(err) {
		res.json(err);
    });
});
