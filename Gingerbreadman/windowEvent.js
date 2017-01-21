
function onWindowMouseDown(event) {
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    if (inTopHalf(mouseX, mouseY)) {
        drawDot(mouseX, mouseY);
    } else {
        
        var flipped = reflectCoord(mouseX, mouseY);
        
        console.log("mouse x: " + mouseX + " y: " + mouseY );
        console.log("flip x: " + flipped.x + " y: " + flipped.y );
        
        drawDot(flipped.x, flipped.y);
    }
}
