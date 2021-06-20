//#pragma strict

var escala : double = 0.1;
var frequencia : double = 0.1;

var isX : boolean = false;
var isY : boolean = false;
var isZ : boolean = false;


function Start() {
	InvokeRepeating("Tamanho", frequencia, frequencia);
}

function Tamanho() {

	if (isX) {
		if (transform.localScale.x > 0) {
			transform.localScale.x += escala;
		} else {
			transform.localScale.x = 0;
			Destroy(gameObject);
		}
	}
	
	if (isY) {
		if (transform.localScale.y > 0) {
			transform.localScale.y += escala;
		} else {
			transform.localScale.y = 0;
			Destroy(gameObject);
		}
	}
	
	if (isZ) {
		if (transform.localScale.z > 0) {
			transform.localScale.z += escala;
		} else {
			transform.localScale.z = 0;
			Destroy(gameObject);
		}
	}
}