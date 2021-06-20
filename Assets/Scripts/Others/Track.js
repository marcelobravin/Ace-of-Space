var speed : double = 1;

//private var cima : boolean = true;
private var lookAtTarget : Transform;

function Start() {
	lookAtTarget = GameObject.FindWithTag("Player").transform;
}

function Update() {

	if (lookAtTarget) {
		amtToMove = speed * Time.deltaTime;
		
		switch (Universal.stage) {
			case 1:
				if (lookAtTarget.position.y < transform.position.y - 0.1) {
					transform.Translate (Vector3.down * amtToMove);
				}
				
				if (lookAtTarget.position.y > transform.position.y + 0.1) {
					transform.Translate (Vector3.up * amtToMove);
				}
			break;
			
			case 2:
				if (lookAtTarget.position.x < transform.position.x - 0.1) {
					transform.Translate (Vector3.down * amtToMove);
				}
				
				if (lookAtTarget.position.x > transform.position.x + 0.1) {
					transform.Translate (Vector3.up * amtToMove);
				}
			break;
			
			case 3:
				if (lookAtTarget.position.y < transform.position.y - 0.1) {
					transform.Translate (Vector3.up * amtToMove);
				}
				
				if (lookAtTarget.position.y > transform.position.y + 0.1) {
					transform.Translate (Vector3.down * amtToMove);
				}
			break;
			
			case 4:
				if (lookAtTarget.position.x < transform.position.x - 0.1) {
					transform.Translate (Vector3.up * amtToMove);
				}
				
				if (lookAtTarget.position.x > transform.position.x + 0.1) {
					transform.Translate (Vector3.down * amtToMove);
				}
			break;
		}
	}
}