var bulletSpeed: int = 1;
var hit : GameObject;
var hitArmor : GameObject;

var travaDirecao : boolean = false;
var travaArma : boolean = false;
var slow : boolean = false;
var haste : boolean = false;
var confuse : boolean = false;

var desarmar : boolean = false;

function Start () {
	if (slow == true && haste == true) {
		var number = Random.Range(0, 2);
		if (number <= 1) {
			haste = false;
		} else {
			slow = false;
		}
	}
}

// movimento do tiro
function Update () {
	amtToMove = bulletSpeed * Time.deltaTime;
	transform.Translate (Vector3.forward * amtToMove);
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

// colisão com player1
function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == ("Player")) {
	
		// da pra colocar um other.get
		//var pan = gameObject.FindWithTag("Player").GetComponent("Common");
		var pan = other.GetComponent("Common");
		if (!pan.invencivel && !pan.protegido) {
		
			if (travaDirecao) {
				other.SendMessage ("TravarDirecao");
			}
			
			if (travaArma) {
				other.SendMessage ("TravarArma");
			}
			
			if (slow) {
				other.SendMessage ("Slow");
			}
			
			if (haste) {
				other.SendMessage ("Haste");
			}
			
			if (confuse) {
				other.SendMessage ("Confuse");
			}
	
			if (desarmar) {
				other.SendMessage ("Desarmar");
			}
			
			Instantiate(hit, other.transform.position, transform.rotation);
			Destroy(gameObject);
		}
	}
	
	
	
	
	/*
	// se bater no escudo
	if (other.gameObject.tag == ("Shield") || other.gameObject.tag == ("EnemyArmored")) {
	//if (other.gameObject.tag == ("Shield")) {
		Destroy(gameObject);
		var tempExplosao : Transform;
		tempExplosao = Instantiate(hit, transform.position, transform.rotation);
	}
	*/
	
	// se bater no escudo -> ricochete.js
	if (other.gameObject.tag == ("Shield") || other.gameObject.tag == ("EnemyArmored")) {
		if (other.gameObject.name == ("Shield1A(Clone)")) {
			// laser nao tem renderer
			if (transform.renderer) {
				transform.tag = "bullet";
				transform.renderer.material.color = Color.green;
				gameObject.AddComponent("GenericBullet");
				gameObject.GetComponent("GenericBullet").bulletSpeed = 0;
				transform.collider.isTrigger = false;
			}
			
			if (gameObject.GetComponent("Kaleidoscope")) {
				Destroy(gameObject.GetComponent("Kaleidoscope"));
			}
		} else {
			Instantiate(hitArmor, transform.position, transform.rotation);
			Destroy(gameObject);
		}
	}
}