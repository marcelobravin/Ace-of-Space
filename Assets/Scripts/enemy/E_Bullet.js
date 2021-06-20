var bulletSpeed : int = 1;
var hit : Transform;
var hit2 : Transform;

var isPierce : boolean = false;

//movimento do tiro
function Update () {
	amtToMove = bulletSpeed * Time.deltaTime;
	transform.Translate(Vector3.forward * amtToMove);
}

// tem q arrumar direçao de genericBullet para funcionar ricochete
function OnCollisionEnter(collision : Collision) {

	// Rotate the object so that the y-axis faces along the normal of the surface
	var contact : ContactPoint = collision.contacts[0];
	var curDir = transform.TransformDirection(Vector3.forward);
	var newDir :  Vector3 = Vector3.zero;
	newDir = Vector3.Reflect(curDir, contact.normal);

	transform.rotation = Quaternion.FromToRotation(Vector3.forward, newDir);
	rigidbody.velocity = transform.forward * (bulletSpeed * 2);
	transform.collider.isTrigger = true;
	
	Destroy(this);
}

function OnTriggerEnter (other : Collider) {
	var pan;
	// Se bater no player
	if (other.gameObject.tag == "Player" || other.gameObject.tag == "Bico1" || other.gameObject.tag == "Wing") {
		player = gameObject.gameObject.FindWithTag("Player");
		pan = player.GetComponent("Common");
		if (!pan.invencivel && !pan.protegido) {
			Hit(1);
		}
		
		if (other.gameObject.tag == "Wing") {
			other.SendMessage("Break");
		} else {
			player.SendMessage("Dead");
		}
	} else if (other.gameObject.tag == "Shield" || other.gameObject.tag == "EnemyArmored") {
	
		if (transform.name == "E_Rocket(Clone)" || transform.name == "E_HomingMissile(Clone)" || transform.name == "E_Missile(Clone)") {
			Hit(1);
		} else {
			if (other.gameObject.name == ("Shield1A(Clone)")) {
				Ricochetear();
			}  else {
				Hit(0);
			}
		}
	}
}

function Hit(num) {
	if (num == 1) {
		Instantiate(hit, transform.position, transform.rotation);	
	} else {
		if (hit2) {
			Instantiate(hit2, transform.position, transform.rotation);
		}
	}
	
	if (!isPierce) {
		Destroy(gameObject);
	}
}

function Ricochetear() {
	// laser nao tem renderer
	if (transform.renderer) {
		Instantiate(hit2, transform.position, transform.rotation);
		transform.tag = "bullet";
		transform.renderer.material.color = Color.green;
		gameObject.AddComponent("GenericBullet");
		gameObject.GetComponent("GenericBullet").bulletSpeed = 0;
		transform.collider.isTrigger = false;
		
		if (transform.name == "E_BigBullet(Clone)") {
			gameObject.GetComponent("GenericBullet").bulletPower = 5;
		}
		
		if (transform.name == "E_BigBullet2(Clone)") {
			gameObject.GetComponent("GenericBullet").bulletPower = 10;
		}
	}
}