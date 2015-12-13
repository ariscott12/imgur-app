var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getTopics: function() {
		// fires ajax request using api module (api.jsx)
		return Api.get('topics/defaults')
			.then(function(json) {
				this.topics = json.data;
				this.triggerChange();	
			}.bind(this));
		
	},
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.topics);
	}
});
