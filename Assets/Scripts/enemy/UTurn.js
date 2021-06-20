//#pragma strict
var speed : double = 1;

private var posicaoInicial : double = 0;
private var executouAnimacao = false;
private var cima : boolean = true;

function Start() {
	// Define posiçao inicial conforme a fase
	if (Universal.stage == 1 || Universal.stage == 3) {
		posicaoInicial = transform.position.y;
	} else {
		posicaoInicial = transform.position.x;
	}
	
	// Identifica direçao conforme posiçao inicial
	if ((posicaoInicial <= 0 || posicaoInicial>=2) && posicaoInicial>=-2) {	
		cima = false;
	}
}

function Update () {
	if (!executouAnimacao) {
		if (Universal.stage == 1 && transform.position.x > 4) {
			Rotacionar();
		} else if (Universal.stage == 2 && transform.position.y < -2) {
			Rotacionar();
		} else if (Universal.stage == 3 && transform.position.x < -4) {
			Rotacionar();
		} else if (Universal.stage == 4 && transform.position.y > 2) {
			Rotacionar();
		}
	} else {
		amtToMove = (speed * Time.deltaTime) * 0.7;
		
		// Move conforme direçao
		if (cima) {
			if (Universal.stage == 1 || Universal.stage == 3) {
				transform.position.y += amtToMove;
			} else {
				transform.position.x += amtToMove;
			}
		} else {
			if (Universal.stage == 1 || Universal.stage == 3) {
				transform.position.y -= amtToMove;
			} else {
				transform.position.x -= amtToMove;
			}
		}
	}
}


function Rotacionar() {
	executouAnimacao = true;
	var fall = gameObject.GetComponent("FallScript");

	var vel = fall.speed;
	InvokeRepeating("rot", 0.01, 0.01);
	yield WaitForSeconds(0.5);
	fall.speed = 0;
	yield WaitForSeconds(1);
	fall.speed = -vel;
	yield WaitForSeconds(1);
	Destroy(this);
}

function rot() {
	var numero : double = 0.72;
	if (!cima) {
		numero = 0 - numero;
	}
	
	// Inverte sinal
	if (Universal.stage == 3 || Universal.stage == 4) {
		numero = - numero;
	}
	
	transform.Rotate(Vector3(0, 0, numero));
}