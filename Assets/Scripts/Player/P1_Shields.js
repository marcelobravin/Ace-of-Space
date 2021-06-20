var bulletPower: int = 1;
var explosao : Transform;

var isBallistic : boolean = false;
var isAgressive : boolean = false;

//acertar inimigo
function OnTriggerEnter( otherObject : Collider ){
	if (otherObject.gameObject.tag == "Enemy"){
		if (isBallistic) {
			Colisao(otherObject);
			Cancelar();
		}
		
		if (isAgressive) {
			Colisao(otherObject);
		}
	}
}

// causar dano
function Colisao(otherObject) {
	Common.score += 100;
	var tempExplosao : Transform;
	tempExplosao = Instantiate(explosao, transform.position, transform.rotation);
	otherObject.SendMessage("Hit", bulletPower);
}

// desligar
function TurnOff() {
	Destroy(gameObject);
}

// cancelar
function Update () {
	if (Input.GetButtonDown("Special")) {
		Cancelar();
	}
}

// informar ao player 
function Cancelar() {
	GameObject.FindWithTag("Bico1").SendMessage("ShieldDown");
	TurnOff();
}