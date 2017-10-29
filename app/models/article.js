const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Article must have a title']
  },
  externalLink: {
    type: String,
    required: [true, 'Article must have an external link'],
    unique: true
  },
  threadUrl: {
        type: String,
        validate: {
          validator: function(v) {
            return (this.externalLink !== this.threadUrl);
          },
          message: 'Picture link and comment thread link must be different'
        },
        required: [true, 'Reddit comment thread url required'],
        unique: true
      },
  author: {
    type: String,
    required: [true, 'Article must have an author']
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

ArticleSchema.virtual('date')
  .get(() => this._id.getTimestamp());

ArticleSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

mongoose.model('Article', ArticleSchema);
