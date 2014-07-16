/*!
 * Crop Images On The Fly
 *
 * Copyright (c) 2014 Bartłomiej Dybowski
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.1.0
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
                result = 0;
                break;
            default :
                // position here can be number or null
                if ($.isNumeric(position) == true) {
                    result = position * -1;
                } else {
                    result = 0; // null and not supported values
                }
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

    // shows the loader depending on settings
    function showLoader(settings, element) {
        // show indicator
        if (settings.showLoader === true) {
            if (settings.loaderCss !== null) {
                $(element).css(settings.loaderCss);
            }

            $(element).attr('src', settings.loaderSrc);
        }
        else {
            $(element).hide();
        }
    }

    // do all calculations and crops the image
    function crop(element, settings) {
        // variables
        var //
            cropParameters = {},
            src = $(element).attr('data-src'),
            image = new Image();

        // wrap image by div
        cropParameters.parent = getParent(element);

        // show loader if needed
        showLoader(settings, element);

        image.onload = function(){
            // calculate measures
            cropParameters.height = getMeasure(image.height, settings.height);
            cropParameters.width = getMeasure(image.width, settings.width);

            // calculate shifts
            cropParameters.top = getShift(image.height, cropParameters.height, settings.verticalPosition);
            cropParameters.left = getShift(image.width, cropParameters.width, settings.horizontalPosition);

            // assign element to parameters
            cropParameters.element = element;

            // show image
            $(element).attr('src', src).show();

            // set styles for parent div
            $(cropParameters.parent)
                .css('overflow', 'hidden')
                .css('height', cropParameters.height + 'px')
                .css('width', cropParameters.width + 'px');

            // sets styles for image
            $(element)
                .css('position', 'relative')
                .css('margin', '0px')
                .css('top', cropParameters.top + 'px')
                .css('left', cropParameters.left + 'px');

            // call "after" callback
            settings.afterCrop(cropParameters);
        };

        image.src = src;
	}

    // set up jQuery plugin
	$.fn.cropOnTheFly = function(options) {

        // handle default options
        var settings = $.extend({}, $.fn.cropOnTheFly.settings, options);
	
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

    // settings for all instances
    $.fn.cropOnTheFly.settings = {
        height: null, // default height
        width: null, // default width
        verticalPosition: 'top', // default vertical position
        horizontalPosition: 'left', // default horizontal position
        showLoader: true, // shows loader by default
        loaderSrc: 'loader.gif', // default loader url
        loaderCss: {}, // default loader css
        afterCrop: function (cropParameters) {} // default callback (does nothing)
    };
	
} (jQuery));
