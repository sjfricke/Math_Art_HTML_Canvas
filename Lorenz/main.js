// Screen constants
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var HALF_H = SCREEN_HEIGHT / 2;
var HALF_W = SCREEN_WIDTH / 2;

// html canvas objects
var container, canvas, context;

// starts in middle of screen
var currentX = HALF_W;
var currentY = HALF_H;
var lastX = 0;
var lastY = 0;


// Lorenz constants
    // starting x, y, z coordnites
var lorenz_x = 0.1; 
var lorenz_y = 0;
var lorenz_z = 0; 
    // starting parameters
var sigma = 10.0;
var rho = 28.0;
var beta = 2.7;
var t = 0.01; 
    // used to zoom in  drawing
var zoom = 11;
    // starting colors
var lorenz_red = 0;
var lorenz_blue = 0;
var lorenz_green = 0;
var color_stage = 0;

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
}

// state machine for the coloring
function color_fsm() {
    if (color_stage == 0) {
        if (lorenz_red >= 255) {
            color_stage = 1;
        } else {
            lorenz_red++;
        }
    } else if (color_stage == 1) {
        if (lorenz_green >= 255) {
            color_stage = 2;
        } else {
            lorenz_green++;
        }
    } else if (color_stage == 2) {
        if (lorenz_blue >= 255) {
            color_stage = 3;
        } else {
            lorenz_blue++;
        }
    } else if (color_stage == 3) {
        if (lorenz_red <= 0) {
            color_stage = 4;
        } else {
            lorenz_red--;
        }
    } else if (color_stage == 4) {
        if (lorenz_green <= 0) {
            color_stage = 5;
        } else {
            lorenz_green--;
        }
    } else {
        if (lorenz_blue <= 0) {
            color_stage = 0;
        } else {
            lorenz_blue--;
        }
    }
}

// frame calculations
function render() {
    
    color_fsm(); //set colors  
    
    // gets next frames coordinates
    var xt = lorenz_x + t * sigma * (lorenz_y - lorenz_x);
    var yt = lorenz_y + t * (lorenz_x * (rho - lorenz_z) - lorenz_y);
    var zt = lorenz_z + t * (lorenz_x * lorenz_y - beta * lorenz_z);
    lorenz_x = xt;
    lorenz_y = yt;
    lorenz_z = zt;
    
    currentX = lorenz_x;
    currentY = lorenz_y;
        
    context.beginPath();
    
    context.strokeStyle="rgb(" + lorenz_red + "," + lorenz_green + "," + lorenz_blue + ")";
    
    context.moveTo((lastX * zoom) + HALF_W, (lastY * zoom) + HALF_H);
    context.lineTo((currentX * zoom )+ HALF_W, (currentY * zoom) + HALF_H);
    context.stroke();    
        
    lastX = currentX;
    lastY = currentY;
    
    context.closePath();    
    
    animate(); //called last to run animation loop
}
    
init(); // Starts program
