var bulletSpeed: int = 10;
var bulletPower: int = 1;
var veneno : int = 0;

var isPiercer : boolean = false;
var isWeb : boolean = false;

var hit : Transform;
var hit2 : Transform;

private var manager;

function Awake() {
	manager = GameObject.Find("Main Camera").GetComponent("Stages");
	manager.SetShots(manager.GetShots() +1);
}
/*
function Start() {
	if (hit == null) {
		hit = Resources.Load("Particles/Minhas/Shine");
	}
	
	if (hit2 == null) {
		hit2 = Resources.Load("Particles/Minhas/Shine");
	}
}
*/

// ao colidir
function OnTriggerEnter ( otherObject : Collider ) {

	// se colidir com inimigo blindado
	if (otherObject.gameObject.tag == "EnemyArmored" || otherObject.gameObject.tag == "EnemyShield") {
		Instantiate (hit2, transform.position, transform.rotation );
		if (!isPiercer) {
			Destroy(gameObject);
		}
	}
	
	//se colidir com inimigo verifica o tipo de tiro e chama fun??o correspondente
	if (otherObject.gameObject.tag == "Enemy" ) {
		if (hit == null) {
			Instantiate (Resources.Load("Particles/hit"), transform.position, transform.rotation );
		}
		
		if (hit) {
			Instantiate (hit, transform.position, transform.rotation );
		}
		
		Common.score += 100 * bulletPower;
		otherObject.SendMessage("Hit", bulletPower);
		
		//if (isContinuo) {
		if (veneno > 0) {
			otherObject.SendMessage("Continuo", veneno);
		}
		
		if (isWeb) {
			otherObject.SendMessage("Web");
		}
		
		if (!isPiercer) {
			Destroy(gameObject);
		}
	}	
}

//movimento do tiro
function Update() {
	amtToMove = bulletSpeed * Time.deltaTime;
	//transform.Translate(Vector3.forward * amtToMove); // TEM Q SER ASSIM PARA RICOCHETE FUNCIONAR CORRETAMENTE
	transform.Translate (Vector3.up * amtToMove);
	
	if (Universal.stage != 5) {
		if (transform.position.z != 0) {
			transform.position.z = 0;
		}
	}
}