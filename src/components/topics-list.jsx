var React = require('react');
var TopicStore = require('../stores/topic-stores');
var Reflux = require('reflux');
var Actions = require('actions');

module.exports = React.createClass({
	mixins: [
		// listens for any events that are coming from TopicStore, 
		// call onChange function when event triggered by store
		Reflux.listenTo(TopicStore, 'onChange')
	],
	getInitialState: function() {
		return {
			// assigning to empty array prevents erros when calling map function in renderTopics
			topics: []
		}
	},
	componentWillMount: function() {
		// method is called from actions object in actions.jsx
		Actions.getTopics();
	},
	render: function() {
		return <div className = "list-group">
			Topic List
			{this.renderTopics()}
		</div>
	},
	renderTopics: function() {
		return this.state.topics.map(function(topic) {
			return <li>
				{topic.name}
			</li>
		});
	},
	// Take new list of topics set it onto topics state param
	onChange: function(event, topics) {
		this.setState({
			topics: topics
		})
	}
});