var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			hovering: false
		} 
			
	},
	render: function() {
		return <Link to = {"images/" + this.props.image.id}
			className = "image-preview"
			onMouseEnter= {this.handleMouseEnter}
			onMouseLeave = {this.handleMouseLeave}
			>
			{this.state.hovering && this.props.image.animated ? this.video() : this.image()}
			{!this.state.hovering && this.props.image.animated ? this.icon() : null}
			{this.state.hovering ? this.inset() : null}
		</Link>
		
	},
	inset: function() {
		return <div className = "inset">
			Views: {this.props.image.views}
			<br />
			Votes: {this.props.image.ups}
		</div>
	},
	video: function() {
		return <div>
			<video preload='auto' autoPlay= 'autoplay' loop='loop' webkit-playsinline>
				<source src={this.props.image.mp4} type = "video/mp4"></source>
			</video>
		</div>
	},
	image: function() {
		var link = 'http://i.imgur.com/' + this.props.image.id + 'h.jpg';

		return <img src = {link} /> 
	},
	icon: function() {
		return <span className = "glyphicon glyphicon-play"></span>
	},
	handleMouseLeave: function() {
		this.setState({
			hovering: false
		})
	},
	handleMouseEnter: function() {
		this.setState({
			hovering: true
		})
	}
});