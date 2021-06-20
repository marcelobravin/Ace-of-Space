//#pragma strict

private var movimento : double = 0;
private var posicaoInicial : double = 0;
private var executouAnimacao : boolean = false;

function Start() {
	// Define posiçao inicial conforme a fase
	if (Universal.stage == 1 || Universal.stage == 3) {
		posicaoInicial = transform.position.x;
	} else {
		posicaoInicial = transform.position.y;
	}
}

function Update () {
	movimento = transform.position.x - posicaoInicial;
	
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
	}
}

function Rotacionar() {
	executouAnimacao = true;
	var fall = gameObject.GetComponent("FallScript");

	var vel = fall.speed;
	//animation.Play();
	//transform.Rotate(Vector2(0, 180));
	InvokeRepeating("rot", 0.01, 0.01);
	yield WaitForSeconds(0.5);
	fall.speed = 0;
	yield WaitForSeconds(1);
	fall.speed = -vel;
	yield WaitForSeconds(1);
	Destroy(this);
}

function rot() {
	var numero : double = -0.72;
	transform.Rotate(Vector3(0, numero, 0));
}