var isLeft : boolean = false;
var parent;
var hit : Transform;

function Start() {
	parent = gameObject.Find("Player1").GetComponent("Common");
}
	
// ao colidir
function OnTriggerEnter ( otherObject : Collider ) {

	// se colidir com inimigo blindado
	if (otherObject.gameObject.tag == "EnemyArmored" ) {
		if (!parent.invencivel && !parent.protegido) {
			Break();
		}
	}
}

function Break() {
	collider.enabled = false;
	BroadcastMessage ("Esfumacar");
	Instantiate ( hit, transform.position, transform.rotation );
	
	if (isLeft) {
		parent.WingDown(0);
	} else {
		parent.WingDown(1);
	}
}

function TurnCollider(num) {
	if (num == 0) {
		collider.enabled = false;
	} else {
		collider.enabled = true;
	}
}