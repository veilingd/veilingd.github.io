/* TODO add instructions */

/* main runs upon document ready */
var main = function() {
	//activate all players
	try {
	    $( '.isAudioPlayer' ).audioPlayer();
    } catch {

    }
	$( '#collapse2').removeClass('in');

    let fbDummy = document.querySelector('#fb-dummy-image');
    fbDummy.onclick = () => {
        let parent = fbDummy.parentElement;
        console.log(parent);
        let fbIframe = document.createElement('iframe');
        fbIframe.id = 'fb-like-iframe'
        fbIframe.src = `https://www.facebook.com/plugins/like.php?locale=en_GB&href=https%3A%2F%2Fwww.facebook.com%2Fveiling.distress%2F&send=false&show_faces=false&action=like&colorscheme=light&width=80&height=20&layout=button_count`
        parent.appendChild(fbIframe);
        parent.removeChild(fbDummy);
    };
    // 2 click 'like'
    //defines the default order of the buttons
	$.fn.socialSharePrivacy.settings.order = ['facebook', 'gplus', 'twitter', 'tumblr', 'reddit'];
	$.fn.socialSharePrivacy.settings.path_prefix = '../';

    $('#share').socialSharePrivacy({
		perma_option: false,
		uri: 'https://www.facebook.com/veiling.distress/',
		layout: window.innerWidth < 480 ? 'box' : 'line'
	});
    
	$(window).resize(function () {
		var layout = window.innerWidth < 480 ? 'box' : 'line';
		var $share = $('#share');
		if ($share.socialSharePrivacy('options').layout !== layout) {
			var enabled = $share.socialSharePrivacy('enabled');
			$share.socialSharePrivacy('destroy').socialSharePrivacy({
				perma_option: false,
				uri: 'https://www.facebook.com/veiling.distress/',
				layout: layout
			});

			for (var name in enabled) {
				if (enabled[name]) {
					$share.socialSharePrivacy('enable', name);
				}
			}
		}
	});
};
	
// run main function on startup
$(document).ready(main);
