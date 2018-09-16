// function myFunction(event) {
//     Android.logg("AASASASA");
//     var scale = 1.5;
//     $("#header").css({
//         transform: "scale(" + scale + ")"
//       });
// }

var touches = 0;

// function contentStart(event) {
//   touches++;
//   console.log("contentStart, touches: " + touches);
// }
//
// function contentEnd(event) {
//   touches--;
//   console.log("contentEnd, touches: " + touches);
// }

$(document).ready(function() {
	var scroll_zoom = new ScrollZoom($('.zoomer'), 4, 0.5);
});


function ScrollZoom(container, max_scale, factor) {
	var target = container.children().first();
	var size = {w:target.width(), h:target.height()};
	var pos = {x:0, y:0};
	var zoom_target = {x:0, y:0};
	var zoom_point = {x:0, y:0}
	var scale = 1;
	target.css('transform-origin','0 0');
	// target.on("mousewheel DOMMouseScroll", scrolled);
  target.on("touchmove", scrolled);

	function scrolled(ev){

    // if (ev.targetTouches.length == 1) {
    //   return;
    // }

    if (ev.targetTouches.length == 2) {
      var touchTarget = $(event.targetTouches[0].target);


  		var offset = container.offset();
  		zoom_point.x = event.targetTouches[0].pageX - offset.left;
  		zoom_point.y = event.targetTouches[0].pageY - offset.top;

  		// e.preventDefault();
  		var delta = 0.1;
      delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

      // determine the point on where the slide is zoomed in
      // zoom_target.x = (zoom_point.x - pos.x) / scale;
      zoom_target.x = (zoom_point.x + container.scrollLeft()) / scale;
      // zoom_target.y = (zoom_point.y - pos.y) / scale;
      zoom_target.y = (zoom_point.y + container.scrollTop()) / scale;

      // apply zoom
      scale += delta * factor * scale;
      scale = Math.max(1, Math.min(max_scale, scale));

      // calculate x and y based on zoom
      pos.x = -zoom_target.x * scale + zoom_point.x;
      pos.y = -zoom_target.y * scale + zoom_point.y;


      // Make sure the slide stays in its container area when zooming out
      if(pos.x>0)
          pos.x = 0;
      if(pos.x+size.w*scale<size.w)
      	pos.x = -size.w*(scale-1);
      if(pos.y>0)
          pos.y = 0;
       if(pos.y+size.h*scale<size.h)
      	pos.y = -size.h*(scale-1);

      update();
    }
	}

	function update(){
		target.css('transform',/*'translate('+(pos.x)+'px,'+(pos.y)+'px)' +*/ ' scale('+scale+','+scale+')');
    container.scrollLeft(-pos.x);
    var targetBounds = target.getBoundingClientRect();
    // container.css("height", targetBounds.height);
	}
}

function contentMove(event) {
  // Android.logg("contentTouch");
  // Android.logg("" + event.targetTouches[0].target);
  if (event.targetTouches.length == 2) {
    var midpointPage = midpoint({x: event.targetTouches[0].pageX, y: event.targetTouches[0].pageY},
      {x: event.targetTouches[1].pageX, y: event.targetTouches[1].pageY});
    // console.log(event.targetTouches[0].target);
    var touchTarget = $(event.targetTouches[0].target);
    // var currentZoom = touchTarget.attr("zoom");
    // // console.log("currentZoom: " + currentZoom);
    // var newZoom = parseFloat(currentZoom) + 0.1;
    // // console.log("newZoom: " + newZoom);
    // touchTarget.attr("zoom", newZoom);
    // touchTarget[0].style.transform = 'scale(' + newZoom + ')';
    //
    // var targetBounds = $(event.targetTouches[0].target)[0].getBoundingClientRect();
    // touchTarget.parent().css("height", targetBounds.height);
    //
    // var leftOffset = midpointPage.x + targetBounds.left;
    // touchTarget.parent().scrollLeft(leftOffset);

    // scroll_zoom.scrolled(midpointPage.x, midpointPage.y);

    // event.stopPropagation();

  }
}

function midpoint(p1, p2) {
  let midX = (p1.x + p2.x) / 2;
  let midY = (p1.y + p2.y) / 2;
  return {x: midX, y: midY};
}
