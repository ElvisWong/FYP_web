// Module dependenciese
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentimentSchema = Schema({
	label: {type: String, default: ''},
	index: [{type: Number, default: 0}],
	count: [{type: Number, default: 0}]
});

module.exports = mongoose.model('Sentiment', SentimentSchema);