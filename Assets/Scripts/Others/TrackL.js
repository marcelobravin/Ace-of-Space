var speed : double = 1;

private var cima : boolean = true;
private var lookAtTarget : Transform;

function Start() {
	lookAtTarget = GameObject.FindWithTag("Player").transform;
}

function Update() {

	if (lookAtTarget) {
		amtToMove = speed * Time.deltaTime;
		
		switch (Universal.stage) {
			case 1:
				if (lookAtTarget.position.x < transform.position.x - 0.1) {
					transform.position.x -= amtToMove;
				}
				
				if (lookAtTarget.position.x > transform.position.x + 0.1) {
					transform.position.x += amtToMove;
				}
			break;
			
			case 2:
				if (lookAtTarget.position.y < transform.position.y - 0.1) {
					transform.position.y -= amtToMove;
				}
				
				if (lookAtTarget.position.y > transform.position.y + 0.1) {
					transform.position.y += amtToMove;
				}
			break;
			
			case 3:
				if (lookAtTarget.position.x < transform.position.x - 0.1) {
					transform.position.x -= amtToMove;
				}
				
				if (lookAtTarget.position.x > transform.position.x + 0.1) {
					transform.position.x += amtToMove;
				}
			break;
			
			case 4:
				if (lookAtTarget.position.y < transform.position.y - 0.1) {
					transform.position.y -= amtToMove;
				}
				
				if (lookAtTarget.position.y > transform.position.y + 0.1) {
					transform.position.y += amtToMove;
				}
			break;
		}
	}
}