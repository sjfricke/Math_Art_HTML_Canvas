// slope intercet
    // y = slope * x + SCREEN_HEIGHT
// standard form
    // ( SCREEN_HEIGHT * x ) + ( SCREEN_WIDTH * y ) - ( SCREEN_WIDTH * SCREEN_HEIGHT ) = 0

// orthagonal normal is opposite recipical
var slope = - (SCREEN_HEIGHT / SCREEN_WIDTH);
var normal_slope = -1 / slope;


// used to see which half of triangle its in
// this allows all calulations to be done on one side
function inTopHalf(x, y){
    return (SCREEN_WIDTH * y) +(SCREEN_HEIGHT * x) - (SCREEN_WIDTH * SCREEN_HEIGHT) < 0;
}

// used to reflect point across the y=-x line
// returns x,y object
function reflectCoord(x, y) {
    var distance = distanceFromPoint( ( SCREEN_HEIGHT * x ), ( SCREEN_WIDTH * y ),  (-1 * SCREEN_WIDTH * SCREEN_HEIGHT ), x, y);
        
    // y = normal_slope * x + b
    var normal_intersect = y - (normal_slope * x);
    
    cross_x = (normal_intersect - SCREEN_HEIGHT) / (slope - normal_slope);
    cross_y = cross_x * normal_slope + normal_intersect;
    
    //times 2 distance
    var vectorX = 2 * (cross_x - x);
    var vectorY = 2 * (cross_y - y);
    
    return {
        x: x + vectorX, 
        y: y + vectorY
    }
}

// finds distance from line (standard form) to point
function distanceFromPoint(a, b, c, x, y) {
    return Math.abs( (a * x) + (b * y) + c) / Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2));
}