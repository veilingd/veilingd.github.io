/* TODO add instructions */

/* main runs upon document ready */
var main = function() 
{
	//activate all players
	$( '.isAudioPlayer' ).audioPlayer();
	$( '#collapse2').removeClass('in');
    
    // 2 click 'like'
    //defines the default order of the buttons
	$.fn.socialSharePrivacy.settings.order = ['facebook', 'gplus', 'twitter', 'tumblr', 'reddit'];
	$.fn.socialSharePrivacy.settings.path_prefix = '../';
 //	$('#socialshareprivacy').socialSharePrivacy({uri: 'http://veilingd.herokuapp.com/'});
    
    $('#share').socialSharePrivacy({
		perma_option: false,
		//uri: 'http://www.example.com/',
		uri: 'https://www.facebook.com/veiling.distress/',
		//info_link_target: '_blank',
		layout: window.innerWidth < 480 ? 'box' : 'line'
		//layout: 'line'
	});
    
	$(window).resize(function () {
		var layout = window.innerWidth < 480 ? 'box' : 'line';
		var $share = $('#share');
		if ($share.socialSharePrivacy('options').layout !== layout) {
			var enabled = $share.socialSharePrivacy('enabled');
			$share.socialSharePrivacy('destroy').socialSharePrivacy({
				perma_option: false,
				uri: 'https://www.facebook.com/veiling.distress/',
				//info_link_target: '_blank',
				layout: layout
			});

			for (var name in enabled) {
				if (enabled[name]) {
					$share.socialSharePrivacy('enable', name);
				}
			}
		}
	});
	
	
    
}
	
// run main function on startup
$(document).ready(main);
