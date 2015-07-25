## ProgressBar
Create HTML5 progress bar elements with the ProgressBar plugin, that will display the progress of tasks like uploads, downloads and other functions involving progress.

#### Usage
* Include the necessary files (including the jQuery 2 library).
* Create the container for the progress bar, either dynamically or statically, as follows below:

```html
<div id="progress-bar-container">
    <!-- The progress bar will be created here -->
</div>
```

```js
    // Create the progress bar object and set the
    // parent element, in which the bar should appear.
    var progressBar = new ProgressBar({
        parentElement: $("#progress-bar-container")
    }, function () {
        // Custom callback function when operation is done
        this.setLabel("Custom done function goes here!");
    });
    // To set the progress, use:
    progressBar.setProgress(i);
    // To get the current progress value, use:
    progressBar.getProgress();
    // To remove the progress bar, use:
    progressBar.remove();
```

![Screenshot](https://github.com/pkrll/JavaScript/blob/master/Progressbar/progressbar.png)

### Example usage
See the example folder for an example on how to use it.

### More to come
This is a work in progress.

### Author
* ProgressBar was created by Ardalan Samimi.
