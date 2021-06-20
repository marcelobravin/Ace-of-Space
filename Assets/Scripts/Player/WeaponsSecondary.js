// chamado pela bomba "hypermode"
var autoFill : boolean = false;
var barraCheia : AudioClip;

// armas & habilidades
var shield : Rigidbody;
var shield2 : Rigidbody;
var shield3 : Rigidbody;
private var focus : boolean = false;
var shotgun : Rigidbody;
var cannon : Transform;
var wave : Rigidbody;
var webshot : Rigidbody;
var mine : Rigidbody;
var missile : GameObject;
var missileP : GameObject;
var hMissile : GameObject;

var bit1 : GameObject;

var itemP : Transform;
var itemM : Transform;
var itemG : Transform;

// estados
private var shieldStatus : int = 0;
static var energyMeter : double = 100;
private var energyCapacity : int = 1;
private var duracao : double = 0;
private var bit : boolean = false;


var travaArma : boolean = false;


private var fireRate : double = 0.1;
private var nextFire : double = 0.0;

function Start() {	
	originalLightColor = RenderSettings.ambientLight;

	// Dobra capacidade de energia para armaduras especiais
	if(Universal.selected[0] == "Charger" || Universal.selected[0] == "Hyper") {
		energyCapacity = 2;
	}
}

 function Update () {
 	// pause off
	if (!Universal.paused) {
		if (!travaArma) {
			
			// -------------------------------------------------------------------arma secundaria
			if (Input.GetButtonDown("Fire2") && Time.time > nextFire) {
				nextFire = Time.time + fireRate;
				
				switch(Universal.selected[2]) {
					case "Shotgun": Shotgun();
					break;
					
					case "Cannon": Cannon();
					break;
					
					case "Wave": Wave();
					break;
					
					case "Mine": Mine();
					break;
					
					case "Web Shot": WebShot();
					break;
					
					case "Missile": Missile();
					break;
					
					case "Homing Missile": HomingMissile();
					break;
					
					case "Missile Salvo": MissileP();
					break;
				}				
			}
			
			// ----------------------------------------------------------------habilidade especial
			if (Input.GetButtonDown("Special")) {
				switch(Universal.selected[3]) {
					case "Ballistic Shield": BallisticShield();
					break;
					
					case "Force Field": ShieldB();
					break;
					
					case "Agressive Shield": ShieldC();
					break;
					
					case "Time": Focus();
					break;
					
					case "Bit": Bit();
					break;
					
					case "Hyperspace Warp": Warp();
					break;
					
					case "Hero's Fortune": Roulette();
					break;
					
					case "Defense System": Repair();
					break;
				}
			}
		}
	}
////////////////////////////////////////////////////fim do if not paused
	
	//InvokeRepeating("Manutenção", 0.1, 0.1) TODOS num só manutenção
	if (autoFill) {
		energyMeter = 100 * energyCapacity;
	}
	
	//recarregar arma especial
	if (energyMeter < 100 * energyCapacity) {
		energyMeter += 10 * Time.smoothDeltaTime;
		if (energyMeter > 100 * energyCapacity) {
			energyMeter = 100 * energyCapacity;
			audio.PlayOneShot(barraCheia);
		}
	} else if (energyMeter > (100 * energyCapacity) + 100) {
		energyMeter = (100 * energyCapacity) + 100;
	}
	
	//gastar escudo
	if (shieldStatus == 1) {
		energyMeter -= 20 * Time.smoothDeltaTime;
		if (energyMeter <= 0) {
			ShieldDown();
		}
	}
		
	//gastar escudo2
	if (shieldStatus == 2) {
		energyMeter -= 25 * Time.smoothDeltaTime;
		if (energyMeter <= 0) {
			ShieldDown();
		}
	}
	
	//gastar escudo3
	if (shieldStatus == 3) {
		energyMeter -= 30 * Time.smoothDeltaTime;
		if (energyMeter <= 0) {
			ShieldDown();
		}
	}
	
	//gastar time
	if (focus) {
		energyMeter -= 30 * Time.smoothDeltaTime;
		if (energyMeter <= 0) {
			Focus();
		}
	}
	
	//gastar bit
	if (bit) {
		energyMeter -= 30 * Time.smoothDeltaTime;
		if (energyMeter <= 0) {
			Bit();
		}
	}
}

//desligar escudo
function ShieldDown() {
	// Desliga escudo
	shieldStatus = 0;
	GameObject.FindWithTag("Shield").SendMessage("TurnOff");	
	transform.parent.GetComponent("Common").protegido = false;
}

////////////////////////////////////////////////////FUNÇÕES ARMAS
// ---------------------------------------------------------------------ARMA SECUNDARIAS
//shotgun
function Shotgun() {
	var custo : int = 20;
	if (energyMeter >= custo) {
		Instantiate(shotgun, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

//cannon
function Cannon() {
	var custo : int = 40;
	if (energyMeter >= custo) {
		Instantiate(cannon, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

//Wave
function Wave() {
	var custo : int = 40;
	if (energyMeter >= custo) {
		Instantiate(wave, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

// Mina aérea
function Mine() {
	var custo : int = 20;
	if (energyMeter >= custo) {
		Instantiate(mine, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

// Web Shot
function WebShot() {
	var custo : int = 10;
	if (energyMeter >= custo) {
		Instantiate(webshot, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

// Web Shot
function Missile() {
	var custo : int = 15;
	if (energyMeter >= custo) {
		Instantiate(missile, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}


// Web Shot
function HomingMissile() {
	var custo : int = 20;
	if (energyMeter >= custo) {
		Instantiate(hMissile, transform.position, transform.rotation);
		energyMeter -= custo;
	}
}

// Web Shot
function MissileP() {
	var custo : int = 25;
	if (energyMeter >= custo) {
		temp = Instantiate(missileP, transform.position, transform.rotation);
		
		switch (Universal.stage) {
			case 1:
				temp.transform.position.y += 0.2;
				temp.transform.position.x += 0.4;
			break;
			case 2:
				temp.transform.position.y -= 0.4;
				temp.transform.position.x += 0.2;
			break;
			case 3:
				temp.transform.position.y += 0.2;
				temp.transform.position.x -= 0.4;
			break;
			case 4:
				temp.transform.position.y += 0.4;
				temp.transform.position.x += 0.2;
			break;
		}
			
		temp = Instantiate(missileP, transform.position, transform.rotation);
		
		
		switch (Universal.stage) {
			case 1:
				temp.transform.position.y -= 0.2;
				temp.transform.position.x += 0.4;
			break;
			case 2:
				temp.transform.position.y -= 0.4;
				temp.transform.position.x -= 0.2;
			break;
			case 3:
				temp.transform.position.y -= 0.2;
				temp.transform.position.x -= 0.4;
			break;
			case 4:
				temp.transform.position.y += 0.4;
				temp.transform.position.x -= 0.2;
			break;
		}
		
		temp = Instantiate(missileP, transform.position, transform.rotation);
		
		switch (Universal.stage) {
			case 1:
				temp.transform.position.y += 0.5;
				temp.transform.position.x += 0.7;
			break;
			case 2:
				temp.transform.position.y -= 0.7;
				temp.transform.position.x += 0.5;
			break;
			case 3:
				temp.transform.position.y += 0.5;
				temp.transform.position.x -= 0.7;
			break;
			case 4:
				temp.transform.position.y += 0.7;
				temp.transform.position.x += 0.5;
			break;
		}
			
		temp = Instantiate(missileP, transform.position, transform.rotation);
		
		
		switch (Universal.stage) {
			case 1:
				temp.transform.position.y -= 0.5;
				temp.transform.position.x += 0.7;
			break;
			case 2:
				temp.transform.position.y -= 0.7;
				temp.transform.position.x -= 0.5;
			break;
			case 3:
				temp.transform.position.y -= 0.5;
				temp.transform.position.x -= 0.7;
			break;
			case 4:
				temp.transform.position.y += 0.7;
				temp.transform.position.x -= 0.5;
			break;
		}
		
		energyMeter -= custo;
	}
}


// ---------------------------------------------------------------------------HABILIDADES
//escudo1
function BallisticShield() {
	
	if (!transform.GetComponentInChildren(P1_Shields)) {
		if (energyMeter >= 100) {
			var correcaoX : double = 0.0;
			var correcaoY : double = 0.0;
			
			
			switch (Universal.stage) {
				case 1: correcaoX = 0.6;
				break;
				case 2: correcaoY = -0.6;
				break;
				case 3: correcaoX = -0.6;
				break;
				case 4: correcaoY = 0.6;
				break;
			}
			
			var tempShield = Instantiate(shield, Vector3(transform.position.x + correcaoX, transform.position.y + correcaoY, transform.position.z), transform.rotation);
			shieldStatus = 1;
			tempShield.transform.parent = transform;
		}
	}
}

//escudo2
function ShieldB() {

	if (!transform.GetComponentInChildren(P1_Shields)) {
		if (energyMeter >= 100) {
		
			var correcaoX : double = 0.0;
			var correcaoY : double = 0.0;			
			
			switch (Universal.stage) {
				case 1: correcaoX = 0.6;
				break;
				case 2: correcaoY = -0.6;
				break;
				case 3: correcaoX = -0.6;
				break;
				case 4: correcaoY = 0.6;
				break;
			}
			
			tempShield = Instantiate(shield2, Vector3(transform.position.x + correcaoX, transform.position.y + correcaoY, transform.position.z), transform.rotation);
			tempShield.transform.parent = transform;
			shieldStatus = 2;
			
			transform.parent.GetComponent("Common").protegido = true;
		}
	}
}

//escudo3
function ShieldC() {

	if (!transform.GetComponentInChildren(P1_Shields)) {
		if (energyMeter >= 100) {
			var correcaoX : double = 0.0;
			var correcaoY : double = 0.0;
			
			
			switch (Universal.stage) {
				case 1: correcaoX = 0.6;
				break;
				case 2: correcaoY = -0.6;
				break;
				case 3: correcaoX = -0.6;
				break;
				case 4: correcaoY = 0.6;
				break;
			}
			
			tempShield = Instantiate(shield3, Vector3(transform.position.x + correcaoX, transform.position.y + correcaoY, transform.position.z), transform.rotation);
			tempShield.transform.parent = transform;
			shieldStatus = 3;
			transform.parent.GetComponent("Common").protegido = true;
		}
	}
}

//tempo
var tickTack : AudioClip;
private var originalLightColor;
function Focus() {
	var tempo : double = 0.45;
	
	if (focus == true) {
		Time.timeScale = 1;
		RenderSettings.ambientLight = originalLightColor;
		focus = false;
		audio.Stop();
	} else {
		if (energyMeter >= 100 && Time.timeScale == 1) {
			Time.timeScale -= tempo;
			RenderSettings.ambientLight = Color.blue;
			focus = true;
			audio.loop = true;
			audio.clip = tickTack;
			audio.Play();
		}
	}
}

//bit
function Bit() {
	if (bit == true) {
		bit = false;
		Destroy(GameObject.FindWithTag("Bit1"));
	} else {
		if (energyMeter >= 100) {
			Instantiate(bit1, transform.position, transform.rotation);
			bit = true;
		}
	}
}

var plim : GameObject;
// teletransporte
function Warp() {
	var custo : int = 10;
	if (energyMeter >= custo) {
		energyMeter -= custo;
		Instantiate(plim, transform.position, transform.rotation);
		
		if (Input.GetAxis ("Horizontal") > 0) {
			transform.parent.position.x -= 4;
		} else if (Input.GetAxis ("Horizontal") < 0) {
			transform.parent.position.x += 4;
		}
		
		if (Input.GetAxis ("Vertical") > 0) {
			transform.parent.position.y += 4;
		} else if (Input.GetAxis ("Vertical") < 0) {
			transform.parent.position.y -= 4;
		}
		
		if (Input.GetAxis ("Horizontal") == 0 && Input.GetAxis ("Vertical") == 0) {
			transform.parent.position = Vector3(0,0,0);
		}
	}	
}

//bit
function Repair() {
	transform.parent.GetComponent("Common").Repair();
}

//bit
function Roulette() {
	var custo : int = 100;

	if (energyMeter >= custo) {
		energyMeter -= custo;
		
		var posicao : Vector3 = Vector3(0,0,0);
		var variacao : double;
		
		if (Universal.stage == 1 || Universal.stage == 3) {
			variacao = Random.Range(-4.5, 4.5);
		} else {
			variacao = Random.Range(-6, 6);
		}
		
		switch (Universal.stage) {
			case 1: posicao = Vector3(-8, variacao, 0);
			break;
			
			case 2: posicao = Vector3(variacao, 6, 0);
			break;
			
			case 3: posicao = Vector3(8, variacao, 0);
			break;
			
			case 4: posicao = Vector3(variacao, -6, 0);
			break;		
		}
		
		var numero = Random.Range(0, 10);
		 if (numero < 1) {
			Instantiate(itemG, posicao, Quaternion(0,0,0,0));
		} else if (numero <= 4) {
			Instantiate(itemM, posicao, Quaternion(0,0,0,0));
		} else {
			Instantiate(itemP, posicao, Quaternion(0,0,0,0));
		}
	}
}