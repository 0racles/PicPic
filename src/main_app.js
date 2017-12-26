var css = require('../src/assets/sass/global.scss'), 
		images = require('../src/assets/sass/components/image.scss'),
		JqueryMatchHeight = require('jquery-match-height'),
		// enable this to use font awesome's default settings
		fontAwesome = require('font-awesome-sass-loader');
		//  enable this to use custom settings for app per client
		//fontAwesome = 

$(document).ready(function () {

$('.div').css({
	'height' : '200px',
	'color' : '#333'
	});
});

// this script should be well commented