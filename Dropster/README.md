## Dropster
Add drag and drop-functionality to your HTML elements. The Dropster plugin also enables server uploads with AJAX.

### Usage
* Include the files and the jQuery library:
```html
  <script src="//code.jquery.com/jquery-2.1.4.min.js" charset="utf-8"></script>
  <link rel="stylesheet" href="/path/to/dropster-1.1.css" media="screen" charset="utf-8">
  <script src="/path/to/dropster-1.1.js" charset="utf-8"></script>
```
* Use the plugin as follows. The upload url must be set in order for the upload to work.
```js
$(".dragAndDropElement").dropster({
   "url": "/path/to/upload.php"
});
```
* Drag the file(s) over the drop zone, and release.

![Screenshot](https://github.com/pkrll/JavaScript/blob/master/Dropster/screenshot.png)

* Let the upload commence.

![Screenshot](https://github.com/pkrll/JavaScript/blob/master/Dropster/screenshot-1.png)
![Screenshot](https://github.com/pkrll/JavaScript/blob/master/Dropster/screenshot-2.png)

#### Options
```js
.dropster({
       "url"                : "/path/to/server/upload/",
       "consecutiveLimit"   : 2,
       "loaderImagePath"    : "/path/to/image.png",
       "extensions"         : ["jpg", "jpeg", "gif", "png"],
       "onDownload"         : false,
       "onUpload"           : false,
       "onReady"            : false,
       "onError"            : false
    });
```
##### Properties
* `url`: The request URL path (**required**).
* `consecutiveLimit`: Limits the number of files that will be uploaded at once.
* `loaderImagePath`: Path to the loader image. Will be displayed if the default progress dialog is used.
* `extensions`: List of allowed extension. Files with any other extensions will not be uploaded.
* `onDownload`: Overrides the XMLHttpRequests onprogress event, and is passed a progressEvent object.
* `onUpload`: Overrides the XMLHttpRequests upload.onprogress event, and is passed a progressEvent object.
* `onReady`: Overrides the onreadystatechange event. Will be called only if the readyState is 4 (request finished and response is ready). This function is passed the responseText property of the XMLHttpRequest object and will be in charge of parsing the server response.
* `totalSizeToLoad`: The total number of files that are to be uploaded. (**read-only**).
* `totalSizeLoaded`: Number of files that as of accessing this variable has been uploaded. (**read-only**).

#### Customization
* Dropster's default progress monitoring can easily be overridden and tailored to fit your exact needs. Below follows an example, where the [ProgressBar plugin](https://github.com/pkrll/JavaScript/tree/master/Progressbar) is used instead of the default dialog window.
```js
    /**
     * Add the Dropster plugin to the element with
     * id targetArea, with customized settings.
     */
    $("#targetArea").dropster({
       url: "/upload/image",
       consecutiveLimit: 5,
       extensions: []
       onUpload: $.fn.onUpload,
       onDownload: $.fn.onDownload,
       onReady: function (response) {
         // Remove the progressbar
         // and parse the response.
         this.monitor.remove();
         var parsedResponse = jQuery.parseJSON(response);
         // Print out the response
         console.log(parsedResponse);
       }
    });

    /**
     * Override Dropster's default onUpload function.
     *
     * @param   progressEvent
     */
    $.fn.onUpload = function (event) {
        // Keyword "this" gives access to the
        // plugins settings variables, where
        // the progressbar element can be stored
        // inside the variable monitor, instead
        // of declaring a global variable for it.
        var self = this;
        // Create the progress bar object, and
        // connect it to the Dropster plugin, if
        // it already does not exist. But keep it
        // inside a conditional statement, so that
        // we do not create loads of progress bars.
        if ($("#progress-bar-container").length < 1) {
            var element = $("<div>").attr({
                "id": "progress-bar-container"
            }).appendTo("body");
            self.monitor = new ProgressBar ({ parentElement: element });
            self.monitor.createBar();
        }
        // Calculate upload progress
        var completed = 0;
        if (event.lengthComputable) {
            // The uploading process is only part
            // one of the whole process in this
            // example, that also includes server
            // side computation. Therefore, divide
            // this status by two, and handle the
            // rest of it through the onDownload function.
            completed = Math.round((event.loaded / event.total * 1000) / 10 / 2);
            self.monitor.setProgress(completed);
        }
    }

    /**
     * Override Dropster's default function onDownload function,
     * for when the server sends information back.
     *
     * @param   progressEvent
     */
    $.fn.onDownload = function (event) {
        // onDownload will monitor the response from the server,
        // for example if the server is streaming information
        // back in real time. In this example, we will assume
        // the server is sending back information about the
        // images, one by one as they are being processed.
        var totalSizeToLoad = this.totalSizeToLoad;
        var currentProgress = this.monitor.getProgress();
        // Calculate the percental of each item uploaded and
        // add it to the current progress of the progress bar.
        var completed = (Math.round((1 / totalSizeToLoad * 1000) / 10 / 2) + currentProgress);
        // Set the new status of the progress bar.
        this.monitor.setProgress(completed);
    }
```
### Author
* Dropster was created by Ardalan Samimi.
