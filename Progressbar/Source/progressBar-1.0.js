/*
 * Javascript plugin
 * Progress bar 1.0
 *
 * A simple Javascript plugin for implementing a
 * HTML5 progress bar element that will display 
 * the progress of tasks like uploads, downloads 
 * and other functions involving progress.
 *
 * @version 1.0
 * @author Ardalan Samimi
 */
(function($) {
	/**
	 * Initialize the ProgressBar object 
	 * with option to change the default
	 * settings such as color of bar and
	 * the parent.
	 */
	ProgressBar = function (settings, onComplete) {
		// Auto-instantiates if the object was
		// not called with the new-keyword.
		if (this instanceof ProgressBar) {
			// Sets the complete callback function
			// to either user defined or default.
			this.onComplete = onComplete || this.onCompleteDefault();
			// The default settings can be changed
			// either when the creating the object
			// or by calling the set-functions.
			this.settings = $.extend({
				"color": '#0F0',
				"parentElement": false
			}, settings || {});
			// Create the bar if a parent
			// element is set.
			if (this.settings.parentElement !== null) {
				this.createBar();
			};
		} else {
			return new ProgressBar (settings);
		}
	};

	ProgressBar.prototype = {
		// Set the color of the bar
		setColor: function (color) {
			this.settings.color = color;
		},
		// Set which element to house
		// the progress bar element
		setElement: function (element) {
			this.settings.parentElement = element;
			this.createBar();
		},
		// Creates the progress bar element
		createBar: function () {
			if (this.settings.parentElement === false)
				return this.createErrorMessage("No parent element set!");
			// This is the container in
			// which the bar resides
			this.progressBar = $("<progress>").attr({
				"id": "progress-bar",
				"value": 0,
				"max": 100
			}).appendTo(this.settings.parentElement);
			this.progressLabel = $("<div>").attr({
				"id": "progress-bar-label"
			}).html("0%").appendTo(this.settings.parentElement);
		},
		// Animates the progress bar
		setProgress: function (progress) {
			var _this = this;
			this.progressBar.animate({
				value: progress
			}, 1, function() {
				_this.onProgress(progress);
			});
		},
		// Sets the text of the bar
		setLabel: function (text) {
			var text = text || "";
			this.progressLabel.html(text);
		},
		// The callback function on animate
		onProgress: function (progress) {
			if (progress < 100) {
				this.setLabel(progress + "%");
			} else {
				this.onComplete();
			}
		},
		// The callback function on done
		onCompleteDefault: function () {
			this.progressBar.html("Done!");
		},
		// Error handling
		createErrorMessage: function (errorMessage) {
			var errorMessageElement = $("<div>").attr({"id": "errorMessage"}).html(errorMessage).appendTo($("body"));
			errorMessageElement.click(function() {
				$(this).remove();
			});
			
			return false;
		}
	};
})(jQuery);