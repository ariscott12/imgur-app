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
	getImage: function(id) {
		return Api.get('gallery/image/' + id)
			.then(function(json) {
				if(this.images) {
					this.images.push(json.data);
				} else {
					this.images = [json.data];
				}
				console.log(json.data);
				this.triggerChange();	
			}.bind(this));
	},
	find: function(id) {
		// find image with key id of propery id that is passed in
		var image = _.find(this.images, {id: id});

		// if image exists return image otherwise execute another ajax request for data
		if(image) {
			return image
		} else {
			this.getImage(id);
			return null;
		}

		console.log(image);
	},	
	triggerChange: function() {
		// fire trigger event
		this.trigger('change', this.images);
	}
});
