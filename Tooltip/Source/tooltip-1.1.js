/*
 * Javascript plugin
 * Tooltip
 *
 * Add small tooltips below
 * HTML elements.
 *
 * @version 1.1
 * @author Ardalan Samimi
 */
(function ($) {
    Tooltip = function (settings, reset) {
        // Check if object was called
        // with the 'new' keyword.
        if (this instanceof Tooltip) {
            // Set reset option
            var reset = reset || false;
            this.reset = reset;
            // Set the settings
            this.settings = $.extend({
                "label": "",
                "arrow": "top",
                "fadeOut": null,
                "element": null
            }, settings || {});
            // Create the tooltip
            this.setTooltip();
        } else {
            return new Tooltip (settings, reset);
        }
    }

    Tooltip.prototype = {
        // Create the tooltip
        setTooltip: function () {
            // Remove the other tooltips
            // if it was requested.
            if (this.reset !== false)
                this.resetTooltip();
            // Create the tooltip elements
            var container = $("<div>").attr({
                "class": "error-label-container"
            }).appendTo(this.settings.element);
            var arrow = $("<div>").attr({
                "class": "error-label-arrow-" + this.settings.arrow
            }).appendTo(container);
            var label = $("<div>").attr({
                "class": "error-label"
            }).html(this.settings.label).appendTo(container);
            // Set the red glow around the input
            this.settings.element.addClass("tooltip-active");
            // If the fadeout option is set, then
            // fade it out after the given time.
            // Otherwise, make it clickable to let
            // the user remove it.
            if ($.isNumeric(this.settings.fadeOut))
                container.delay(this.settings.fadeOut).fadeOut("slow");
            label.click(function () {
                $(this).parent().remove();
            });
        },
        // If reset option is on, then all the other
        // tooltips should be removed.
        resetTooltip: function () {
            $(".error-label-container").remove();
            $(".tooltip-container").removeClass("tooltip-active");
        }
    }

})(jQuery);
