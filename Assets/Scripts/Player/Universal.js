// ligar pra dar build
static var PRODUCAO : boolean = false;

static var stage : int = 0;
static var substage : int = 0;
static var comboMultiplier : int = 1;
static var paused : boolean = false;
static var totalTime = new Array(6);

static var selected = new Array(5);
static var playerName = new Array(1);

static var caminho = new Array(5);
static var rankings = new Array(6);

// fronteiras
private var fronteiraV : double = 4.6;
private var fronteiraH : double = 6.2;

var common;
var bico;


static var aneisColetados : int = 0;

function Awake() {
	aneisColetados = 0;
	
	// inicializa tempo das fases
	if (!totalTime[0]) {
		totalTime[0] = 0;
	}
	
	if (!totalTime[1]) {
		totalTime[1] = 0;
	}
	
	if (!totalTime[2]) {
		totalTime[2] = 0;
	}
	
	if (!totalTime[3]) {
		totalTime[3] = 0;
	}
	
	if (!totalTime[4]) {
		totalTime[4] = 0;
	}
	
	if (!totalTime[5]) {
		totalTime[5] = 0;
	}
}

function Start() {
	// atalho pros componentes
	common = gameObject.GetComponent("Common");
	bico = GameObject.Find("Capsule");
	
	// inicializa equipamentos do jogador
	// nome
	if (!playerName[0]) {
		playerName[0] = "P1";
	}
	
	// armadura
	if (!selected[0]) {
		//selected[0] = "Light Armor";
		//selected[0] = "Heavy Armor";
		//selected[0] = "Charger";
		//selected[0] = "Shooter";
		//selected[0] = "Bomber";
		//selected[0] = "Stealth";
		//selected[0] = "Ace";
		selected[0] = "Hyper";
	}
	
		// arma primaria
	if (!selected[1]) {
		//selected[1] = "Machine Gun";
		//selected[1] = "Sonic Wave";
		//selected[1] = "Spreader";
		selected[1] = "Laser";
		//selected[1] = "Grenade";
		//selected[1] = "Venom";
		//selected[1] = "Blaster";
		//selected[1] = "???";
	}
	
	// arma secundaria
	if (!selected[2]) {
		//selected[2] = "Cannon";
		//selected[2] = "Shotgun";
		//selected[2] = "Wave";
		//selected[2] = "Mine";
		selected[2] = "Web Shot";
		//selected[2] = "Missile";
		//selected[2] = "Homing Missile";
		//selected[2] = "Missile Salvo";
	}
	
	// habilidade especial
	if (!selected[3]) {
		//selected[3] = "Ballistic Shield";
		//selected[3] = "Force Field";
		//selected[3] = "Agressive Shield";
		//selected[3] = "Time";
		//selected[3] = "Bit";
		selected[3] = "Hyperspace Warp";
		//selected[3] = "Hero's Fortune";
		//selected[3] = "Defense System";
	}
	
	// bomba
	if (!selected[4]) {
		selected[4] = "Anihilator";
		//selected[4] = "Nova Bomb";
		//selected[4] = "Time Stop";
		//selected[4] = "Hyper Mode";
		//selected[4] = "Energy Blast";
		//selected[4] = "Chemical Warfare";
		//selected[4] = "Flash";
		//selected[4] = "Black Hole";
	}	
	
	if (stage == 5) {
		fronteiraH = 2.5;
		fronteiraV = 2;
	}
}

function Update() {
	if (stage != 5) {
		if (transform.position.z < 0 || transform.position.z > 0) {	transform.position.z = 0; }
	} else {
		if (transform.position.z != 8 ) { transform.position.z = 8; }
	}

	// Impede que o jogador saia da tela
	if (transform.position.x >= fronteiraH)		{ transform.position.x = fronteiraH - 0.1; }
	if (transform.position.x <= 0 - fronteiraH)	{ transform.position.x = 0 - fronteiraH + 0.1; }
	if (transform.position.y >= fronteiraV)		{ transform.position.y = fronteiraV - 0.1; }
	if (transform.position.y <= 0 - fronteiraV)	{ transform.position.y = 0 - fronteiraV + 0.1; }
}