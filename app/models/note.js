const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	title: {
		type: String,
		minLength: [3, `Title needs to be longer than 3 characters`],
		maxLength: [55, `Title needs to be shorter than 55 characters`],
		required: [true, 'Notes must have a title']
	},
	content: {
		type: String,
		minlength: [3, `Note needs to be longer than 3 characters`],
		maxlength: [150, `Note needs to be shorter than 150 characters`],
		required: [true, 'Notes must have content']
	},
	author: {
		type: String,
		minlength: [3, `Author name needs to be longer than 3 characters`],
		maxlength: [55, `Author name needs to be shorter than 55 characters`],
		/*match: [
				// /^[.\p{L}0-9\-\.\']*$|\_/,
				`/^[.\p{L}]*$/`,
				'Authors may only have: letters, numbers, dashes, apostrophes, and periods'
				],*/
		required: [true, 'Notes must have an author']
	}
});

NoteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Note', NoteSchema);
