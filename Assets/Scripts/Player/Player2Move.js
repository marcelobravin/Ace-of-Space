  function Update () {
 
	//Move para esquerda e direita
	if ((transform.position.x <= 7.5) && ( transform.position.x >= -7.5)) { 
		var amtToMove = (Common.speed * Input.GetAxis ("Horizontal2")) * Time.deltaTime;
		
		switch (Universal.stage) {
			case 1: 
				transform.Translate(Vector3.up * amtToMove);
			break;
			case 2:
				transform.Translate(Vector3.left * amtToMove);
			break;
			case 3:
				amtToMove = -amtToMove;
				transform.Translate(Vector3.up * amtToMove);
			break;
			case 4:
				amtToMove = -amtToMove;
				transform.Translate(Vector3.left * amtToMove);
			break;
		}
	}
	
	//up down
	if ((transform.position.y <= 4.5) && (transform.position.y >= -4.5)) { 
		var amtToMoveUp = (Common.speed * Input.GetAxis ("Vertical2")) * Time.deltaTime;
		
		switch (Universal.stage) {
			case 1: 
				amtToMoveUp = -amtToMoveUp;
				transform.Translate(Vector3.left * amtToMoveUp);
			break;
			case 2: 
				transform.Translate(Vector3.up * amtToMoveUp);
			break;
			case 3: 
				transform.Translate(Vector3.left * amtToMoveUp);
			break;
			case 4: 
				transform.Translate(Vector3.down * amtToMoveUp);
			break;
		}
	}
}