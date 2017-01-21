
//window.addEventListener('mousedown', onWindowMouseDown, false);
function onWindowMouseDown(event) {
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    branches.push(new Branch(mouseX, mouseY, 1000));
}