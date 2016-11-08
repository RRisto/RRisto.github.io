var c=document.getElementById("kanvas"); /*JavaScript kasutab identifikaatorit id (mitte class) selleks, et leida õige element canvas*/
var cxt=c.getContext("2d"); /* HTML5 sisse ehitatud objekt getContext("2d") erinevate meetoditega sisu joonistamiseks (joone, ristkülikuid, ringe, sümboleid jne)*/

var canvasWidth=c.width;
var canvasHeight=c.height;
var x=50;
var y=525;
var requestAnimationFrame=window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
function rgb(r, g, b){ /* värvide jaoks*/
  return "rgb("+r+","+g+","+b+")";
}
function animation() {
	/*cxt.clearRect(0,0, canvasWidth, canvasHeight);*/
	/*cxt.clearArc(0,0, canvasWidth, canvasHeight);*/
	/*cxt.clearRect(x - 50, 75 - 50, 2 * 50, 50 * 2);*/
	/*cxt.clearRect(this.prevX - 50, 75 - 50, 2 * 50, 50 * 2);*/
	cxt.clearRect(0,0, 800,800); /* kustutab eelnevad ringid ära*/
	/*if (this.x<450) {x=x+0.5; y=x+100}
		else {x=50;y=500;}*/
	if (this.x<750) {x=x+0.5;y=Math.pow(x-375,2)*0.3/100+50;}
		else {x=50;y=525;}
	/*cxt.fillStyle="#FF0000";*/
	cxt.fillStyle=rgb(255, 400-y, 0);
	/*cxt.fillRect(x, 0,150,75);*/
	cxt.beginPath();
	cxt.arc(x,y,50,0,2*Math.PI);
	/*cxt.arc(x,y,50,0,2*Math.PI);*/
	cxt.closePath();
	cxt.fill();
	this.prevX = x;
    /*this.prevY = y;*/
	this.prevY = y;
	
	requestAnimationFrame(animation);
}
animation()

