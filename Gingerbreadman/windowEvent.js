//drawing globals
var drawing = false;
var drawing_count = 0;
var drawing_limit = 0;

function onWindowMouseDown(event) {
    
    lastCoord.x1 = event.clientX;
    lastCoord.y1 = event.clientY;
    
    // checks if drawing is in place and returns if it is
    if (drawing) { 
        return;
    } else {
        color_selector() // set color
        // set drawing globals
        drawing_count = 0;
        drawing_limit = Math.random() * 100;
        drawing = true;
    }
    // gets flipped side and then sends to draw
    var flipped = reflectCoord(lastCoord.x1, lastCoord.y1);
    lastCoord.x2 = flipped.x;
    lastCoord.y2 = flipped.y;
    
    render();

    //console.log("mouse x: " + mouseX + " y: " + mouseY );
    //console.log("flip x: " + flipped.x + " y: " + flipped.y );
    
}
