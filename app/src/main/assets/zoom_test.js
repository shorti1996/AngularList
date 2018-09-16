// function myFunction(event) {
//     Android.logg("AASASASA");
//     var scale = 1.5;
//     $("#header").css({
//         transform: "scale(" + scale + ")"
//       });
// }

function contentTouch(event) {
  setTimeout(function() {
    // Android.logg("contentTouch");
    // Android.logg("" + event.targetTouches[0].target);
    console.log(event.targetTouches[0].target);
    var touchTarget = $(event.targetTouches[0].target);
    var currentZoom = touchTarget.attr("zoom");
    console.log("currentZoom: " + currentZoom);
    var newZoom = parseFloat(currentZoom) + 0.1;
    console.log("newZoom: " + newZoom);
    touchTarget.attr("zoom", newZoom);
    touchTarget[0].style.transform = 'scale(' + newZoom + ')';

    var targetBounds = $(event.targetTouches[0].target)[0].getBoundingClientRect();
    touchTarget.parent().css("height", targetBounds.height);

    e.stopPropagation();
  }, 0);

}
