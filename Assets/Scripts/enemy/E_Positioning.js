var horizontalBorder : double = 6.0;
var verticalBorder : double = 4.5;

private var posto : boolean = false;

function Start() {
	
	// Inverte coordenadas de acordo com a direção da fase
	switch(Universal.stage) {		
		case 4:
			verticalBorder = 0 - verticalBorder;
		break;
		
		case 1:
			horizontalBorder = 0 - horizontalBorder;
		break;
	}
}

function Update () {

	// Se não chegou no posto
	if (!posto) {
		switch (Universal.stage) {
				
			case 1:
				if (transform.position.x > horizontalBorder) {
					Ready();
				}
			break;
			
			case 2:
				if (transform.position.y < verticalBorder) {
					Ready();
				}
			break;
			
			case 3:
				if (transform.position.x < horizontalBorder) {
					Ready();
				}
			break;
			
			case 4:
				if (transform.position.y > verticalBorder) {
					Ready();
				}
			break;
		}
	}
}


// Chegou no posto
function Ready() {
	
	// Se objeto tiver fall script (boss)
	if (transform.GetComponent("FallScript")) {
		Destroy(transform.GetComponent("FallScript"));
		Destroy(this);
		
	// Se pai do objeto tiver fall script (inimigo comum)
	} else {
		transform.parent.GetComponent("FallScript").speed = 0;
		posto = true;
	}
}


// Ir embora
function GoAway() {
	transform.parent.GetComponent("FallScript").speed = 1;
	
	// Tracker
	if (transform.parent.GetComponent("TrackL")) {
		Destroy(transform.parent.GetComponent("TrackL"));		
	}
	
	// PlayerEnemy
	if (transform.parent.GetComponent("Track")) {
		Destroy(transform.parent.GetComponent("Track"));
	}
	
	Destroy(this);
}