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

$(window).on('scroll', function(){
	$('.timeline--block').each(function(){
		if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.15 && $(this).find('.timeline--image').hasClass('is-hidden') ) {
			$(this).find('.timeline--image, .timeline--content').removeClass('is-hidden').addClass('bounce-in');
		}
	});
});

$('.btn').click(function() {
	alert('visit http://ngwin.com/picpick to perform this action');
});

});

// this script should be well commented