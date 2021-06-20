static var speed : int = 5;
static var playerLives: int = 99;
static var score : int;
static var combo : int = 0;

var explosao : Transform;
private var shipbody : GameObject;

// estados
private var duracao : double = 0;
private var bit : boolean = false;
private var continueMenu : GameObject;
var repair : AudioClip;

var weapons;
var bombs;
var bombsMax : int = 3;
var weaponsSecondary;
var skins;

var velMax : int = 5;
var velInicial: int = 1;
var resistencia : int = 1;
var resistenciaMax : int = 1;
var pointRate : int = 1;

// awake
function Start() {
	velInicial = speed;
	continueMenu = Resources.Load("Texts/T_Continue");
	bico = GameObject.Find("Capsule");
	weapons = bico.GetComponent("WeaponsPrimary");
	weaponsSecondary = bico.GetComponent("WeaponsSecondary");
	bombs = bico.GetComponent("WeaponsBomb");
	skins = GameObject.FindWithTag("ShipBody").GetComponent("ChangeSkin");
	
	yield WaitForSeconds(0.01);
	ArmorDefine();
}

function ArmorDefine() {	
	switch (Universal.selected[0]) {
		case "Light Armor":
			velMax = 10;
		break;
		
		case "Heavy Armor":
			resistencia = 2;
			resistenciaMax = 2;
		break;
		
		case "Bomber":
			bombsMax = 5;
			if (WeaponsBomb.bombs < bombsMax) {
				WeaponsBomb.bombs = 5;
			}		
		break;
		
		case "Ace":
			pointRate = 2;
		break;
		
		case "Hyper":
			velMax = 10;
			resistencia = 2;
			resistenciaMax = 2;
			
			bombsMax = 5;
			if (WeaponsBomb.bombs < bombsMax) {
				WeaponsBomb.bombs = 5;
			}
		break;
	}
	
	// Anyway
	InvokeRepeating("ComboOut", 0.0001, 0.01);
}

function ComboOut() {
	if (!Universal.paused) {
		var valor : int = 1;
		var comboMultiplier = 0;
		
		// Define comboMultiplier	
		var num : double = (combo / 1000);
		comboMultiplier = Mathf.RoundToInt(num);
		
		// Define valor
		valor += comboMultiplier;
		
		// Reduz combo conforme valor
		if (combo > 0) {
			combo -= valor;
		}
	}
}

function Update() {
 	// pause off
	if (Universal.paused == false) {
		//acelerar
		if (Input.GetButtonDown("SpeedUp") && (speed < velMax) && (slow == false)) {
			speed++;
			velInicial = speed;
		}

		if (Input.GetButtonDown("SpeedDown") && (speed>1) && (haste == false)) {
			speed--;
			velInicial = speed;
		}
		
		//acabar invencibilidade
		if (invencivel) {
			if (Time.time >= invencibilidade) {
				Invencibilidade(false);
			}
		}
		
		// slow
		if (slow) {
			if (Time.time > tempoSlow) {
				slow = false;
				speed = velInicial;
				retornarCorOriginal();
			}
		}
		
		// haste
		if (haste) {
			if (Time.time > tempoHaste) {
				haste = false;
				speed = velInicial;
				retornarCorOriginal();
			}
		}
		
		// trava direcao
		if (trava) {
			if (Time.time > tempoTravado) {
				other = gameObject.GetComponent(Player1Move);
				other.Travar(0);	
				trava = false;
				retornarCorOriginal();
			}
		}
		
		// trava arma
		if (travaArma) {
			if (Time.time > tempoTravadoArma) {
				travaArma = false;
				weapons.travaArma = false;
				weaponsSecondary.travaArma = false;
				bombs.travaArma = false;
				retornarCorOriginal();
			}
		}
		
		// trava arma
		if (confuse) {
			if (Time.time > tempoConfuse) {
				other = gameObject.GetComponent(Player1Move);
				other.confuse = false;
				confuse = false;
				retornarCorOriginal();
			}
		}
		
		// asas quebradas
		if (!WingL && WingR) {
			transform.Translate(Vector3.right * Time.deltaTime);
		}
			
		if (!WingR && WingL) {
			transform.Translate(Vector3.left * Time.deltaTime);
		}
	}	
}

// mandar pro inimigo
//Colisão com inimigo
function OnTriggerEnter (otherObject: Collider){
	if (otherObject.gameObject.tag == "EnemyArmored"){
		Dead();
	}
}

private var invencibilidade : double = 0.0;
var invencivel : boolean = false;
var protegido : boolean = false;

//Morrer
function Dead() {

	// Se não estiver invencivel
	if (!invencivel && !protegido) {
		if (resistencia == 1) {
		
			// fica invencivel
			Instantiate(explosao, transform.position, transform.rotation);
			Invencibilidade(true);
			
			// Reinicializa
			combo = 0;
			weapons.power = 0;
			WeaponsBomb.bombs = bombsMax;
			
			// Cancela todos status
			Repair();
			
			// Reduz vidas ou instancia continueMenu
			if (playerLives == 0) {
				Destroy(gameObject);				
				Instantiate (continueMenu);
			} else {
				playerLives--;
			}
		} else {
			resistencia--;
			skins.Colorir("Danificado");
			Invencibilidade(true);
		}
	}
}

function Invencibilidade(ligar:boolean) {
	yield WaitForSeconds(0.01);
	invencivel = ligar;
	skins.piscar(ligar);
	
	if (ligar) {
		invencibilidade = Time.time + 3.0;
	}
}

//-------------------------STATUS----------------------------------	

// slow
private var slow : boolean = false;
private var tempoSlow: double = 0.0;
private var duracaoSlow: double = 3.0;

function Slow() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
	print("setou a velocidade: " + velInicial);
		velInicial = speed;
		speed = 1;
		slow = true;
		tempoSlow = Time.time + duracaoSlow;
		skins.Colorir("Slow");
	}
}

// haste
private var haste : boolean = false;
private var tempoHaste: double = 0.0;
private var duracaoHaste: double = 3.0;

function Haste() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
		velInicial = speed;
		speed = velMax;
		haste = true;
		tempoHaste = Time.time + duracaoHaste;
		skins.Colorir("Haste");
	}
}

// trava direcao
private var trava : boolean = false;
private var tempoTravado: double = 0.0;
private var duracaoTrava: double = 3.0;

function TravarDirecao() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
		other = gameObject.GetComponent(Player1Move);
		other.Travar(1);
		trava = true;
		tempoTravado = Time.time + duracaoTrava;
		skins.Colorir("TravaDirecao");
	}
}


// trava arma
private var travaArma : boolean = false;
private var tempoTravadoArma : double = 0.0;
private var duracaoTravaArma : double = 3.0;

function TravarArma() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
		travaArma = true;
		tempoTravadoArma = Time.time + duracaoTravaArma;
		skins.Colorir("TravaArma");
		weapons.travaArma = true;
		weaponsSecondary.travaArma = true;
		bombs.travaArma = true;
	}
}

// confusao
private var confuse : boolean = false;
private var tempoConfuse : double = 0.0;
private var duracaoConfuse : double = 3.0;

function Confuse() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
		var other = gameObject.GetComponent(Player1Move);
		//other.DoSomething ();
		other.confuse = true;
		confuse = true;
		tempoConfuse = Time.time + duracaoConfuse;
		skins.Colorir("Confusao");
	}
}

function Desarmar() {
	if (Universal.selected[3] == "Defense System" && weaponsSecondary.energyMeter >= 10) {
		weaponsSecondary.energyMeter -= 10;
	} else {
		WeaponsSecondary.energyMeter = 0;
		if (WeaponsBomb.bombs > 0) {
			WeaponsBomb.bombs -= 1;
		}
		if (WeaponsPrimary.carga > 0) {
			WeaponsPrimary.carga = 0;
		}
	}
}

//------------------------------------------------------------------itens
//power up
function Power() {
	if (weapons.power < 3) {
		weapons.power += 1;
	} else {
		PointsUp(2);
	}
}

//energyMeter up
function Energy(num) {
	if (num == 1) {
		if (WeaponsSecondary.energyMeter < 100) {
			WeaponsSecondary.energyMeter = 100;
		}
	} else {
		//print("corrigir aqui! - não deixar ultrapassar maxEnergy");
		WeaponsSecondary.energyMeter += 100;
	}
}

//points up
var x2 : GameObject;
function PointsUp(val) {
	switch (val) {
		case 1: score += 1000 * pointRate;
		break;
		case 2: score += 5000 * pointRate;
		break;
		case 3: score += 10000 * pointRate;
		break;
	}
	
	if(Universal.selected[0] == "Ace") {
		Instantiate(x2, transform.position, Quaternion(0,180,0,0));
	}
}

//power up
function Life() {
	playerLives++;
}

//bomb up
function BombUp() {
	WeaponsBomb.bombs++;
	
	if (Universal.selected[0] == "Bomber" || Universal.selected[0] == "Hyper") {
		Instantiate(x2, transform.position, Quaternion(0,180,0,0));
		WeaponsBomb.bombs++;
	}
}

//points down
function PointsDown(val) {

	switch (val) {
		case 1: val = 1000;
		break;
		case 2: val = 5000;
		break;
		case 3: val = 10000;
		break;
	}

	score -= val;	
	
	if (score < 0) {
		score = 0;
	}
}

//------------------------------------------------------------------dano asa
var WingL : boolean = true;
var WingR : boolean = true;
// danifica asa direita ou esquerda
function WingDown(asa) {
	if (asa == 0) {
		WingL = false;
	} else {
		WingR = false;
	}
	
	if (WingL == false && WingR == false) {
		velInicial = speed;
		velMax = 2;
		if (speed > 1) {
			speed = 2;
		}
		
		//print("ambas asas quebradas: " + velInicial);
	}
}

// restaura colliders das asas
function Repair() {
	WingL = true;
	WingR = true;
	
	if (Universal.selected[0] == "Light Armor" || Universal.selected[0] == "Hyper") {
		velMax = 10;
	} else {
		velMax = 5;
	}
	
	tempoSlow = 0;
	tempoHaste = 0;
	tempoTravado = 0;
	tempoTravadoArma = 0;
	tempoConfuse = 0;
	
	print("retornou a velocidade: " + velInicial);
	speed = velInicial;
	resistencia = resistenciaMax;
	audio.PlayOneShot(repair);
	
	
	retornarCorOriginal();
	
	// Restaura collider das asas e desliga emit da fumaça
	BroadcastMessage ("TurnCollider", 1);
	BroadcastMessage ("Desfumacar");
}

function retornarCorOriginal() {
	if (Universal.selected[0] == "Heavy Armor" || Universal.selected[0] == "Hyper") {
		if (resistencia == 1) {
			skins.Colorir("Danificado");
		} else {
			skins.Colorir("OriginalColor");
		}
	} else {
		skins.Colorir("OriginalColor");
	}
}