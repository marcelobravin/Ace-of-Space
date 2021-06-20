var perseguicao : double = 0;

function Start() {
	if (perseguicao > 0) {
		Destroy(this, perseguicao);
	}
}

function FixedUpdate() {
	
	var inimigo = FindClosestEnemy();
	if (inimigo) {
		//print(inimigo.name);
		if (inimigo.transform.position.x < 8 && inimigo.transform.position.x > -8) {
			if (inimigo.transform.position.y < 6 && inimigo.transform.position.y > -6) {
				transform.LookAt(inimigo.transform);
			}
		}
	}
}

function FindClosestEnemy() : GameObject {

	// Find all game objects with tag Enemy
	var gos : GameObject[];
	gos = GameObject.FindGameObjectsWithTag("Enemy");
	var closest : GameObject;
	var distance = Mathf.Infinity;
	var position = transform.position;
	
	// Iterate through them and find the closest one
	for (var go : GameObject in gos) {
		var diff = (go.transform.position - position);
		var curDistance = diff.sqrMagnitude;
		if (curDistance < distance) {
			closest = go;
			distance = curDistance;
		}
	}
	
	return closest;
}