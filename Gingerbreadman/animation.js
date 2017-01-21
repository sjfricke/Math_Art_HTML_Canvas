/* Animation Looping setup and excectuion */
var animationReq;

// animate calls for AnimationFrame until cancel passed
function animate(cancel) {
    if (cancel) {
        cancelAnimationFrame(animationReq);
    } else {        
        animationReq = requestAnimationFrame(render);
    }
}
