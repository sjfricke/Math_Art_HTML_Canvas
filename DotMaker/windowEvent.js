function onWindowMouseDown(event) {
    
    currentCoord.x1 = event.clientX;
    currentCoord.y1 = event.clientY;
    
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
    var flipped = reflectCoord(currentCoord.x1, currentCoord.y1);
    currentCoord.x2 = flipped.x;
    currentCoord.y2 = flipped.y;
    
    render();

    //console.log("mouse x: " + mouseX + " y: " + mouseY );
    //console.log("flip x: " + flipped.x + " y: " + flipped.y );
    
}
