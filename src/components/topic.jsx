var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-stores');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
	mixins: [
		// listens for any events that are coming from TopicStore, 
		// call onChange function when event triggered by store
		Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function() {
		return {
			images: []
		}
	},
	componentWillMount: function() {
		Actions.getImages(this.props.params.id);
	},
	componentWillReceiveProps: function(nextProps) {
		Actions.getImages(nextProps.params.id);
	},
	renderImages: function() {
		return this.state.images.slice(1,20).map(function(image) {
			return <ImagePreview key = {image.id} image = {image} /> 
		});
	},
	render: function() {
		return (
			<div className="topic">
				{this.renderImages()}
			</div>
		);
	},
	onChange: function(event, images) {
		this.setState({
			images: images
		})
	}
});