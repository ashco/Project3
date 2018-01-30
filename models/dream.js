const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	sentiment: String,
	score_positive: Number,
	score_negative: Number,
	score_neutral: Number,
	score_mixed: Number,
	keyword1: String,
	keyword2: String,
	keyword3: String,
	keyword4: String,
	keyword5: String
})

var Dream = mongoose.model('Dream', dreamSchema);

module.exports = Dream;