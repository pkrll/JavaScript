## Tooltip
A simple jQuery plugin to add small tooltips below HTML form elements.

#### Usage
* Create container div elements for each and every one of the form elements that are to be subject to the Tooltip plugin, with the class "tooltip-container":

```html
<div class="tooltip-container">
   <input type="text" placeholder="Username" autofocus="autofocus" required="required" />
</div>
```

* Do not forget to include the files and the jQuery library:

```html
  <script src="//code.jquery.com/jquery-2.1.4.min.js" charset="utf-8"></script>
  <link rel="stylesheet" href="/path/to/tooltip-1.0.css" media="screen" charset="utf-8">
  <script src="/path/to/tooltip-1.0.js" charset="utf-8"></script>
```

* Call the plugin:

```js
var tooltip = new Tooltip({
   "label": "Please fill out this field",
   "element": $(element)
}, true);
```

#### Options
```js
Tooltip({
   "label": "Please fill out this field", // Required
   "fadeOut": 5000, // Optional, sets the number of milliseconds the tooltip should stay on screen
   "element": $(element) // Required: The tooltip-container
}, true|false); // A true value will remove all tooltips on screen when executing
```

![Screenshot](https://github.com/pkrll/JavaScript/blob/master/Tooltip/tooltip10.png)

### Example usage
See the example folder for an example on how to use it.

### More to come
This is a work in progress.

### Author
* Tooltip was created by Ardalan Samimi.
