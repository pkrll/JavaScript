$(document).ready(function() {
	
	$("span.create").click(function() {
		// Create the Progress bar object and
		// set the parent element in which the
		// the progress bar should appear.
		statusbar = new ProgressBar({
			color: '#0A0',
			parentElement: $("#progress-bar-container")
		}, function () { 
			// Custom callback function, sets
			// the label
			this.setLabel("Custom done function!");
		});
	});
	
	$("span.run").click(function() {
		for (var i = 0; i<101; i++) {
			statusbar.setProgress(i);
		}
		
	});
	
});
