	//sets first state for tabbed player navigation
	$('#songTabsButtonList').children().first().addClass('active');
	$('#songTabsContentList').children().first().addClass('active');
	$('#songTabsContentList').children().first().addClass('in');
	//sets id for each tab's content panel
	$('#songTabsContentList').children().each(function(index) {
        $(this).attr('id', index);
    });