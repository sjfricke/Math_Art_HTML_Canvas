// Screen constants
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var HALF_H = SCREEN_HEIGHT / 2;
var HALF_W = SCREEN_WIDTH / 2;

// html canvas objects
var container, canvas, context;

// starts in middle of screen
var current = {
    x : HALF_W,
    y : HALF_H
}
var last = {
    x : 0,
    y : 0
}

function drawDot(x,y) {
    context.beginPath();
    context.arc(x,y,5,0,2*Math.PI);
    context.fill();
    context.stroke();
}

// used to start the html cavnas setup
function init() {

    // set up html canvas object
    container = document.getElementById('container');
    
    canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    container.appendChild(canvas);

    // using html canvas instead of webgl
    context = canvas.getContext("2d");
    context.fillStyle = "rgba(255,255,255, 1)"; // need something to "fill" init screen
    context.fillRect (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
       
    render();
    
    window.addEventListener('mousedown', onWindowMouseDown, false);
}

// getter for random color selections
function color_selector() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    
    return "rgb(" + red + "," + green + "," + blue + ")";
}

// frame calculations
function render() {
             
//    context.beginPath();
//    
//    context.strokeStyle = color_selector();
//    
//    context.moveTo();
//    context.lineTo();
//    context.stroke();    
//        
//    lastX = currentX;
//    lastY = currentY;
//    
//    context.closePath();    
//    
//    animate(); //called last to run animation loop
}
    
init(); // Starts program
