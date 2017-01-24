// Screen constants
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var HALF_H = SCREEN_HEIGHT / 2;
var HALF_W = SCREEN_WIDTH / 2;

// html canvas objects
var container, canvas, context;

//holds n coords
var currentCoord = {
    x1 : 0,
    y1 : 0,
    x2 : 0,
    y2 : 0
}

// holds n-1 coords
var lastCoord = {
    x1 : 0,
    y1 : 0,
    x2 : 0,
    y2 : 0
}

// used to debug if on screen with a dot
function drawDot(x,y, radius) {
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);    
    context.fillStyle = current_color;
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
       
    window.addEventListener('mousedown', onWindowMouseDown, false);
}

// getter for random color selections
var current_color;
function color_selector() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    
    current_color = "rgb(" + Math.floor(red * 1.3) + "," + Math.floor(green * 1.3) + "," + Math.floor(blue * 1.3) + ")";
    
    var my_gradient=context.createLinearGradient(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);
    my_gradient.addColorStop(0,"white");
//    my_gradient.addColorStop(0.5,"rgb(" + red + "," + green + "," + blue + ")");
//  
    my_gradient.addColorStop(.5,current_color);
    my_gradient.addColorStop(1,"white");
    
    current_color = my_gradient;
}

// frame calculations
function render() {
    
    if (drawing_count >= drawing_limit) {        
        drawing = false; //lets mouseDown to happen again
        return;
    } else {        
        drawing_count++;           
        // draws dots from this frame
        currentCoord.x1 = (-1 + lastCoord.x1 + Math.random() * 25 * (Math.random() < 0.5 ? -1 : 1));
        currentCoord.y1 = (-1 + lastCoord.y1 + Math.random() * 25 * (Math.random() < 0.5 ? -1 : 1));
        var flipped = reflectCoord(currentCoord.x1, currentCoord.y1);
        currentCoord.x2 = flipped.x;
        currentCoord.y2 = flipped.y;
	var radius = Math.random() * 20;
        drawDot(currentCoord.x1, currentCoord.y1, radius);
        drawDot(currentCoord.x2, currentCoord.y2, radius);
        
        //sets n-1
        lastCoord.x1 = currentCoord.x1;
        lastCoord.y1 = currentCoord.y1;
        lastCoord.x2 = currentCoord.x2;
        lastCoord.y2 = currentCoord.y2;
        
        animate(); //called last to run animation loop                
    }
}
    
init(); // Starts program
