var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-stores');
var Reflux = require('reflux');


module.exports = React.createClass({
	mixins: [
		// listens for any events that are coming from TopicStore, 
		// call onChange function when event triggered by store
		Reflux.listenTo(TopicStore, 'onChange')
	],
	componentWillMount: function() {
		// method is called from actions object in actions.jsx
		Actions.getTopics();
	},
	getInitialState: function() {
		return {
			topics: []
		}
	},
	render: function() {
		return (
			<nav className = "navbar navbar-default header">
				<div className = "container fluid">
					<Link  to = "/" className = "navbar-brand">
						Imgur Browser
					</Link>
					<ul className = "nav navbar-nav navbar-right">
						{this.renderTopics()}
					</ul>
				</div>

			</nav>
		);
	},
	onChange: function(event, topics) {
		this.setState({
			topics: topics
		})
	},
	renderTopics: function() {
		return this.state.topics.slice(0,4).map(function(topic) {
			return <li key = {topic.id} >
				<Link to = {'topics/' + topic.id}>
					{topic.name}
				</Link>
			</li>
		});
	}
});