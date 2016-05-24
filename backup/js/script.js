/* TODO add instructions */

/* main runs upon document ready */
var main = function() 
{
	// activates tooltips. The tag's title attribute is displayed on hover.
	$(document).tooltip();
	
	/* admin panel provides some extra buttons, starts hidden */
	$('#adminPanel').hide();
	var buttonOpenedText = "<<< close";
	var buttonClosedText = "admin >>>";
	$('#adminPanelToggle').text(buttonClosedText);

	/* button handlers start here */
	
	/* toggles admin panel */
	$('#adminPanelToggle').click(function()
	{
		if ($('#adminPanelToggle').text() === buttonClosedText)
		{
			$('#adminPanelToggle').text(buttonOpenedText);
			$('#adminPanel').fadeIn(400);
		}
		else
		{
			$('#adminPanelToggle').text(buttonClosedText);
			$('#adminPanel').fadeOut(400);
		}
	});
	
	/* button handlers stop here */
	
	// accordion for the info section
	$('#infos').accordion({
		collapsible: true,
		heightStyle: "content"
	});
}
	
// run main function on startup
$(document).ready(main);
