var pos = 0;
// box element
// var box = document.getElementById("box");

function move() {
	var box = document.getElementById("box");
	pos += 1;
	box.style.left = pos+"px";

	if(pos >= 150) {
    		clearInterval(setVar);
  	}

}

var setVar = setInterval(move, 10);

