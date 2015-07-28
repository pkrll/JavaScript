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

    Salvation = function (element, options) {
        this.element = element;
        this.settings = $.extend({
            "label": "Please fill out this field",
            "direction": "left",
            "fadeOut": null,
            "element": null
        }, options || {});

        this.bindEvents();

    }

    Salvation.prototype = {
        bindEvents: function () {
            var self = this;
            // Bind the submit
            self.element.on("submit", function (event) {

                var numericElements = self.element.find("[data-format='numeric']");
                $.each(numericElements, function (i, el) {
                    var value = $(el).val();
                    if (!$.isNumeric(value))
                        console.log("NO");
                });

                // Gather all the elements marked with
                // the 'required' attribute and check
                // if their values are set.
                var emptyElements       = [];
                var requiredElements    = self.element.find("[required]");
                $.each(requiredElements, function (i, el) {
                    if ($(el).val() === '' || $(el).val().length < 1)
                        emptyElements.push($(el));
                });
                // If there are required elements not
                // set, delay the submit and show warning.
                if (emptyElements.length > 0) {
                    event.preventDefault();
                    self.showTooltip(emptyElements[0]);
                    self.highlightElements(emptyElements);
                }

                return false;
            });
        },

        highlightElements : function (elements) {
            $.each(elements, function (i, el) {
                $(el).addClass("salvation-active");
            });
        },

        showTooltip: function (element) {
            var ancestorDiv = $("<div>");
            // Create the tooltip elements
            var tooltipBox      = ancestorDiv.clone().attr({
                "class": "salvation-box " + this.settings.direction
            });
            var tooltipArrow    = ancestorDiv.clone().attr({
                "class": "salvation-arrow " + this.settings.direction}
            );
            var tooltipLabel    = ancestorDiv.clone().attr({
                "class": "salvation-label " + this.settings.direction
            }).html(this.settings.label);

            if (this.settings.direction == "left" || this.settings.direction == "bottom") {
                tooltipLabel.appendTo(tooltipBox);
                tooltipArrow.appendTo(tooltipBox);
                tooltipBox.appendTo($(element).parent());
                var offset = tooltipBox.offset();

                if (this.settings.direction == "left") {
                    tooltipBox.offset({
                        left:   (offset.left - tooltipBox.width()) - 10
                    });
                } else if (this.settings.direction == "bottom") {
                    tooltipBox.offset({
                        top:    offset.top - (element.height() * 2) - 10
                    });
                }
            } else {
                tooltipArrow.appendTo(tooltipBox);
                tooltipLabel.appendTo(tooltipBox);
                tooltipBox.appendTo($(element).parent());
            }

            // If the fadeout option is set, then
            // fade it out after the given time.
            // Otherwise, make it clickable to let
            // the user remove it.
            if ($.isNumeric(this.settings.fadeOut))
                tooltipBox.delay(this.settings.fadeOut).fadeOut("slow");
            tooltipLabel.click(function () {
                tooltipBox.remove();
            });
        }
    }

    $.fn.salvation = function (options) {
        return new Salvation(this, options);
    }

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
