var isQuitBtn = false;
static var is2Players = false;

// dá pra
static var playersNumber = 1;

function Start() {
	Universal.stage = 0;
	Universal.substage = 0;
	
	Universal.caminho[0] = null;
	Universal.caminho[1] = null;
	Universal.caminho[2] = null;
	Universal.caminho[3] = null;
	Universal.caminho[4] = null;
	Universal.caminho[5] = null;
}

private var iniciado : boolean = false;
function Update() {
	
	if (!iniciado) {
		// up down player = 1 /2
		if (Input.GetButtonDown("Fire1")) {
			iniciado = true;
			Iniciar();
		}
	}
}

function Iniciar() {
	ZerarP1();
	
	playersNumber = 1;
	
	var som = Resources.Load("Audio/SE/Effects/se_start-continue");
	audio.PlayOneShot(som);
	yield WaitForSeconds(som.length);
	Application.LoadLevel("WeaponSelect");
}

/*
function OnMouseUp () {
	
	/*
	if (isQuitBtn) {
		Application.Quit();
	}
	
	
	else
	if (is2Players) {		
		ZerarP1();
		ZerarP2();
		playersNumber = 2;
		Application.LoadLevel("WeaponSelect");
	}
	
	else {	
		ZerarP1();
		playersNumber = 1;
		
		
		var som = Resources.Load("Audio/SE/Effects/se_start-continue");
		audio.PlayOneShot(som);
		yield WaitForSeconds(som.length);
		Application.LoadLevel("WeaponSelect");
	}
}
*/

// =============================================zera pontos, power, velocidade, vidas, bombas[energy] {staticas}
//zera P1
function ZerarP1() {
	Common.score = 0;
	WeaponsPrimary.power = 0;
	WeaponsSecondary.energyMeter = 0;
	Common.speed = 5;
	Common.playerLives = 3;
	WeaponsBomb.bombs = 3;
}

//zera P1
function ZerarP2() {
	Common2.score = 0;
	Common2.power = 0;
	Common2.speed = 5;
	Common2.playerLives = 3;
	//Common2.bombs = 3;
}