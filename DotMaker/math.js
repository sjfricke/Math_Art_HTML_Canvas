// quickly checks if two circles cross
// TRUE if intersect
function dotIntersect(x1, y1, r1, x2, y2, r2) {
    if ( (Math.pow((r1-r2), 2)) <=  (Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))  &&  
         (Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2)) <= (Math.pow((r1+r2), 2) )  ) {
        return true;
    } else {
        return false;
    }
}

// used to see if circle are in canvas
// TRUE if in bond
function dotInBound(x, y, r) {
    return ( ((x - r) > 0) && ((x + r) < SCREEN_WIDTH) && ((y + r) < SCREEN_HEIGHT ) && ((y - r) > 0) );
}

// Returns true if they are not inside
function insideCheck(x1, y1, r1, x2, y2, r2) {
    var distance = Math.sqrt( Math.pow( (x2-x1), 2 )  + Math.pow( (y2-y1), 2 ) );
    if ( (r1 + r2) > distance) {
        return false;
    } else {
        return true;
    }
}