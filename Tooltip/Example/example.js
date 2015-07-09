$(document).ready(function() {


    $("input[type=submit]").click(function (event) {
        // Prevent the submit for now.
        event.preventDefault();
        var emptyElements = [];
        // Gather all the elements marked with
        // the 'required' attribute and check.
        var parent = $(this).parent();
        var requiredElements = parent.find("[required]");
        $.each(requiredElements, function(index, element) {
            if ($(element).val() === '')
                emptyElements.push($(element));
        });
        // If one of the required elements is
        // empty throw an error and cancel the
        // form submit.
        if (emptyElements.length > 0) {
            var tooltip = new Tooltip({
                "label": "Please fill out this field",
                "fadeOut": 5000,
                "element": emptyElements[0].parent()
            }, true);
            // No need to continue if we have
            // found an error.
            return false;
        } else {
            // If all checks out, submit the
            // damned form, already!
            parent.submit();
        }
    });

});
