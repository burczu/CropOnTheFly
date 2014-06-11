/*!
 * Crop Images On The Fly
 *
 * Copyright (c) 2014 Bartłomiej Dybowski
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.9.0
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

    // calculates ang gets shift
    function getShift(elementMeasure, settingsMeasure, position) {
        // variables
        var result;

        switch(position){
            case 'center':
                result = -1 * ((elementMeasure - settingsMeasure) / 2);
                break;
            case 'bottom':
            case 'right':
                result =  -1 * (elementMeasure - settingsMeasure);
                break;
            case 'top':
            case 'left':
            default :
                result = 0;
                break;
        }

        return result;
    }

    // calculates and gets height
    function getMeasure(elementMeasure, settingsMeasure) {
        // variables
        var result = settingsMeasure;

        // handle default (height is null so get height of the image)
        if (result === null) {
            result = elementMeasure;
        }

        // if image height is smaller than set height use image height
        if (elementMeasure < result) {
            result = elementMeasure;
        }

        return result;
    }

    // do all calculations and crops the image
    function crop(element, settings) {
        // variables
        var parent,
            top,
            left,
            height,
            width;

        // calculate measures
        height = getMeasure(element.height, settings.height);
        width = getMeasure(element.width, settings.width);

        // calculate shifts
        top = getShift(element.height, height, settings.verticalPosition);
        left = getShift(element.width, width, settings.horizontalPosition);

        // wrap image by div
        parent = getParent(element);

        // set styles for parent div
        $(parent)
            .css('overflow', 'hidden')
            .css('height', height + 'px')
            .css('width', width + 'px');

        // sets styles for image
		$(element)
            .css('position', 'relative')
            .css('margin', '0px')
			.css('top', top + 'px')
            .css('left', left + 'px');
	}

    // settings for all instances
    $.fn.cropOnTheFly.settings = {
        height: null, // default height
        width: null, // default width
        verticalPosition: 'top', // default vertical position
        horizontalPosition: 'left' // default horizontal position
    };

    // set up jQuery plugin
	$.fn.cropOnTheFly = function(options) {

        // handle default options
        var settings = $.extend($.fn.cropOnTheFly.settings, options);
	
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
