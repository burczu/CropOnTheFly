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
    function getTop(element, height, vertical) {
        // variables
        var top;

        switch(vertical){
            case 'center':
                top = -1 * ((element.height - height) / 2);
                break;
            case 'bottom':
                top =  -1 * (element.height - height);
                break;
            case 'top':
            default :
                top = 0;
                break;
        }

        return top;
    }

    // calculates and gets height
    function getHeight(settings, element) {
        // variables
        var height = settings.height;

        // handle default (height is null so get height of the image)
        if (height === null) {
            height = element.height;
        }

        // if image height is smaller than set height use image height
        if (element.height < height) {
            height = element.height;
        }

        return height;
    }

    function crop(element, settings) {
		// variables
		var top,
            parent,
            height;

        height = getHeight(settings, element);
        top = getTop(element, height, settings.verticalPosition);

        parent = getParent(element);

        // set styles for parent
        $(parent)
            .css('overflow', 'hidden')
            .css('height', height + 'px');

        // sets styles for image
		$(element)
            .css('position', 'relative')
			.css('top', top + 'px')
			.css('margin', '0px');
	}

	$.fn.cropOnTheFly = function(options) {
		
		// handle options
		var settings = $.extend({
			height: null, // default height
            width: null, // default width
            verticalPosition: 'top', // default vertical position
            horizontalPosition: 'left' // default horizontal position
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