var css = require('../src/assets/sass/global.scss'), 
		images = require('../src/assets/sass/components/image.scss'),
		JqueryMatchHeight = require('jquery-match-height'),
		// enable this to use font awesome's default settings
		fontAwesome = require('font-awesome-sass-loader');
		//  enable this to use custom settings for app per client
		//fontAwesome = 

$(document).ready(function () {
// variables declaration and initialization
 var title = document.getElementsByTagName('TITLE'),
 	 nav_item = document.querySelectorAll('.nav-item'),
 	 navbar_item = document.querySelectorAll('.navbar--item');

 	 if (title[0].textContent === 'Features') {
 	 	remove_class('.nav-item', 'active');
 	 	add_class(nav_item[1], 'active');
 	 }
 	 else if (title[0].textContent === 'Download') {
 	 	remove_class('.nav-item', 'active');
 	 	add_class(nav_item[2], 'active');	
 	 } else if (title[0].textContent === 'Purchase') {
 	 	remove_class('.nav-item', 'active');
 	 	add_class(nav_item[3], 'active');
 	 }  else if (title[0].textContent === 'Partners') {
 	 	remove_class('.navbar--item', 'active');
 	 	add_class(navbar_item[1], 'active');
 	 }  else if (title[0].textContent === 'Contact') {
 	 	remove_class('.navbar--item', 'active');
 	 	add_class(navbar_item[2], 'active');
 	 }

 	// callback function for adding and removing classes
 	function add_class(a, b) {
 		$(a).addClass(b);
 	}

 	function remove_class(a, b) {
 		$(a).removeClass(b);
 	}
 
// animation for timeline display
$(window).on('scroll', function(){
	$('.timeline--block').each(function(){
		if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.15 && $(this).find('.timeline--image').hasClass('is-hidden') ) {
			$(this).find('.timeline--image, .timeline--content').removeClass('is-hidden').addClass('bounce-in');
		}
	});
});

// alerting users to visit the actual site whenever an action button is clicked
$('.btn').click(function() {
	alert('visit http://ngwin.com/picpick to perform this action');
});

});

// this script should be well commented