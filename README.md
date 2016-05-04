# dimension_line

Dimension line

Draw a dimension line on canvas e.g. <--------13"5/16-------->

angle - the angle θ in radians from shaft to one side of arrow head

length - the distance d in pixels from arrow point back along the shaft to the back of the arrow head

style - (0 - 4) type of head to draw 

Example

	var angle = Math.PI/8;
	var length = 10;
	var style = 2;
	// starting point (x1, y1) of dimension line
	var x1 = 35;
	var y1 = 75;
	// ending point (x2, y2) of dimension line
	var x2 = 25;
	var y2 = 249;
	var label = '12"15/16';
	// Initialize a dimension line with a given angle, length, and style
	var dimension_line = new DimensionLine(angle, length, style);
	// Draw the line using the given coordinates and label
	dimension_line.draw(x1, y1, x2, x2, label);

Arrowheads based on http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html
