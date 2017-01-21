/* Animation Looping setup and excectuion */
var ANIMATE_COUNT = 0; //used to limit number of animation loops
var AMINATE_LIMIT = 200000; // limit frames to draw
var animationReq;

// animate calls for AnimationFrame as long as within Aminate Frame Limit set
function animate() {
    if (ANIMATE_COUNT > AMINATE_LIMIT) {
        cancelAnimationFrame(animationReq);
    } else {
        // need to make sure render is defined before first animation call
        ANIMATE_COUNT++;
        animationReq = requestAnimationFrame(render);
    }
}
