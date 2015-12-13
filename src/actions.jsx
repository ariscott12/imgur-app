var Reflux = require('reflux');

module.exports = Reflux.createActions([
	// single action getTopics, runs getTopics in any store that has getTopics method
	'getTopics'
]);