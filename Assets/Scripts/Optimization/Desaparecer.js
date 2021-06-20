private var horizontalBorder : double = 7.0;
private var verticalBorder : double = 7.0;
private var horizonte: int = 15;

function Start() {
	// horizonte = direcao +/- tamanho (mas tamanho geralment é 1)
	switch(Universal.stage) {
		case 2: verticalBorder = 0 - verticalBorder;
		break;
		
		case 3: horizontalBorder = 0 - horizontalBorder;
		break;
	}
}

private var pan : boolean = false;
function Update () {

	if (!pan) {
		switch(Universal.stage) {
			case 1:
				if (transform.position.x > horizontalBorder) {
					Stop();
				}
			break;
			
			case 2:
				if (transform.position.y < verticalBorder) {
					Stop();
				}
			break;
			
			case 3:
				if (transform.position.x < horizontalBorder) {
					Stop();
				}
			break;
			
			case 4:
				if (transform.position.y > verticalBorder) {
					Stop();
				}
			break;
		}
	}
	
	// Verificar direito
	if (transform.position.x < (0 - horizonte) || transform.position.x > horizonte || transform.position.y > horizonte || transform.position.y < (0 - horizonte)) {
		Destroy(gameObject);
	}
}

function OnBecameInvisible() {
	Destroy(gameObject);
}

//colocar só em atiradores
function Stop() {
	gameObject.BroadcastMessage ("DontShoot", SendMessageOptions.DontRequireReceiver);
	pan = true;
}