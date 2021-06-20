var inicio : double = 0.0;
var intervalo : double = 0.0;

var teleporte : boolean = false;
var turnCollider : boolean = false;
var desaparecer : boolean = false;

function Start() {
	InvokeRepeating("Acao", inicio, intervalo);
}

function Acao () {

	if (teleporte) {
		if (Universal.stage == 1 || Universal.stage == 3) {
			if (transform.position.y >= 0) {
				transform.position.y -= 4;
			} else {
				transform.position.y += 4;
			}
		} else {
			if (transform.position.x >= 0) {
				transform.position.x -= 4;
			} else {
				transform.position.x += 4;
			}
		}
	}
	
	
	if (turnCollider) {
		if (collider.enabled) {
			collider.enabled = false;
		} else {
			collider.enabled = true;
		}
	}
	
	
	if (desaparecer) {
		if (transform.renderer.enabled) {
			transform.renderer.enabled = false;
		} else {
			transform.renderer.enabled = true;
		}
	}
	
	if (seguir) {
		if (GameObject.FindWithTag("Player")) 	{
			lookAtTarget = GameObject.FindWithTag("Player").transform;
			transform.LookAt(lookAtTarget);
		}
	}
}

var seguir : boolean = false;