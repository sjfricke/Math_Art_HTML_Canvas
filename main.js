var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var HALF_H = SCREEN_HEIGHT / 2;
var HALF_W = SCREEN_WIDTH / 2;

var container, canvas, context;
var mouseX, mouseY;

// starts in middle of screen
var currentX = HALF_W;
var currentY = HALF_H;
var lastX = 0;
var lastY = 0;
// constants
var sigma = 10.0;
var rho = 28.0;
var beta = 8.0/3.0;

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
    //window.addEventListener('mousedown', onWindowMouseDown, false);
}
var state0 = [1,1,1];
function Lorenz(state) {
  // unpack the state vector
  x = state[0]
  y = state[1]
  z = state[2]

  // these are our constants
  sigma = 10.0
  rho = 28.0
  beta = 8.0/3.0

  // compute state derivatives
  xd = sigma * (y-x)
  yd = (rho-z)*x - y
  zd = x*y - beta*z

  // return the state derivatives
  return [xd, yd, zd]
}


var x = 0.1; 
var y = 0;
var z = 0; 
var a = 10.0;
var b = 28.0;
var c = 2.7;
var t = 0.01; 
var m = 11;
var red = 0;
var blue = 0;
var green = 0;
var color_stage = 0;

function render() {
    
    if (color_stage == 0) {
        if (red >= 255) {
            color_stage = 1;
        } else {
            red++;
        }
    } else if (color_stage == 1) {
        if (green >= 255) {
            color_stage = 2;
        } else {
            green++;
        }
    } else if (color_stage == 2) {
        if (blue >= 255) {
            color_stage = 3;
        } else {
            blue++;
        }
    } else if (color_stage == 3) {
        if (red <= 0) {
            color_stage = 4;
        } else {
            red--;
        }
    } else if (color_stage == 4) {
        if (green <= 0) {
            color_stage = 5;
        } else {
            green--;
        }
    } else {
        if (blue <= 0) {
            color_stage = 0;
        } else {
            blue--;
        }
    }
    
    
    
    var xt = x + t * a * (y - x);
    var yt = y + t * (x * (b - z) - y);
    var zt = z + t * (x * y - c * z);
    x = xt;
    y = yt;
    z = zt;
    
    currentX = x;
    currentY = y;
    
//    state0 = Lorenz(state0);
//    
//    currentX = state0[0];
//    currentY = state0[1];
    
    
    // var s = -2;
    //context.drawImage( canvas, -s, -s, SCREEN_WIDTH + 2 * s, SCREEN_HEIGHT + 2 * s ); //redraw last frame
    
//    context.fillStyle = "rgba(0, 25, 25, 0.05)";
//    context.fillRect (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    context.fillStyle = "#ff8";
    context.beginPath();
    
    context.strokeStyle="rgb(" + red + "," + green + "," + blue + ")";
    
    context.moveTo((lastX * m) + HALF_W, (lastY * m) + HALF_H);
    context.lineTo((currentX * m )+ HALF_W, (currentY * m) + HALF_H);
    context.stroke();    
    
    //console.log("X: " + currentX + "  Y: " +currentY);
    
    lastX = currentX;
    lastY = currentY;
    
    context.closePath();
    
    
    animate(); //called last to run animation loop
}
    
init(); // Starts program
