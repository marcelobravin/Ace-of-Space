var giroX : double = 0.0;
var giroY : double = 0.0;
var giroZ : double = 0.0;

//var frequencia : double = 0.01;

function Update () {
	transform.Rotate (giroX * Time.deltaTime, giroY * Time.deltaTime, giroZ * Time.deltaTime);
}

function OnBecameVisible() {
	enabled = true;
}

function OnBecameInvisible() {
	enabled = false;
}