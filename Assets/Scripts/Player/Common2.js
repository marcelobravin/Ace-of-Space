var weapons;
var bombs;
var bombsMax : int = 3;
var weaponsSecondary;
var skins;


var velMax : int = 5;
var velInicial: int = velMax;
var resistencia : int = 1;
var resistenciaMax : int = 1;
var pointRate : int = 1;

function Start () {

	

	bico = GameObject.Find("Capsule");
	weapons = bico.GetComponent("WeaponsPrimary");
	weaponsSecondary = bico.GetComponent("WeaponsSecondary");
	bombs = bico.GetComponent("WeaponsBomb");
	skins = GameObject.FindWithTag("ShipBody").GetComponent("ChangeSkin");
	
	
	yield WaitForSeconds(0.01);
	ArmorDefine();
}

function ArmorDefine() {	
		
	if(Universal.selected[0] == "Light Armor") {
		velMax = 10;		
	}
	
	if(Universal.selected[0] == "Heavy Armor") {
		resistencia = 2;
		resistenciaMax = 2;
	}
	
	if(Universal.selected[0] == "Bomber") {		
		bombsMax = 5;
		if (WeaponsBomb.bombs < bombsMax) {
			WeaponsBomb.bombs = 5;
		}		
	}
	
	if(Universal.selected[0] == "Ace") {
		pointRate = 2;
	}
	
	if(Universal.selected[0] == "Hyper") {
		velMax = 10;
		resistencia = 2;
		resistenciaMax = 2;
		
		bombsMax = 5;
		if (WeaponsBomb.bombs < bombsMax) {
			WeaponsBomb.bombs = 5;
		}	
	}
	velInicial = velMax;
	InvokeRepeating("ComboOut", 0.0001, 0.0001);
}

function ComboOut() {
	if (combo > 0) {
		combo--;
	}
	
	if (combo > 10000) {
		combo = 10000;
	}
}


// criar tela de intro e de fim de jogo com nave vista de outros angulos

// corrigir retorno a cor original depois de morrer com status
// colocar script nas particulas para identificar orientação de fase
// comprar cor
// comprar dificuldade ou abrir qdo vc termina
// corrigir box collider botões ok
 // impedir uso de habilidade especial qdo estiver sem energy
 // fazer não sumir tiro qdo pJ ta invecivel
 // pause aperecer menu

// corrigir mov escudo
// corrigir morte
// barrinha
//function OnCollisionStay (otherObject: Collider){

//#pragma strict

// soltar tiro carregado depois de parar de carregar tiro durante pause

static var speed : int = 5;
static var playerLives: int = 3;
static var score : int;
static var combo : int = 0;




var explosao : Transform;
private var shipbody : GameObject;

// estados
private var duracao : double = 0;
//private var status = "normal";


private var bit : boolean = false;
//private var shield : int = 0;


 function Update() {
 // pause off
	if (Universal.paused == false) {
		//acelerar
		if (Input.GetButtonDown("Speed up") && (speed < velMax) && (slow == false)) {
			speed++;
			BroadcastMessage("Jet", 1);
			
		}

		if (Input.GetButtonDown("Speed down") && (speed>1) && (haste == false)) {
			speed--;
			BroadcastMessage("Jet", 0);
		}
		
		
		
	
		
		//acabar invencibilidade
		if (invencivel) {
			if (Time.time >= invencibilidade) {
				skins.piscar(false);
				invencivel = false;
			}
		}
		
		// slow
		if (slow) {
			if (Time.time > tempoSlow) {
				slow = false;
				skins.Colorir("OriginalColor");
			}
		}
		
		// haste
		if (haste) {
			if (Time.time > tempoHaste) {
				haste = false;
				skins.Colorir("OriginalColor");
			}
		}
		
		// trava direcao
		if (trava) {
			//transform.Translate(Vector3.left * 0.1);
			if (Time.time > tempoTravado) {
				other = gameObject.GetComponent(Player1Move);
				// Call the function DoSomething on the script
				other.Travar(0);	
				trava = false;
				skins.Colorir("OriginalColor");
			}
		}
		
		// trava arma
		if (travaArma) {
			if (Time.time > tempoTravadoArma) {
				travaArma = false;
				weapons.travaArma = false;
				weaponsSecondary.travaArma = false;
				bombs.travaArma = false;
				skins.Colorir("OriginalColor");
			}
		}
		
		// trava arma
		if (confuse) {
			if (Time.time > tempoConfuse) {
				other = gameObject.GetComponent(Player1Move);
				// Call the function DoSomething on the script
				//other.DoSomething ();
				// set another variable in the other script instance
				other.confuse = false;
				confuse = false;
				skins.Colorir("OriginalColor");
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




var continueMenu : GameObject;
private var invencibilidade : double = 0.0;
var invencivel : boolean = false;
var protegido : boolean = false;

//Morrer
function Dead() {

	// Se não estiver invencivel
	if (!invencivel && !protegido) {
		if (resistencia == 1) {
		
			// fica invencivel
			invencivel = true;
			skins.piscar(true);
			Instantiate(explosao, transform.position, transform.rotation);
			invencibilidade = Time.time + 3.0;
			
			// Reinicializa
			combo = 0;
			weapons.power = 0;
			WeaponsBomb.bombs = bombsMax;
			
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
			invencivel = true;
			skins.piscar(true);
			invencibilidade = Time.time + 3.0;	
		}
		
		
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
			WeaponsBomb.carga = 0;
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
	if (num == 2) {
		WeaponsSecondary.energyMeter = 100;
	} else {
		print("corrigir aqui! - não deixar ultrapassar maxEnergy");
		WeaponsSecondary.energyMeter += 50;
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
		velMax = 2;
		speed = 2;
		// reduzir emissor de particulas
	}
}


// restaura colliders das asas
function Repair() {
	WingL = true;
	WingR = true;
	velMax = velInicial;
	
	// Restaura collider das asas e desliga emit da fumaça
	BroadcastMessage ("TurnCollider", 1);
	BroadcastMessage ("Desfumacar");
	
	resistencia = resistenciaMax;
}