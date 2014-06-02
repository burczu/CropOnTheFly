/*!
 * Crop Images On The Fly
 *
 * Copyright (c) 2014 Bartłomiej Dybowski
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.0.1
 */

(function($) {

	function crop(element, maxHeight) {	
		// variables
		var top;
		
		// change max height if needed
		if (element.height < maxHeight) {
			maxHeight = element.height;
		}
		
		// calculate top
		top = -1 * ((element.height - maxHeight) / 2);
		
		$(element).parents('.custom-thumb')
			.css('overflow', 'hidden')
			.css('height', maxHeight + 'px');
		
		$(element)
			.css('top', top + 'px')
			.css('margin', '0px');
	}

	$.fn.setUpCropping = function(options) {
		
		// handle options
		var settings = $.extend({
			height: 100, // set default value of height to 100
			width: 50 // another default (not used yet)
		}, options );
	
		// do for each element
		return this.each(function() {
			// variables
			var self = this;
			
			// set up event
			$(window).on('load resize', function() {
				crop(self, settings.height);
			});
		});		
	};
	
} (jQuery));