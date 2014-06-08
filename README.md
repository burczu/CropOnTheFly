CropOnTheFly
============

A jQuery plugin which allows you to crop images on the fly (while loading and resizing of the browser window).

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

* **height**: default value is 'null' which means that the height of the image will be used; you can also set a fixed value in pixels
* **width**: default value is 'null', it works the same as for height property
* **verticalPosition**: default value is 'top' which means that after cutting the height it will show the top segment of the image; other options are 'center' and 'bottom'
* **horizontalPosition**: default value is 'left' which means that that after cutting the width it will show the left segment of the image; other options are 'center' and 'right'
