const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const Article = mongoose.model('Article');

module.exports = (app) => {
  app.use('/', router);
};

// get all notes
router.get("/notes", function(req, res) {
    Note.find({})
    // .populate('notes')
    .then(function(dbArticle) {
      res.status(200).json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// get notes for a single article
router.get("/notes/article/:id", function(req, res) {
    Article.findById(req.params.id)
    .populate('notes')
    .then(function(dbArticle) {
      res.status(200).json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// get all notes with all articles
router.get("/populatedArticles", function(req, res) {
    Article.find({})
    .populate('notes')
    .then(function(dbArticle) {
      res.status(200).json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving a new Note to the db and associating it with a User
router.post("/note/submit/:articleId", function(req, res) {
  // Create a new Note in the db
  Note
    .create(req.body)
    .then(function(dbNote) {
      console.log(`the note id is`, dbNote._id);
      return Article.findByIdAndUpdate(req.params.articleId, { $push: { notes: dbNote._id } }, { new: true });
    })
    .catch(err => res.json(err))
    .then(function(dbArticle) {
      // If the User was updated successfully, send it back to the client
      // console.log(dbArticle);
      res.status(200).json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Delete a single note: delete note AND reference id in article model
router.get(`/note/deleteOne/:noteId/:articleId`, function(request, response) {
    Note.findByIdAndRemove(request.params.noteId)
    .then(function(dbNote) {
        // Here we delete references in the Article collection
        return Article.findByIdAndUpdate(
            request.params.articleId,
            { $pull: { notes: request.params.noteId } },
            { new: true }
        );
    }).catch(err => response.json(err))
    .then(function(dbArticle) {
      response.status(200).json(dbArticle);
    })
    .catch(function(err) {
      response.json(err);
    });
});
