// Module dependenciese
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TrendSchema = Schema({
	label: {type: String, default: ''},
	rank: {type: Number, default: 0},
	percentage: {type: Number, default: 0}
});

module.exports = mongoose.model('Sentiment', SentimentSchema);