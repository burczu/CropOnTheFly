CropOnTheFly
============

A jQuery plugin which allows you to crop images on the fly (while loading and resizing of the browser window).

Installation:

Just download cropOnTheFly.js file and add it to your page (minified version of the file will be availabe soon)!

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
    horizontalPosition: 'center'
}
```

Explanation of each property below:

* **height**: default value is _**nul**_ which means that the full height of the image will be used; you can also set a fixed value in pixels
* **width**: default value is _**null**_, it works the same as for _**height**_ property
* **verticalPosition**: default value is _**'top'**_ which means that after cutting the height it will show the top segment of the image; other options are _**'center'**_ and _**'bottom'**_
* **horizontalPosition**: default value is _**'left'**_ which means that that after cutting the width it will show the left segment of the image; other options are _**'center'**_ and _**'right'**_
