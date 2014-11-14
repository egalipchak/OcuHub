jQuery(function($){
	'use strict';

	// -------------------------------------------------------------
	//   Non Item Based Navigation
	// -------------------------------------------------------------
	(function () {
		var $frame = $('#nonitembased');
		var $wrap  = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			speed: 300,
			easing: 'easeOutExpo',
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			scrollBy: 100,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});
	}());
});


// Not used now
/*
(function () {
		var $frame  = $('#smart');
		var $wrap   = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			itemNav: 'basic',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 3,
			scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			pagesBar: $wrap.find('.pages'),
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});
	}());
*/


function setGazeTimer(btnId, pgbarId) {

	var pb = $(pgbarId).progressbar();
	var progress = 0;

	var isIncrease = true;
	var isDone = false;

	$(btnId).hover(
		function() {
			// Mouse In
			console.log("Mouse In");

			progress = 0;
			isIncrease = true;
			isDone = false;

			var interval = setInterval(
				function(){

					if (isDone) {
						clearInterval(interval);
						return;
					}

					console.log("interval");

					if (isIncrease)
						progress += 5;
					else
						progress -= 5;

					pb.progressbar('value', progress);

					if (progress <= 0) {
						clearInterval(interval);

						isDone = true;

					} else if (progress >= 100) {
                    	clearInterval(interval);

						isDone = true;

                    	// Simluate click
                    	$(btnId).click();

						// Reset
						progress = 0;
						//pb.progressbar('value', progress);

                    }
                }
            , 50);
		},
		function() {
			// Mouse Out
			console.log("Mouse Out");
			
			isIncrease = false;

			if (isDone) {
				pb.progressbar('value', 1);
			}
		});
}

function fillAppList(listId, isSub) {
	var i = 0;

	$(listId).empty();

	for (i=0; i<100; ++i) {
		$(listId).append('<a href="#" class="list bg-lightBlue fg-white" id="btnApp'+i+'"><div class="list-content"><span class="list-title">'+(isSub?'Subapp ':'App ')+i+'</span></div><div class="progress-bar small bg-lightBlue" data-role="progress-bar" data-color="bg-white" id="btnApp'+i+'PgBar"></div></a>');

		//$(listId).append('<li><a href="#" class="list bg-lightBlue fg-white" id="btnApp'+i+'"><div class="list-content"><span class="list-title">'+(isSub?'Subapp ':'App ')+i+'</span></div><div class="progress-bar small bg-lightBlue" data-role="progress-bar" data-color="bg-white" id="btnApp'+i+'PgBar"></div></a></li>');

		setGazeTimer('#btnApp'+i, '#btnApp'+i+'PgBar');
	}
}

