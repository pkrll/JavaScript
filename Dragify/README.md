## Dragify
Add drag and drop-functionality to your HTML elements. The Dragify plugin also enables server uploads with AJAX.

### Usage
* Include the files and the jQuery library:
```html
  <script src="//code.jquery.com/jquery-2.1.4.min.js" charset="utf-8"></script>
  <link rel="stylesheet" href="/path/to/dragify-1.0.css" media="screen" charset="utf-8">
  <script src="/path/to/dragify-1.0.js" charset="utf-8"></script>
```
* Use the plugin as follows. The upload url must be set in order for the upload to work.
```js
$(".dragAndDropElement").dropify({
   "url": "/path/to/upload.php"
});
```
#### Options
```js
.dropify({
   "url"                : "/path/to/server/upload/", // The request URL (required)
   "consecutiveLimit"   : 2, // Limits number of files to upload at once (optional)
   "loaderImagePath"    : "/public/images/system/loading-128.png", // Sets the loader icon (optional)
   "extensions"         : ["jpg", "jpeg", "gif", "png"], // Extensions that are allowed to upload (optional)
   "onDownload"         : false // Overrides the default function called upon xhr.onprogress (optional)
   "onUpload"           : false // Overrides the default function called upon xhr.upload.onprogress (optional)
   "onReady"            : false // Overrides the default function called upon completion (optional)
   "onError"            : false // Overrides the default function called upon error (optional)
});
```
