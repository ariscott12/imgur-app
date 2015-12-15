var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');
var _ = require('lodash');


module.exports = Reflux.createStore({
	// listen to any available actions provided by actions.jsx, if action matches method call it
	listenables: [Actions],
	getImages: function(topicId) {
		// fires ajax request using api module (api.jsx)
		return Api.get('topics/' + topicId)
			.then(function(json) {
				// Filter any images that are an album
				this.images = _.reject(json.data, function(image) {
					return image.is_album
				});

				this.triggerChange();	
			}.bind(this));
		
	},
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.images);
	}
});
