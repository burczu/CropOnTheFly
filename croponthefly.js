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

    function createParent(element){
        // create parent div
        $(element).wrap(function (){
            var parent = $(this).parent('.cropContainer');

            if (parent.length === 0){
                return '<div class="cropContainer"></div>';
            }

            return false;
        });
    }

	function crop(element, settings) {
		// variables
		var top;
		
		// change max height if needed
		if (element.height < settings.height) {
			settings.Height = element.height;
		}
		
		// calculate top
		top = -1 * ((element.height - settings.height) / 2);

        createParent(element);

        $(element)
            .parent('.cropContainer')
            .css('overflow', 'hidden')
            .css('height', settings.height + 'px');

		$(element)
            .css('position', 'relative')
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
				crop(self, settings);
			});
		});		
	};
	
} (jQuery));