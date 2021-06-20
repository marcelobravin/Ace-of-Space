var confuse : boolean = false;
private var trava : boolean = false;
private var eixoTravado : String;

function Update () {


	//Move para esquerda e direita
	if ((transform.position.x <= 7.6) && ( transform.position.x >= -7.6)) { 
		var amtToMove = (Common.speed * Input.GetAxis ("Horizontal")) * Time.deltaTime;
		
		// corrige velocidade durante habilidade timeslow
		if (Time.timeScale == 0.1) {
			amtToMove *= 9;
		}
		
		if (eixoTravado != "Horizontal" && confuse == false) {
			transform.position.x -= amtToMove;	
		}
		
		// adicionar 3 estados de confuse
		if (eixoTravado != "Horizontal" && confuse == true) {
			if (Universal.stage == 2) {
				transform.Translate(Vector3.up * amtToMove);
			} else {
				transform.Translate(Vector3.left * amtToMove);
			}
		}
	}
	
	//up down
	if ((transform.position.y <= 4.6) && (transform.position.y >= -4.6)) { 
		var amtToMoveUp = (Common.speed * Input.GetAxis ("Vertical")) * Time.deltaTime;
		// corrige velocidade durante habilidade timeslow
		if (Time.timeScale == 0.1) {
			amtToMoveUp *= 9;
		}
		
		// corrige velocidade durante habilidade timeslow
		if (Time.timeScale == 0.6) {
			amtToMoveUp *= 1.8;
		}
		
		if (eixoTravado != "Vertical" && confuse == false) {
			transform.position.y += amtToMoveUp;
		}
		
		if (eixoTravado != "Vertical" && confuse == true) {
			if (Universal.stage == 2) {
				transform.Translate(Vector3.left * amtToMoveUp);
			} else {
				transform.Translate(Vector3.up * amtToMoveUp);
			}
		}
	}
}

function Travar(interruptor) {
	if (interruptor == 1) {
		trava = true;
		var i = Random.Range(0,4);
		if (i <=2) {
			eixoTravado = "Vertical";
		} else {
			eixoTravado = "Horizontal";
		}
	} else {
		trava = false;
		eixoTravado = "";
	}
}