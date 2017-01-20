var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container, canvas, context;
var branches, mouseX, mouseY;

init();
setInterval(loop, 1000/60);

function init() {

    // set up html canvas object
    container = document.getElementById('container');
    
    canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    container.appendChild(canvas);

    // using html canvas instead of webgl
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(0, 0, 0, 0.1)"; // need something to "fill" init screen
    context.fillRect (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    branches = new Array();
    
    //window.addEventListener('mousedown', onWindowMouseDown, false);
}

function onWindowMouseDown(event) {
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    branches.push(new Branch(mouseX, mouseY, 1000));
}

function loop() {
    
    var s = -2, pi2 = Math.PI * 2;
    
    context.drawImage( canvas, -s, -s, SCREEN_WIDTH + 2 * s, SCREEN_HEIGHT + 2 * s );
    
    context.fillStyle = "rgba(0, 25, 25, 0.05)";
    context.fillRect (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    context.fillStyle = "#ff8";
    context.beginPath();
    
    for (var i = 0; i < branches.length; i++) {
	
	var branch = branches[i],
	    speed = branch.speed,
	    life = branch.life ++,
	    max_life = branch.max_life,
	    rw = branch.rw += Math.random() - .5,
	    x = branch.x += Math.cos(rw) * speed,
	    y = branch.y += Math.sin(rw) * speed;
	
	context.moveTo(x, y);
	context.arc(x, y, 5, 0, pi2, true); 
	
	if (life > max_life || x < 0 || y < 0 || x > SCREEN_WIDTH || y > SCREEN_HEIGHT) {
	    
	    branches.splice(i,1);
	    
	}
	
	if (Math.random() > 0.9 && branches.length < 1000) {
	    
	    branches.push(new Branch(x, y, max_life / 10));
	    
	}
    }
    
    context.fill();
    context.closePath();
}

var Branch = function(x, y, max_life) {
    
    this.life = 0;
    this.max_life = max_life;
    this.speed = Math.random() + 2;
    this.x = x;
    this.y = y;
    this.rw = Math.random() * 360;
}
		
