/* Animation Looping setup and excectuion */
var ANIMATE_COUNT = 0; //used to limit number of animation loops
var animationReq;

function animate() {
    if (ANIMATE_COUNT > 200000) {
        cancelAnimationFrame(animationReq);
    } else {
        // need to make sure render is defined before first animation call
        ANIMATE_COUNT++;
        animationReq = requestAnimationFrame(render);
    }
}
