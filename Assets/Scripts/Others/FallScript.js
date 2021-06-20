var speed : double = 1;

function FixedUpdate() {
	var amtToMove = speed * Time.deltaTime;
	switch (Universal.stage) {
		case 1: transform.position.x += amtToMove;
		break;
		
		case 2: transform.position.y -= amtToMove;
		break;
		
		case 3: transform.position.x -= amtToMove;
		break;
		
		case 4: transform.position.y += amtToMove;
		break;
		
		case 5: transform.position.z += amtToMove;
		break;
	}
	//transform.Translate(Vector3.right * amtToMove); // +eficiente, mas: da problema nos itens e skyrings
	// soluçao: criar fall.js e avante.js
}