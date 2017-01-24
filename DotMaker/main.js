// The FUN Variables
// NOTE: High ball count and radius will go into an infinite loop, HTML Canvas responsibly!
var BALL_COUNT = 4000;
var BALL_RADIUS = 24; //just a factor to go with a random multipler
var RADIUS_MIN = 3; // prevents balls from getting too small


// Screen constants
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var HALF_H = SCREEN_HEIGHT / 2;
var HALF_W = SCREEN_WIDTH / 2;

// html canvas objects
var container, canvas, context;

var DOT_LIST = [];

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

// used to draw circle with
function drawDot(x, y, radius, color) {

    if (!radius) {
        radius = Math.random() * 5;
    }

    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = color || "white";
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
    initDot();

    render();

    window.addEventListener('mousedown', onWindowMouseDown, false);
}

// getter for random color selections
var current_color;
function color_selector() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    current_color = "rgb(" + Math.floor(red * 1.3) + "," + Math.floor(green * 1.3) + "," + Math.floor(blue * 1.3) + ")";

    var my_gradient=context.createLinearGradient(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    my_gradient.addColorStop(0,"white");
    my_gradient.addColorStop(.5,current_color);
    my_gradient.addColorStop(1,"white");

    current_color = my_gradient;
}

// frame calculations
function render() {

   for (var i = 0; i < DOT_LIST.length; i++) {
       drawDot(DOT_LIST[i].x, DOT_LIST[i].y, DOT_LIST[i].radius, DOT_LIST[i].color);
   }

    //animate(); //called last to run animation loop

}

// initializes CIRCLE_LIST with circles
function initDot() {
    var i, j;
    var valid = false;
    for (i = 0; i < BALL_COUNT; i++) {
        //console.log("debug "  + i);
        var dot_t = {}; // need to prevent copying of the object
        // gives the dot a init random value
        dot_t.x = Math.random() * SCREEN_WIDTH;
        dot_t.y = Math.random() * SCREEN_HEIGHT;
        dot_t.radius = Math.random() * BALL_RADIUS;
        dot_t.color = "rgb(" + Math.floor((Math.random() * 255) * 1.3) + ","
            + Math.floor((Math.random() * 255) * 1.3) + ","
            + Math.floor((Math.random() * 255) * 1.3) + ")";

        while (!checkDot(dot_t.x, dot_t.y, dot_t.radius)) {
            dot_t.x = Math.random() * SCREEN_WIDTH;
            dot_t.y = Math.random() * SCREEN_HEIGHT;
            dot_t.radius = Math.random() * BALL_RADIUS;
        }

        DOT_LIST.push(dot_t);

    } //main for

} //initDot

function checkDot(x, y, radius) {

    if (radius < RADIUS_MIN) {
        return false;
    }

    // checks in bond first before wasting time checking each circle
    if (!dotInBound(x, y, radius)) {
        return false;
    }

    // prevents infinite loop on first item
    if (DOT_LIST.length == 0) {
        return true;
    }


    // tedious inner for loop to compare against each other circle
    for (var j = 0; j < DOT_LIST.length; j++) {
        if (dotIntersect(x, y, radius, DOT_LIST[j].x, DOT_LIST[j].y, DOT_LIST[j].radius)) {
            return false;
        }

        if (!insideCheck(x, y, radius, DOT_LIST[j].x, DOT_LIST[j].y, DOT_LIST[j].radius)) {
            return false;
        }
    }

    return true;
}

init(); // Starts program
