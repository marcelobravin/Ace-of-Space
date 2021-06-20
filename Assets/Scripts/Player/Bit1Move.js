var papai;

function Start() {
	papai = GameObject.FindWithTag("Player");
}

function Update() {
var distancia : int = 1;
var amtToMove = Common.speed * Time.deltaTime;

	if (Time.timeScale == 0.6) {
		amtToMove *= 1.8;
	}

	if (transform.position.x <= papai.transform.position.x - distancia) { 
		//transform.Translate(Vector3.down * amtToMove);
		
		transform.position.x += amtToMove;
	}
	
	if (transform.position.x >= papai.transform.position.x + distancia) { 
		//transform.Translate(Vector3.up * amtToMove);
		transform.position.x -= amtToMove;
	}
	
	
	
	if (transform.position.y <= papai.transform.position.y - distancia) { 
		//transform.Translate(Vector3.right * amtToMove);
		transform.position.y += amtToMove;
	}
	
	if (transform.position.y >= papai.transform.position.y + distancia) { 
		//transform.Translate(Vector3.left * amtToMove);
		transform.position.y -= amtToMove;
	}
}
/*
function turnOff() {
	Destroy(gameObject);
}
*/