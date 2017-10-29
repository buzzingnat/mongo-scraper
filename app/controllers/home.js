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
    Article.find({})
    .then(function(articles) {
        console.log(`first article is:`, articles[0], `\nhas type of:`, typeof(articles[0]));
        articles.forEach(function(article, i) {
            article.tagImg = true;
            article.tagVid = false;
            let img = article.externalLink;
            // gfycat sites: https://[[giant]].(bodyOfLink - [[https://]]).[[mp4]]
            // imgur sites: (bodyOfLink - [[.gifv]] + .[[mp4]])
            if (img.includes(`.gifv`) && img.includes(`https://i.imgur`)) {
                article.externalLink = img.replace(`.gifv`, `.mp4`);
                article.tagImg = false;
                article.tagVid = true;
            }
            // convert this: https://gfycat.com/ElaborateAmusingHorseshoecrab
            // convert to:   https://giant.gfycat.com/ElaborateAmusingHorseshoecrab
            if (img.includes(`gfycat`)) {
                console.log(`${i} image needs converting:`, img);
                article.externalLink = img.replace(`gfycat.`, `giant.gfycat.`) + `.mp4`;
                console.log(`${i} has been converted:`, article.externalLink);
                article.tagImg = false;
                article.tagVid = true;
            }
        });
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
