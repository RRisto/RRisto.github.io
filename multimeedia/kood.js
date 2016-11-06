var c=document.getElementById("kanvas"); /*JavaScript kasutab identifikaatorit id (mitte class) selleks, et leida õige element canvas*/
var cxt=c.getContext("2d"); /* HTML5 sisse ehitatud objekt getContext("2d") erinevate meetoditega sisu joonistamiseks (joone, ristkülikuid, ringe, sümboleid jne)*/
var canvasWidth=c.width;
var canvasHeight=c.Height;
var x=0;
var requestAnimationFrame=window.requestAnimationFrame ||
	window.mozRequestAnmationFrame ||
	window.webkitReqRequestAnmationFrame ||
	window.msRequestAnmationFrame ||
function animation() {
	cxt.clearRect(0,0, canvasWidth, canvasHeight);
	if (this.x<100) {x=x+0.5;}
	else {x=0;}
	cxt.fillStyle="#FF0000";
	cxt.fillRect(x, 0,150,75);
	requestAnimationFrame(animation);
}
animation()
/*cxt.fillStyle="#FF0000";  ristkülik on punast värvi*/
/*cxt.fillRect(0,0,150,75); joonistame ristküliku suurusega 150x70, alustades vasakult ülevalt*/
