var limite : double = 0.0;

function Update () {
	switch (Universal.stage) {
		//Fases pra direita
		case 1:
			if (transform.position.x > 90) {
				transform.position.x = -30;
			}
		break;
		
		case 2:
			if (transform.position.y < limite) {
				Parar();
			}
		break;
		
		//Fases pra esquerda
		case 3:
			if (transform.position.x < -30) {
				transform.position.x = 90;				
			}
		break;
		
		case 4:
			if (transform.position.y > limite) {
				Parar();
			}
		break;
	}
}

function Parar() {
	Destroy(transform.GetComponent("FallScript"));
	Destroy(this);
}