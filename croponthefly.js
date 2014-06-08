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

    // creates and gets parent div
    function getParent(element){

        $(element).wrap(function (){
            var parent = $(this).parent('.cropContainer');

            if (parent.length === 0){
                return '<div class="cropContainer"></div>';
            }

            return false;
        });

        return $(element).parent('.cropContainer');
    }

    // calculates ang gets movement from top
    function getTop(element, settings) {
        // variables
        var top;

        switch(settings.verticalPosition){
            case 'center':
                top = -1 * ((element.height - settings.height) / 2);
                break;
            case 'bottom':
                top =  -1 * (element.height - settings.height);
                break;
            case 'top':
            default :
                top = 0;
                break;
        }

        return top;
    }

    function crop(element, settings) {
		// variables
		var top,
            parent;
		
		// change max height if needed
		if (element.height < settings.height) {
			settings.height = element.height;
		}

        top = getTop(element, settings);

        parent = getParent(element);

        // set styles for parent
        $(parent)
            .css('overflow', 'hidden')
            .css('height', settings.height + 'px');

        // sets styles for image
		$(element)
            .css('position', 'relative')
			.css('top', top + 'px')
			.css('margin', '0px');
	}

	$.fn.setUpCropping = function(options) {
		
		// handle options
		var settings = $.extend({
			height: 100, // default height
            verticalPosition: 'top' //default vertical position
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