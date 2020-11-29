var sketch = require('sketch');
var doc = require('sketch/dom').getSelectedDocument();
var Rectangle = require('sketch/dom').Rectangle;

export default function(context) {

    var document, svgCode, OK, READY_TO_Insert, CANCELLED, NOT_READY;

    initialise(context);

	userInterfaceLoop();

	function initialise(context) {
        svgCode = "";
        OK = 1000;
        READY_TO_Insert = true;
        CANCELLED = false;
        NOT_READY = null;
	}

    // Keep displaying the user interface until we've either cancelled or clicked search
	function userInterfaceLoop() {

        var uiResponse = NOT_READY;

        while (uiResponse === NOT_READY) {

            // Creatte the interface
            var modal = createUserInterface();

            // Show it and process the form
            uiResponse = processButtonClick(modal, modal.runModal());

            // Process the response
            switch (uiResponse) {

                // Reload the interface
                case NOT_READY:
                    alert("Input content cannot be blank");
                    break;

                // Let's go
                case READY_TO_Insert:
                    doInsertSVG();
                    break;

                // Cancelled
                case CANCELLED:
                    break;
            }
        }
    }


    function createUserInterface() {

        // Create modal window
        var userInterface = COSAlertWindow.new();

        // Text for modal
        userInterface.setMessageText("SVG Insert");
        userInterface.setInformativeText("Use this plugin to help you save time from copy a svg graph on web into sketch. Just paste the svg xml code into the input frame below and click OK,the svg graph will be inserted into the artboard.");

        // Svg Code input
        var svgCode = createTextField("", "Paste svg xml code here, like <svg ... /></svg>", NSMakeRect(0, 0, 280, 120));
        userInterface.addAccessoryView(svgCode);

        // OK and cancel buttons
        userInterface.addButtonWithTitle('OK');
        userInterface.addButtonWithTitle('Cancel');

        // Return the Modal structure
        return userInterface;
    }

    function createTextField(value, placeholder, frame) {
		var textfield = NSTextField.alloc().initWithFrame(frame)
		textfield.setStringValue(value);
		if (placeholder) textfield.setPlaceholderString(placeholder);

		return textfield
	}

    // Processes the result of the UI
    function processButtonClick(modal, buttonClick) {

        var result;

        // We're only concerned if the replace all button has been clicked
        if (buttonClick === OK) {

            // Grab the data from the form
            svgCode = modal.viewAtIndex(0).stringValue();


            // Make sure we have svg to insert
            if (svgCode != "") {

                // Yeah, ready to go
                result = READY_TO_Insert;

            } else {

                // Need something in input
                result = NOT_READY;

            }

        } else {

            // Cancel button pressed
            result = CANCELLED;

        }

        return result;
    }

    function parentOffsetInArtboard(layer) {
        var offset = {x: 0, y: 0};
        var parent = layer.parent;
        while (parent.name && parent.type !== 'Artboard') {
          offset.x += parent.frame.x;
          offset.y += parent.frame.y;
          parent = parent.parent;
        }
        return offset;
    }

	function positionInArtboard(layer, x, y) {
        var parentOffset = parentOffsetInArtboard(layer);
        var newFrame = new Rectangle(layer.frame);
        newFrame.x = x - parentOffset.x;
        newFrame.y = y - parentOffset.y;
        layer.frame = newFrame;
    }

    function doInsertSVG() {
		var svgString = NSString.stringWithString(svgCode);
        var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
        console.log(svgData);

		var svgImporter = MSSVGImporter.svgImporter();
		svgImporter.prepareToImportFromData(svgData);
		var svgLayer = svgImporter.importAsLayer();

		svgLayer.setName('SVG Layer');
        context.document.currentPage().addLayers([svgLayer]);

        var layer = doc.getLayersNamed('SVG Layer').pop();
        var canvasView = context.document.contentDrawView();
        var center = canvasView.viewCenterInAbsoluteCoordinatesForViewPort(canvasView.viewPort());
        var shiftX = layer.frame.width / 2;
        var shiftY = layer.frame.height / 2;
        var centerX = center.x - shiftX;
        var centerY = center.y - shiftY;

        positionInArtboard(layer, centerX, centerY);
		context.document.showMessage("🎉 SVG inserted!");
    }

    // Show a small alert dialog
    function alert(message) {

        // Create the dialog
        var alertDialog = COSAlertWindow.new();

        // Add a title, message and button
        alertDialog.setMessageText("SVG Insert - Error");
        alertDialog.setInformativeText(message);
        alertDialog.addButtonWithTitle("OK");

        // And show it
        alertDialog.runModal();
    }
}
