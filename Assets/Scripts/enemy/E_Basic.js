var enemySpeed : double = 0;
var enemyLife : int = 1;
var poisonLevel : int = 0;
var tempoRegen : double = 0.0;

// tipo de inimigo
var isBoss : boolean = false;
var isMultiplier : boolean = false;
var isSmoker : boolean = true;

var explosao : Transform;
var bala : GameObject;
var item : Transform;
var shine : Transform;

private var enemyLifeMax : int;
private var enemyValue : int;
private var manager;
private var originalColor;

function Awake() {
	// informa a fase q um inimigo apareceu
	manager = GameObject.Find("Main Camera").GetComponent("Stages");	
	manager.SetEnemyNum(manager.GetEnemyNum() + 1);
	
	// Inicializa variáveis
	originalColor = transform.renderer.material.color;	
	enemyLifeMax = enemyLife;
	enemyValue = enemyLife * 100;
}

// memoriza cor inicial
function Start() {
	
	// Se regenerator ---> se tempoRegen > 0
	//if (isRegenerator) {
	if (tempoRegen > 0) {
		InvokeRepeating("Regenerar", tempoRegen, tempoRegen);
	}
	
	// Fumaca
	// Não deve ser aplicado a:
	// obstaculos
	// simple (tijolo, tijolinho)
	// bubble
	// desaparecer deve incluir detach smoke
	if (isSmoker) {
		var fuma = Resources.Load("Particles/FumacaDano");
		var temp = Instantiate(fuma, transform.position, Quaternion(0,0,0,0));
		temp.transform.parent = transform;
	}
	
	InvokeRepeating("Veneno", 1, 0.5);
}

function Veneno() {
	if (poisonLevel > 0) {
		Hit(1);
		Common.score += 100;
		//intervaloVeneno = Time.time + 1.0;
		poisonLevel--;
		// acabar efeito do veneno
		if (poisonLevel <= 0) {
			transform.renderer.material.color = originalColor;
		}
	}
}

///////////////////////////////////////////////////////////////////////////FUNÇÕES
private var lifepercentage : double = 0.0;
function Hit(bulletPower){
	
	avermelhar();
	
	if (bulletPower != 0) {
		enemyLife -= bulletPower;
	} else {
		enemyLife /= 2;
	}
	
	if (enemyLife <= 0) {
		Bonificar(1);
		explodir();
	}
	
	if (GetComponent("E_Shrinker")) {
		GetComponent("E_Shrinker").Tamanho(bulletPower);
	}
	
	// teste fumaca
	if (isSmoker) {
		var fumaca = transform.Find("FumacaDano(Clone)");
		if (fumaca) {
			lifepercentage = (enemyLife / enemyLifeMax) * 10;
			fumaca.particleEmitter.minEmission = 10 - lifepercentage;
			fumaca.particleEmitter.maxEmission = 10 - lifepercentage;
			
			if (enemyLife <= 0) {
				fumaca.particleEmitter.emit = false;
				fumaca.transform.parent = null;
			}
		}
	}
	
	// informa a fase q um inimigo foi atingido
	manager.SetAccuracy(manager.GetAccuracy() + 1);
}

// continuo
function Continuo(veneno){
	poisonLevel += veneno;
	transform.renderer.material.color = Color.green;
}

function avermelhar() {
	// brilha
	transform.renderer.material.color = Color.white;
	yield WaitForSeconds (0.03);
	transform.renderer.material.color = Color.red;
	yield WaitForSeconds (0.08);
	
	//retorna a cor original
	if (poisonLevel > 0) {
		transform.renderer.material.color = Color.green;
	} else {
		transform.renderer.material.color = originalColor;
	}
}

// RECOMPENSAR PLAYER PELA DESTRUIÇÃO DO INIMIGO
function Bonificar(playerNumber) {
	if (playerNumber == 1) {
		Common.score += enemyValue * Universal.comboMultiplier;
		Common.combo += enemyValue;
	}
}

/////////////////////////////MORRER
function explodir() {

	if (explosao) {
		Instantiate (explosao, transform.position, transform.rotation);
	}
	
	if (isBoss) {
		GameObject.Find("Main Camera").GetComponent("Stages").StageComplete();
		gameObject.SendMessageUpwards ("BossDead");
	}
	
	if (isMultiplier) {
		GetComponent("E_Multiplier").Semear();
	}
	
	if (bala) {
		Vingar();
	}
	
	if (item) {
		Instantiate(item, transform.position, Quaternion(0,0,0,0));
	}
	
	// informa a fase q um inimigo foi abatido
	if (manager) {
		manager.SetEnemyDown(manager.GetEnemyDown() + 1);
	}
	Destroy(gameObject);
}

// AVENGER
function Vingar() {
	// mira no player
	
	if (GameObject.FindWithTag("Player")) {
		lookAtTarget = GameObject.FindWithTag("Player").transform;
		transform.LookAt(lookAtTarget);	
	}
	
	// atira com a arma anexada
	var temp = Instantiate(bala, transform.position, transform.rotation);
	if (temp.GetComponent("E_Bullet")) { // Gamb pro mine time por invoca starshot [q nao tem e_bullet]
		temp.GetComponent("E_Bullet").bulletSpeed = 2;
	}
}

// Regeneração
function Regenerar() {
	if (enemyLife < enemyLifeMax) {
		enemyLife++;
		
		if (shine) {
			Instantiate(shine, transform.position, transform.rotation);
		}
	}
}

// Função pra inimigos e balas inimigas
function OnTriggerEnter ( other: Collider) {

	// Se bater no player
	// Corpo
	if (other.gameObject.tag == ("Player") || other.gameObject.tag == ("Bico1")) {		
		var pan = gameObject.FindWithTag("Player").GetComponent("Common");
		if (!pan.invencivel && !pan.protegido) {
			gameObject.FindWithTag("Player").SendMessage ("Dead");
			Hit(1);
		}
	}
	
	// Asas
	if (other.gameObject.tag == ("Wing")) {
		pan = gameObject.FindWithTag("Player").GetComponent("Common");
		if (!pan.invencivel && !pan.protegido) {
			other.SendMessage ("Break");
			Hit(1);
		}
	}
}

function Web(){
	var pan;
	
	if (GetComponent("FallScript")) {
		pan = GetComponent("FallScript");
		Frear(pan);
	} else if (transform.parent) {
		if (transform.parent.GetComponent("FallScript")) {
			pan = transform.parent.GetComponent("FallScript");
			Frear(pan);
		}
		
		if (transform.parent.GetComponent("ZigZag")) {
			pan = transform.parent.GetComponent("ZigZag");
			Frear(pan);
		}
		
		if (transform.parent.GetComponent("Track")) {
			pan = transform.parent.GetComponent("Track");
			Frear(pan);
		}
		
		if (transform.parent.GetComponent("TrackL")) {
			pan = transform.parent.GetComponent("TrackL");
			Frear(pan);
		}
	}
}

// Lerdea
function Frear(pan) {
	var tempo : int = 1;
	var reducao : double = 3;
	
	pan.speed /= reducao;
	yield WaitForSeconds(tempo);
	pan.speed *= reducao;
}