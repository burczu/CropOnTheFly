CropOnTheFly
============

A jQuery plugin which allows you to crop images on the fly (while loading and resizing of the browser window).

Installation:

Just download cropOnTheFly.js file (or cropOnTheFly.min.js if you want minified version) and add it to your page.

Usage example:

```javascript
$('img').cropOnTheFly(options);
```

where 'options' is an object similar to this:

```javascript
var options = {
    height: 250,
    width: 400,
    verticalPosition: 'center',
    horizontalPosition: 'center',
    afterCrop(parameter) {
        alert('height: ' + parameter.height);
    }
}
```

Explanation of each property below:

* **height**: default value is _**nul**_ which means that the full height of the image will be used; you can also set a fixed value in pixels
* **width**: default value is _**null**_, it works the same as for _**height**_ property
* **verticalPosition**: default value is _**'top'**_ which means that after cutting the height it will show the top segment of the image; other options are _**'center'**_ and _**'bottom'**_; you could also use _**numeric**_ values where _**0**_ means _**'top'**_
* **horizontalPosition**: default value is _**'left'**_ which means that that after cutting the width it will show the left segment of the image; other options are _**'center'**_ and _**'right'**_; you could also use _**numeric**_ values where _**0**_ means _**'left'**_
* **afterCrop**: default value is an empty function; this is callback function which will be called just after cropping is finished; the parameter taken by this function is an object which contains calculations and objects used to crop; this object can look like this:

```javascript
var parameters = {
    height: 250,
    width: 400,
    top: -175,
    left: -75,
    element: {},
    parent: {}
}
```

Explanation of each property below:

* **height**: calculated height of the image
* **width**: calculated width of the image
* **top**: calculated position of the image; this value is set to _**'top'**_ CSS property
* **left**: calculated position of the image; this value is set to _**'left'**_ CSS property
* **element**: object which contains _**'img'**_ HTML element
* **parent**: object which contains _**'div'**_ HTML element; this element is an injected container which contains image