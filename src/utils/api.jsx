var Fetch = require("whatwg-fetch");
var rootUrl =  'https://api.imgur.com/3/';
var apiKey = '0c32638c90a51e4';

module.exports = {
	get: function(url) {
		return fetch(rootUrl + url, {
			headers: {
				'Authorization' : 'Client-ID ' + apiKey
			}
		})
		.then(function(response) {
			return response.json();
		})
	}
}