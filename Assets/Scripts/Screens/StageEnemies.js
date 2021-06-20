//#pragma strict

var boss : GameObject;

// Lista de inimigos, suas posiçoes e intervalos
private var i : int = 0;
private var inimigos = new Array();
private var posicoes = new Array();
private var inter = new Array();

// Variaveis auxiliares
private var hora : double = 1.0;
private var enemyRot = Vector3(0, 0, 0);
private var bossReady = false;
private var posicao = Vector3(0,0,0);

// AMBTST
private var acelerado : boolean = false;

function Start() {
	switch (Universal.stage) {
		case 1:
			Fase1();
		break;
		
		case 2:
			Fase2(Universal.substage);
			enemyRot = Vector3(0, 0, 270);
		break;
		
		case 3:
			Fase3(Universal.substage);
			enemyRot = Vector3(0, 0, 180);
		break;
		
		case 4:
			Fase4(Universal.substage);
			enemyRot = Vector3(0, 0, 90);
		break;
	}
	print(inimigos.length + " inimigos");
}

//function Update() {
function FixedUpdate() {
	// Qdo chega a hora
	if (Time.time >= hora) {
		Instanciar();
	}
	// AMBTST - controle de intervalo
	if (!Universal.PRODUCAO) {
		if (Input.GetKeyDown("1")) {
			
			if (acelerado) {
				acelerado = false;
				print("normal");
			} else {
				acelerado = true;
				print("acelerado");
			}
		}
	}
}

function Instanciar() {
	
	if (i < inimigos.length) {
		callEnemy(); // Inimigo comum
		i++;
		if (i == inimigos.length) {
			callAlert(); // Se acabou a lista
		}
	} else {
		if (!bossReady) {
			bossReady = true;
			callBoss(); // Boss
		}
	}	
}

function callEnemy() {
	switch (Universal.stage) {
		case 1: posicao = Vector3(-9, posicoes[i], 0);
		break;
		case 2: posicao = Vector3(posicoes[i], 8, 0);
		break;
		case 3: posicao = Vector3(9, posicoes[i], 0);
		break;
		case 4: posicao = Vector3(posicoes[i], -8, 0);
		break;
	}
	
	// Instancia inimigos e rotaciona conforme a fase
	var	temp2 = Instantiate(inimigos[i], posicao, inimigos[i].transform.rotation);
	temp2.transform.Rotate(enemyRot);
	
	// AMBTST
	if (!Universal.PRODUCAO) {
		print("Inimigo: "+ i +" ("+inimigos[i].name+") "+" "+ posicao);
		if (acelerado) {
			inter[i] = 0.1;
		}
	}
			
	// Define hora de aparecer próximo inimigo
	hora = Time.time + inter[i];
}

function callAlert() {
	yield WaitForSeconds(7);
	audio.Stop();
	var alert = Resources.Load("Effects/Alert");
	Instantiate(alert, Vector3(0,0,5), Quaternion(0,0,0,0));
	
	var grunhido = Resources.Load("Audio/SE/Sci fi computer PA middle aged female voice says warning_BLASTWAVEFX_28863");
	audio.loop = true;
	audio.clip = grunhido;
	audio.Play();
	
	// Inimigos com e_position vao embora
    var enemyArray = GameObject.FindGameObjectsWithTag("Enemy");
    for (var enemy in enemyArray) {
	    if (enemy.GetComponent("E_Positioning")) {
	    	enemy.GetComponent("E_Positioning").GoAway();
	    }
	}
}

function callBoss() {
			
	// Define posição do boss
	switch (Universal.stage) {
		case 1: posicao = Vector3(-14, 0, 0);
		break;
		case 2: posicao = Vector3(0, 12, 0);
		break;
		case 3: posicao = Vector3(14, 0, 0);
		break;
		case 4: posicao = Vector3(0, -12, 0);
		break;
	}
	
	// Instancia boss
	yield WaitForSeconds(9.8);
	temp = Instantiate(boss, posicao, boss.transform.rotation);
	
	// Carrega e toca musica do chefao
	var bossSong : AudioClip = Resources.Load("Audio/BGM/B-Tenth_Nail");
	audio.clip = bossSong;
	audio.Play();
	
	// Remove esse script
	Destroy(this);
}

// Define inimigo de acordo com valores recebidos
function Definir(inimigo:String, posicao:double, intervalo:double) {
	inimigos.Push(Resources.Load(inimigo));
	posicoes.Push(posicao);
	inter.Push(intervalo);
}

//=================================================================
function Fase1() {
	// Inimigo: 0
	Definir("Enemies/Family/F_spaceship", 0, 4);
	Definir("Enemies/Family/F_spaceship", 2, 4);
	Definir("Enemies/Family/F_spaceship", -2, 4);
	Definir("Enemies/Family/F_NaveP", 3, 4);
	Definir("Enemies/Family/F_NaveP", -3, 7);
	Definir("Enemies/Family/F_spaceship", 2, 4);
	Definir("Enemies/Family/F_spaceship", -2, 4);
	Definir("Enemies/Naves/AstraShuttlePrefab", 0, 4);
	Definir("Obstacles/Complex/SunRing", 0, 4); // =========================1
	Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
	
	// Inimigo: 10
	Definir("Enemies/Family/F_NaveP", 4, 3);
	Definir("Enemies/Family/F_NaveP", -4, 3);
	Definir("Enemies/Family/F_NaveG", 0, 3);
	Definir("Enemies/Naves/Fighter", 3, 3);
	Definir("Enemies/Naves/Fighter", -3, 3);
	Definir("Enemies/Naves/AstraShuttlePrefab", 0, 3);
	Definir("Enemies/Carrier/CarrierRandomP", 0, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
	Definir("Enemies/Family/F_NaveP", -4, 3);
	Definir("Enemies/Naves/AstraShuttlePrefab", 0, 3);
	
	// Inimigo: 20
	Definir("Enemies/Family/F_NaveP", 4, 3);
	Definir("Enemies/Family/F_NaveG", 0, 3);
	Definir("Enemies/Naves/Fighter", 0, 3);
	Definir("Enemies/Naves/AstraShuttlePrefab", 2, 0);
	Definir("Enemies/Naves/AstraShuttlePrefab", -2, 3);
	Definir("Enemies/Family/F_spaceship", 1, 3);
	Definir("Enemies/Family/F_spaceship", -1, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
	Definir("Enemies/Carrier/CarrierRandomM", 0, 3);
	Definir("Enemies/Family/F_spaceship", 2, 3);
	
	// Inimigo: 30
	Definir("Enemies/Family/F_spaceship", -2, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
	Definir("Enemies/Naves/PlayerEnemy", 0, 10);
	Definir("Enemies/Family/F_NaveP", 3, 3);
	Definir("Enemies/Family/F_NaveP", -3, 7);
	Definir("Enemies/Naves/AstraShuttlePrefab", 3, 0);
	Definir("Enemies/Naves/AstraShuttlePrefab", -3, 3);
	Definir("Enemies/Naves/Fighter", -3, 0);
	Definir("Enemies/Naves/Fighter", 3, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
	
	// Inimigo: 40
	Definir("Enemies/Family/F_spaceship", 0, 3);
	Definir("Enemies/Family/F_NaveP", 2, 3);
	Definir("Enemies/Family/F_NaveP", -2, 3);
	Definir("Enemies/Family/F_NaveG", 3, 7);
	Definir("Enemies/Family/F_NaveG", -3, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
	Definir("Enemies/Family/F_spaceship", 2, 3);
	Definir("Enemies/Family/F_spaceship", -2, 3);
	Definir("Enemies/Naves/Fighter", -3, 0);
	Definir("Enemies/Naves/Fighter", 3, 3);
	
	// Inimigo: 50
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
	Definir("Enemies/Family/F_NaveP", 3, 3);
	Definir("Enemies/Family/F_NaveP", -3, 7);
	Definir("Enemies/Family/F_spaceship", 2, 3);
	Definir("Enemies/Family/F_spaceship", -2, 3);
	Definir("Enemies/Naves/Fighter", -3, 0);
	Definir("Enemies/Naves/Fighter", 3, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
	Definir("Enemies/Family/F_NaveP", 3, 3);
	Definir("Enemies/Family/F_NaveP", -3, 7);
	
	// Inimigo: 60
	Definir("Enemies/Naves/AstraShuttlePrefab", 3, 0);
	Definir("Enemies/Naves/AstraShuttlePrefab", -3, 3);
	Definir("Enemies/Family/F_spaceship", 2.5, 3);
	Definir("Enemies/Family/F_spaceship", -2.5, 3);
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
	Definir("Enemies/Family/F_spaceship", 0, 3);
	Definir("Enemies/Naves/AstraShuttlePrefab", 3, 0);
	Definir("Enemies/Naves/AstraShuttlePrefab", -3, 3);
	Definir("Enemies/Naves/Fighter", -3, 0);
	Definir("Enemies/Naves/Fighter", 3, 3);
	
	// Inimigo: 70
	Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
	Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
}

//=================================================================
function Fase2(estagio) {
	switch (estagio) {
		case 1:
			// Inimigo: 0
			Definir("Obstacles/Simple/BlocoG", 8.3, 0);
			Definir("Obstacles/Simple/BlocoG", -8.3, 2);
			Definir("Enemies/Family/F_Spaceship", 0, 4);
			Definir("Enemies/Family/F_NaveG", 1, 4);
			Definir("Enemies/Family/F_NaveG", -1, 4);
			Definir("Enemies/Naves/GordoShip", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 5); // =========================1
			Definir("Enemies/Family/F_spaceship", -3, 4);
			Definir("Enemies/Family/F_spaceship", 3, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			
			// Inimigo: 10
			Definir("Enemies/Naves/GordoShip", 0, 4);
			Definir("Enemies/Family/F_NaveG", -3, 4);
			Definir("Enemies/Family/F_NaveG", 3, 4);
			Definir("Enemies/Naves/Fighter", 2, 4);
			Definir("Enemies/Naves/Fighter", -2, 1);
			Definir("Obstacles/Simple/BlocoG", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			Definir("Enemies/Naves/GordoShip", 0, 4);
			Definir("Enemies/Naves/GordoShip", -3, 4);
			
			// Inimigo: 20
			Definir("Enemies/Naves/GordoShip", 3, 4);
			Definir("Enemies/Naves/Fighter", 4, 4);
			Definir("Enemies/Naves/Fighter", -4, 4);
			Definir("Enemies/Family/F_NaveG", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================3
			Definir("Obstacles/Simple/BlocoG", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/PlayerEnemy", 0, 10);
			Definir("Obstacles/Simple/BlocoG", -6, 4);
			
			// Inimigo: 30
			Definir("Obstacles/Simple/BlocoG", 6, 4);
			Definir("Enemies/Naves/GordoShip", -5, 4);
			Definir("Enemies/Naves/GordoShip", 5, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			Definir("Enemies/Family/F_NaveG", 0, 4);
			Definir("Obstacles/Simple/BlocoG", -5, 3);
			Definir("Enemies/Naves/Fighter", 2, 3);
			Definir("Enemies/Naves/Fighter", 4, 4);
			Definir("Obstacles/Simple/BlocoG", 5, 3);
			Definir("Enemies/Naves/Fighter", -2, 3);
			
			// Inimigo: 40
			Definir("Enemies/Naves/Fighter", -4, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Naves/GordoShip", 0, 4);
			Definir("Enemies/Naves/GordoShip", -2, 4);
			Definir("Enemies/Naves/GordoShip", 2, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Obstacles/Simple/BlocoG", 8.5, 0);
			Definir("Obstacles/Simple/BlocoG", -8.5, 1);
			Definir("Enemies/Naves/GordoShip", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================6
			
			// Inimigo: 50
			Definir("Obstacles/Complex/O_Cross2", 3, 3);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/GordoShip", -3, 4);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Obstacles/Complex/SunRing", -5, 4); // =========================7
			Definir("Obstacles/Simple/BlocoG", 0, 6);
			Definir("Obstacles/Complex/O_Cross2", -2, 6);
			Definir("Obstacles/Simple/BlocoG", 3, 4);
			
			// Inimigo: 60
			Definir("Enemies/Naves/GordoShip", -4, 3);
			Definir("Enemies/Naves/GordoShip", -2, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Obstacles/Simple/BlocoG", -3, 3);
			Definir("Enemies/Naves/GordoShip", 4, 3);
			Definir("Enemies/Naves/GordoShip", 2, 3);
			Definir("Obstacles/Simple/BlocoG", 5, 3);
			Definir("Enemies/Naves/GordoShip", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Obstacles/Simple/BlocoG", 0, 3);
			
			// Inimigo: 70
			Definir("Enemies/Naves/Fighter", 6, 4);
			Definir("Enemies/Naves/GordoShip", 4, 0);
			Definir("Enemies/Naves/GordoShip", -4, 9);
			Definir("Enemies/Naves/Fighter", -6.2, 0);
			Definir("Obstacles/Simple/BlocoG", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
		break;		
		
		case 2:
			// Inimigo: 0
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================1
			Definir("Enemies/Family/F_spaceship", -3, 4);
			Definir("Enemies/Family/F_spaceship", 3, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/AstraShuttlePrefab", 0, 5);
			Definir("Enemies/Family/F_NaveP", -4, 4);
			Definir("Enemies/Family/F_NaveP", 4, 4);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Outros/Asteroid1", 3, 4);
			Definir("Enemies/Outros/Asteroid1", -3, 4);
			
			// Inimigo: 10
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Obstacles/Complex/SunRing", -3, 3); // =========================2
			Definir("Enemies/Naves/Fighter", 2, 4);
			Definir("Enemies/Naves/Fighter", -2, 4);
			Definir("Enemies/Outros/Asteroid2", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Outros/Asteroid1", 3, 4);
			Definir("Enemies/Outros/Asteroid1", -3, 4);
			Definir("Enemies/Naves/Fighter", 4, 0);
			Definir("Enemies/Naves/Fighter", -4, 4);
			
			// Inimigo: 20
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Enemies/Outros/Asteroid1", 3, 4);
			Definir("Enemies/Outros/Asteroid1", -3, 3);
			Definir("Obstacles/Complex/O_Bar2", -3, 3);
			Definir("Enemies/Outros/Asteroid1", 3, 3);
			Definir("Obstacles/Complex/O_Bar", 3, 3);
			Definir("Enemies/Outros/Asteroid1", -3, 3);
			Definir("Obstacles/Complex/O_Bar2", -3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			
			// Inimigo: 30
			Definir("Enemies/Naves/PlayerEnemy", 0, 10);
			Definir("Obstacles/Complex/O_Bar", 3, 5);
			Definir("Obstacles/Complex/O_Bar2", -3, 5);
			Definir("Obstacles/Complex/O_Bar", 4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Obstacles/Complex/O_Bar2", -4, 5);
			Definir("Enemies/Outros/Asteroid2", 4, 5);
			Definir("Enemies/Outros/Asteroid2", -4, 5);
			Definir("Enemies/Naves/Fighter", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			
			// Inimigo: 40
			Definir("Enemies/Family/F_NaveP", 3, 4);
			Definir("Enemies/Family/F_NaveP", -3, 4);
			Definir("Obstacles/Complex/O_Bar", 3, 3);
			Definir("Enemies/Outros/Asteroid2", -4, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			Definir("Obstacles/Complex/O_Bar2", -3, 3);
			Definir("Enemies/Outros/Asteroid3", 4, 3);
			Definir("Obstacles/Complex/O_Bar", 4, 3);
			Definir("Enemies/Outros/Asteroid3", -3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			
			// Inimigo: 50
			Definir("Obstacles/Complex/O_Bar2", -4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Enemies/Outros/Asteroid3", 4, 0);
			Definir("Enemies/Outros/Asteroid2", 0, 0);
			Definir("Enemies/Outros/Asteroid3", -4, 3);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
		break;
	}
}
//=================================================================
function Fase3(estagio) {
	switch (estagio) {
		case 1:
			// Inimigo: 0
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/OVNI", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================1
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/Buzzbot", -2, 3);
			Definir("Enemies/Naves/Buzzbot", 2, 3);
			
			// Inimigo: 10
			Definir("Enemies/Naves/Buzzbot", -3, 3);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/OVNI", 0, 3);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 1.5, 0);
			Definir("Enemies/Naves/FighterSlim", -1.5, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================2
			Definir("Enemies/Family/F_Mine", 0, 6);
			Definir("Enemies/Family/F_Mine", 0, 2);
			
			// Inimigo: 20
			Definir("Enemies/Carrier/CarrierRandomG", -4, 4);
			Definir("Enemies/Family/F_Mine", 0, 6);
			Definir("Enemies/Family/F_Mine", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 2, 4);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Naves/OVNI", 0, 6);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================3
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/OVNI", 1, 0);
			
			// Inimigo: 30
			Definir("Enemies/Naves/OVNI", -1, 4);
			Definir("Enemies/Naves/FighterSlim", 1, 0);
			Definir("Enemies/Naves/FighterSlim", -1, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================4
			Definir("Enemies/Naves/Buzzbot", 2, 0);
			Definir("Enemies/Naves/Buzzbot", -2, 2);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/PlayerEnemy", 0, 10);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			
			// Inimigo: 40
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================5
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/OVNI", 0, 4);
			Definir("Enemies/Family/F_spaceship", 2, 4);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			
			// Inimigo: 50
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================6
			Definir("Enemies/Family/F_Mine", 0, 6);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Family/F_spaceship", -2, 4);
			Definir("Enemies/Family/F_Mine", 0, 6);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Naves/OVNI", 0, 6);
			Definir("Enemies/Naves/FighterSlim", 1, 0);
			Definir("Enemies/Naves/FighterSlim", -1, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================7
			
			// Inimigo: 60
			Definir("Enemies/Family/F_Mine", 0, 6);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Naves/Buzzbot", 3, 3);
			Definir("Enemies/Naves/Buzzbot", -3, 3);
			Definir("Enemies/Naves/OVNI", 0, 6);
			Definir("Enemies/Naves/Buzzbot", 2, 3);
			Definir("Enemies/Naves/Buzzbot", -2, 3);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================8
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			
			// Inimigo: 70
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================9
			Definir("Enemies/Naves/Buzzbot", 0, 2);
			Definir("Enemies/Naves/Buzzbot", 3, 3);
			Definir("Enemies/Naves/Buzzbot", -3, 3);
			Definir("Enemies/Naves/Buzzbot", 3, 3);
			Definir("Enemies/Naves/Buzzbot", -3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================10
			Definir("Enemies/Naves/FighterSlim", 2, 0);
			Definir("Enemies/Naves/FighterSlim", -2, 3);
			
			// Inimigo: 80
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
		break;
		
		case 2:
			// Inimigo: 0
			Definir("Enemies/Naves/TrackerL", -4.3, 4);
			Definir("Enemies/Naves/TrackerR", 4.3, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================1
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/Buzzbot", 2, 4);
			Definir("Enemies/Naves/Buzzbot", -2, 4);
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Enemies/Naves/OrbTurret", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			
			// Inimigo: 10
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================2
			Definir("Enemies/Naves/Buzzbot", 1, 4);
			Definir("Enemies/Naves/Buzzbot", -1, 4);
			Definir("Enemies/Naves/SpaceStation", 2, 8);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Enemies/Naves/TrackerL", -4.3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================3
			Definir("Enemies/Naves/TrackerR", 4.3, 4);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			
			// Inimigo: 20
			Definir("Enemies/Naves/Buzzbot", 3, 2);
			Definir("Enemies/Naves/Buzzbot", -3, 2);
			Definir("Enemies/Naves/Buzzbot", 3, 2);
			Definir("Enemies/Naves/Buzzbot", -3, 2);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================4
			Definir("Enemies/Naves/TrackerL", -4.3, 0);
			Definir("Enemies/Naves/TrackerR", 4.3, 4);
			Definir("Enemies/Family/F_spaceship", 2, 4);
			Definir("Enemies/Naves/SpaceStation", 2, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			
			// Inimigo: 30
			Definir("Enemies/Naves/FighterSlim", 2, 4);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================5
			Definir("Enemies/Naves/Buzzbot", 3, 1);
			Definir("Enemies/Naves/Buzzbot", -3, 1);
			Definir("Enemies/Naves/Buzzbot", 2, 1);
			Definir("Enemies/Naves/Buzzbot", -2, 3);
			Definir("Enemies/Naves/TrackerL", -4.3, 4);
			Definir("Enemies/Naves/TrackerR", 4.3, 4);
			
			// Inimigo: 40
			Definir("Enemies/Naves/FighterSlim", 2, 0);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Naves/PlayerEnemy", 0, 4);
			Definir("Enemies/Naves/SpaceStation", 2, 4);
			Definir("Enemies/Naves/Buzzbot", 2, 4);
			Definir("Enemies/Naves/Buzzbot", -2, 4);
			Definir("Enemies/Naves/Buzzbot", 3, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================6
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			
			// Inimigo: 50
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/OrbTurret", 2, 4);
			Definir("Enemies/Naves/OrbTurret", -2, 4);
			Definir("Enemies/Naves/TrackerL", -4.3, 4);
			Definir("Enemies/Naves/TrackerR", 4.3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================7
			Definir("Enemies/Naves/SpaceStation", 2, 4);
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			
			// Inimigo: 60
			Definir("Enemies/Naves/OrbTurret", -2, 4);
			Definir("Enemies/Naves/OrbTurret", 2, 4);
			Definir("Enemies/Naves/Buzzbot", -3, 4);
			Definir("Enemies/Naves/SpaceStation", 2, 4);
			Definir("Enemies/Family/F_spaceship", 2, 4);
			Definir("Enemies/Family/F_spaceship", -2, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================8
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================9
			
			// Inimigo: 70
			Definir("Enemies/Naves/Buzzbot", 0, 1);
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================10
		break;
		
		
		case 3:
			// Inimigo: 0
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================1
			Definir("Enemies/Naves/GordoShip", 3, 4);
			Definir("Enemies/Naves/GordoShip", -3, 4);
			Definir("Enemies/Naves/GordoShip", 2, 4);
			Definir("Enemies/Naves/GordoShip", -2, 4);
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			
			// Inimigo: 10
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================2
			Definir("Enemies/Naves/GordoShip", 3, 4);
			Definir("Enemies/Naves/GordoShip", -3, 4);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Enemies/Family/F_Mine", 0, 1);
			Definir("Enemies/Naves/GordoShip", 0, 2);
			Definir("Enemies/Naves/SpaceStation", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================3
			Definir("Enemies/Naves/GordoShip", 0, 3);
			Definir("Enemies/Family/F_Mine", 0, 1);
			
			// Inimigo: 20
			Definir("Enemies/Naves/FighterSlim", 0, 2);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Family/F_Mine", 0, 2);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================4
			Definir("Enemies/Naves/FighterSlim", 3, 0);
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Obstacles/Complex/O_Closing2", 0, 4);
			Definir("Enemies/Naves/GordoShip", 3.5, 4);
			Definir("Enemies/Naves/GordoShip", -3.5, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			
			// Inimigo: 30
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/O_Closing2", 3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================5
			Definir("Obstacles/Complex/O_Closing2", -3, 4);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Enemies/Naves/GordoShip", 3.5, 10);
			Definir("Enemies/Naves/GordoShip", -3.5, 4);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Enemies/Naves/PlayerEnemy", 0, 10);
			Definir("Enemies/Naves/PasserH", 0, 4);
			
			// Inimigo: 40
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================6
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Naves/SpaceStation", 0, 4);
			Definir("Enemies/Naves/GordoShip", -3, 0);
			Definir("Enemies/Naves/GordoShip", 3, 0);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================7
			
			// Inimigo: 50
			Definir("Enemies/Naves/FighterSlim", 3, 0);
			Definir("Enemies/Naves/FighterSlim", -3, 3);
			Definir("Enemies/Naves/SpaceStation", 0, 0);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================8
			Definir("Enemies/Family/F_Mine", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 2.5, 0);
			Definir("Enemies/Naves/FighterSlim", -2.5, 3);
			
			// Inimigo: 60
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/O_Closing2", 3, 4);
			Definir("Obstacles/Complex/O_Closing2", -3, 4);
			Definir("Obstacles/Complex/O_Closing2", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================9
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/O_Closing2", 0, 4);
			Definir("Enemies/Naves/PasserH", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================10
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
		break;
		
		
		case 4:
			// Inimigo: 0
			Definir("Obstacles/Builder/O_Builder5", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Naves/OrbTurret", 3, 5);
			Definir("Enemies/Naves/OrbTurret", -3, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================1
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Obstacles/Builder/O_Builder", 0, 5);
			Definir("Enemies/Naves/OrbTurret", 0, 5);
			Definir("Enemies/Naves/PasserH", 0, 5);
			Definir("Obstacles/Complex/O_Door", 0, 5);
			
			// Inimigo: 10
			Definir("Enemies/Naves/OVNI", 4, 5);
			Definir("Enemies/Naves/OVNI", -4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================2
			Definir("Enemies/Naves/PasserH", 0, 5);
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Naves/OVNI", 4, 5);
			Definir("Enemies/Naves/OVNI", -4, 5);
			Definir("Obstacles/Complex/O_Door", 0, 5);
			
			// Inimigo: 20
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================3
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Enemies/Naves/OrbTurret", 0, 5);
			Definir("Obstacles/Builder/O_Builder", 0, 5);
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Obstacles/Complex/O_Door", 3, 5);
			Definir("Obstacles/Complex/O_Door", -3, 5);
			Definir("Obstacles/Complex/O_Door", 4, 5);
			Definir("Obstacles/Complex/O_Door", -4, 5);
			Definir("Enemies/Naves/PasserH", 0, 5);
			
			// Inimigo: 30
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================4
			Definir("Enemies/Naves/OrbTurret", 0, 5);
			Definir("Enemies/Naves/OVNI", -3, 5);
			Definir("Enemies/Naves/OVNI", 3, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Obstacles/Complex/O_Door", 4, 5);
			Definir("Obstacles/Complex/O_Door", -4, 5);
			Definir("Obstacles/Complex/O_Door", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================5
			Definir("Obstacles/Builder/O_Builder", 0, 5);
			
			// Inimigo: 40
			Definir("Enemies/Naves/PlayerEnemy", 0, 10);
			Definir("Obstacles/Builder/O_Builder", 0, 5);
			Definir("Enemies/Naves/OrbTurret", 3, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================6
			Definir("Enemies/Naves/PasserH", 0, 5);
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Enemies/Naves/OrbTurret", 3, 5);
			Definir("Enemies/Naves/OrbTurret", -3, 5);
			Definir("Enemies/Naves/OVNI", 0, 5);
			Definir("Obstacles/Builder/O_Builder", 0, 5);
			
			// Inimigo: 50
			Definir("Enemies/Naves/PasserH", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================7
			Definir("Enemies/Naves/OrbTurret", 3, 5);
			Definir("Enemies/Naves/OrbTurret", -3, 5);
			Definir("Enemies/Naves/OVNI", 4, 5);
			Definir("Enemies/Naves/OVNI", -4, 5);
			Definir("Obstacles/Complex/O_Door", 3, 5);
			Definir("Obstacles/Complex/O_Door", -3, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================8
			Definir("Obstacles/Complex/O_Door", 4, 5);
			
			// Inimigo: 60
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================9
			Definir("Obstacles/Complex/O_Door", -4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 9); // =========================10
			Definir("Obstacles/Complex/O_Door", 0, 5);
			Definir("Enemies/Naves/PasserH", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
		break;
	}
}
//=================================================================
function Fase4(estagio) {
	switch (estagio) {
		case 1:
			// Inimigo: 0
			Definir("Obstacles/Simple/BlocoG", 0, 6);
			Definir("Obstacles/Simple/BlocoG", 6, 0);
			Definir("Obstacles/Simple/BlocoG", -6, 3);
			Definir("Obstacles/Complex/SunRing", 0, 5); // =========================1
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Family/F_spaceship", 3, 3);
			Definir("Enemies/Family/F_spaceship", -3, 4);
			Definir("Enemies/Naves/Tanker", -5.3, 0);
			Definir("Obstacles/Simple/BlocoG", 1.6, 8);
			Definir("Enemies/Family/F_spaceship", 0, 3);
			
			// Inimigo: 10
			Definir("Enemies/Family/F_spaceship", 3, 3);
			Definir("Enemies/Naves/SpaceCraft", 0, 2);
			Definir("Obstacles/Builder/O_Builder5", 0, 3);
			Definir("Obstacles/Complex/SunRing", 3, 4); // =========================2
			Definir("Enemies/Naves/Fighter", -3.5, 2);
			Definir("Obstacles/Simple/BlocoG", 2.5, 0);
			Definir("Obstacles/Simple/BlocoG", -9.5, 6);
			Definir("Obstacles/Builder/O_Builder3", 0, 4);
			Definir("Obstacles/Simple/BlocoG", 0, 3);
			Definir("Obstacles/Simple/BlocoG", 0, 4);
			
			// Inimigo: 20
			Definir("Obstacles/Complex/SunRing", 5, 5); // =========================3
			Definir("Enemies/Naves/Tanker", 0, 5);
			Definir("Enemies/Naves/SpaceCraft", 3.5, 0);
			Definir("Enemies/Naves/SpaceCraft", -3.5, 2);
			Definir("Obstacles/Simple/BlocoG", 6, 0);
			Definir("Obstacles/Simple/BlocoG", -6, 2);
			Definir("Enemies/Naves/Fighter", 0, 1.3);
			Definir("Enemies/Carrier/CarrierRandomG", 6, 3);
			Definir("Obstacles/Simple/BlocoG", 6, 0);
			Definir("Obstacles/Simple/BlocoG", -6, 2);
			
			// Inimigo: 30
			Definir("Obstacles/Simple/BlocoG", 6, 0);
			Definir("Obstacles/Simple/BlocoG", -6, 4);
			Definir("Obstacles/Complex/O_Cross3DH2", 0, 4);
			Definir("Obstacles/Builder/O_Builder5", 0, 2);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Naves/Tanker", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Enemies/Naves/OVNIVertical", 0, 3);
			Definir("Enemies/Naves/SpaceCraft", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 2); // =========================4
			
			// Inimigo: 40
			Definir("Enemies/Naves/FighterSlim", 4, 0);
			Definir("Enemies/Naves/FighterSlim", -4, 2);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3);
			Definir("Enemies/Naves/FighterSlim", 0, 0);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3);
			Definir("Enemies/Naves/Ray", 0, 0);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3.2);
			
			// Inimigo: 50
			Definir("Enemies/Carrier/CarrierRandomP", 0, 0.3);
			Definir("Obstacles/Complex/SunRing", 0, 2); // =========================5
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3);
			Definir("Enemies/Naves/OVNIVertical", 0, 0.2);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 2.8);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 6);
			
			// Inimigo: 60
			Definir("Obstacles/Simple/BlocoG", 0, 3);
			Definir("Obstacles/Simple/BlocoG", 0, 4);
			Definir("Obstacles/Complex/SunRing", -4.5, 5); // =========================6
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			Definir("Enemies/Naves/Ray", 0, 6);
			Definir("Obstacles/Builder/O_Builder5", 0, 2);
			Definir("Obstacles/Complex/O_Cross3DV", 4, 0);
			Definir("Obstacles/Complex/O_Cross3DV2", -4, 7);
			Definir("Enemies/Naves/Ray", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 3, 0);
			
			// Inimigo: 70
			Definir("Enemies/Naves/FighterSlim", -3, 5);
			Definir("Obstacles/Builder/O_Builder5", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 5); // =========================7
			Definir("Enemies/Naves/Tanker", 0, 6);
			Definir("Obstacles/Builder/O_Builder5", 0, 4);
			Definir("Enemies/Naves/Tanker", 0, 5);
			Definir("Enemies/Naves/SpaceCraft", 3, 0);
			Definir("Enemies/Naves/SpaceCraft", -3, 3);
			Definir("Obstacles/Builder/O_Builder5", 0, 2);
			Definir("Obstacles/Complex/O_Cross3DV2", 4, 0);
			Definir("Obstacles/Complex/O_Cross3DV", -4, 3);
			
			// Inimigo: 80
			Definir("Obstacles/Complex/SunRing", 0, 5); // =========================8
			Definir("Obstacles/Builder/O_Builder5", 0, 3);
			Definir("Obstacles/Simple/BlocoG", 9, 0);
			Definir("Obstacles/Simple/BlocoG", -9, 3);
			Definir("Enemies/Naves/Tanker", 0, 0);
			Definir("Obstacles/Simple/BlocoG", 8, 0);
			Definir("Obstacles/Simple/BlocoG", -8, 3);
			Definir("Obstacles/Simple/BlocoG", 7, 0);
			Definir("Obstacles/Simple/BlocoG", -7, 3);
			Definir("Enemies/Naves/OVNIVertical", 0, 0);
			
			// Inimigo: 90
			Definir("Obstacles/Complex/O_Cross3DH", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 2); // =========================9
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/Tanker", 0, 5);
			Definir("Enemies/Naves/Tanker", -3, 6);
			Definir("Enemies/Naves/Tanker", 3, 6);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 2);
			Definir("Obstacles/Simple/BlocoG", 0, 2);
			Definir("Obstacles/Complex/SunRing", 6, 2); // =========================10
		break;
		
		case 2:
			// Inimigo: 0
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_Mine2", 0, 0);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Naves/Buzzbot", 3, 2);
			Definir("Enemies/Family/F_spaceship", 0, 2);
			Definir("Enemies/Naves/Buzzbot", -3, 2);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_spaceship", 0, 0);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			
			// Inimigo: 10
			Definir("Enemies/Family/F_Mine2", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			Definir("Enemies/Naves/Buzzbot", 0, 2);
			Definir("Enemies/Naves/Buzzbot", -4, 2);
			Definir("Enemies/Naves/Buzzbot", 4, 4);
			Definir("Enemies/Naves/Hovercraft", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 3, 2);
			Definir("Enemies/Carrier/CarrierRandomM", -3, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Enemies/Family/F_Mine2", 0, 6);
			
			// Inimigo: 20
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Naves/PasserV", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 1);
			Definir("Enemies/Naves/Buzzbot", 1, 3);
			Definir("Enemies/Naves/Buzzbot", -1, 4);
			Definir("Obstacles/Builder/O_Builder3", 0, 4);
			Definir("Enemies/Naves/Buzzbot", 1, 2);
			Definir("Enemies/Naves/Buzzbot", -1, 2);
			
			// Inimigo: 30
			Definir("Enemies/Naves/PasserV", 0, 3);
			Definir("Enemies/Family/F_spaceship", 0, 2);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			Definir("Enemies/Family/F_Mine2", 0, 3);
			Definir("Enemies/Naves/Buzzbot", 0, 3);
			Definir("Obstacles/Builder/O_Builder3", 0, 4);
			Definir("Enemies/Naves/Hovercraft", 2, 8);
			Definir("Obstacles/Builder/O_Builder3", 0, 5);
			Definir("Enemies/Naves/Hovercraft", -2, 5);
			
			// Inimigo: 40
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Family/F_Mine2", 0, 5);
			Definir("Enemies/Family/F_Mine3", 0, 5);
			Definir("Enemies/Family/F_Mine2", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 1);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			Definir("Enemies/Naves/Buzzbot", 2, 2);
			Definir("Enemies/Naves/Buzzbot", -2, 2);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			
			// Inimigo: 50
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Naves/Hovercraft", 0, 3);
			Definir("Enemies/Naves/Buzzbot", 1, 2);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			Definir("Enemies/Naves/Buzzbot", -1, 2);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Enemies/Family/F_spaceship", 0, 0);
			
			// Inimigo: 60
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Obstacles/Builder/O_Builder3", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine2", 0, 6);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Enemies/Family/F_spaceship", 0, 0);
			
			// Inimigo: 70
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Enemies/Naves/Buzzbot", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
			Definir("Enemies/Naves/Hovercraft", 3, 0);
			Definir("Enemies/Naves/Hovercraft", -3, 8);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
		break;
		
		case 3:
			// Inimigo: 0
			Definir("Enemies/Naves/Sweeper", 0, 5);
			Definir("Enemies/Naves/PasserV", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Family/F_NaveG", 4, 4);
			Definir("Enemies/Family/F_NaveG", -4, 4);
			Definir("Enemies/Naves/Sweeper", 0, 4);
			Definir("Enemies/Naves/Sweeper", 3, 0);
			Definir("Enemies/Naves/Sweeper", -3, 4);
			Definir("Enemies/Family/F_NaveG", 0, 4);
			Definir("Enemies/Naves/PasserV", 0, 4);
			
			// Inimigo: 10
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			Definir("Enemies/Naves/TrackerR", 6, 4);
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Family/F_Spaceship", 0, 2);
			Definir("Enemies/Family/F_NaveG", 4, 4);
			Definir("Enemies/Family/F_NaveG", -4, 4);
			Definir("Enemies/Naves/DeltaShip", 2, 4);
			Definir("Enemies/Naves/DeltaShip", -2, 2);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Enemies/Naves/Sweeper", 0, 6);
			
			// Inimigo: 20
			Definir("Enemies/Family/F_NaveG", -4, 4);
			Definir("Enemies/Family/F_NaveG", 4, 4);
			Definir("Enemies/Naves/PasserV", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/DeltaShip", 2, 4);
			Definir("Enemies/Naves/DeltaShip", -2, 4);
			Definir("Enemies/Naves/Sweeper", 0, 2);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			Definir("Enemies/Family/F_NaveG", 3.5, 4);
			Definir("Enemies/Family/F_NaveG", -3.5, 4);
			
			// Inimigo: 30
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Enemies/Naves/Sweeper", 2.5, 0);
			Definir("Enemies/Naves/Sweeper", -2.5, 4);
			Definir("Enemies/Naves/OVNIVertical", 0, 4);
			Definir("Enemies/Family/F_NaveG", 0, 4);
			Definir("Enemies/Naves/DeltaShip", -2, 4);
			Definir("Enemies/Naves/DeltaShip", 2, 4);
			Definir("Enemies/Naves/PasserV", 0, 4);
			Definir("Enemies/Naves/Sweeper", 3.5, 0);
			Definir("Enemies/Naves/Sweeper", -3.5, 4);
			
			// Inimigo: 40
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Naves/PasserV", 0, 3);
			Definir("Enemies/Naves/OVNIVertical", 4, 4);
			Definir("Enemies/Naves/OVNIVertical", -4, 4);
			Definir("Enemies/Family/F_NaveG", 2, 4);
			Definir("Enemies/Family/F_NaveG", -2, 4);
			Definir("Enemies/Naves/Sweeper", 0, 4);
			Definir("Enemies/Naves/Sweeper", 2.5, 0);
			Definir("Enemies/Naves/Sweeper", -2.5, 2);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			
			// Inimigo: 50
			Definir("Enemies/Naves/OVNIVertical", 0, 4);
			Definir("Enemies/Naves/Sweeper", 3, 0);
			Definir("Enemies/Naves/Sweeper", -3, 5);
			Definir("Enemies/Naves/Sweeper", 2, 0);
			Definir("Enemies/Naves/Sweeper", -2, 5);
			Definir("Enemies/Naves/PasserV", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			Definir("Enemies/Naves/OVNIVertical", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			
			// Inimigo: 60
			Definir("Enemies/Naves/PasserV", 0, 3);
			Definir("Enemies/Naves/OVNIVertical", 3, 0);
			Definir("Enemies/Naves/OVNIVertical", -3, 4);
			Definir("Enemies/Naves/Sweeper", 0, 4);
			Definir("Enemies/Family/F_NaveG", 2, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Enemies/Family/F_NaveG", -2, 4);
			Definir("Enemies/Naves/PasserV", 0, 2);
			Definir("Enemies/Naves/OVNIVertical", 3, 0);
			Definir("Enemies/Naves/OVNIVertical", -3, 4);
			
			// Inimigo: 70
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Enemies/Naves/PasserV", 0, 2);
			Definir("Enemies/Naves/Sweeper", 2.5, 0);
			Definir("Enemies/Naves/Sweeper", -2.5, 4);
			Definir("Enemies/Naves/Sweeper", 0, 4);
			Definir("Enemies/Naves/OVNIVertical", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
			Definir("Enemies/Naves/Sweeper", 2.5, 0);
			Definir("Enemies/Naves/Sweeper", -2.5, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			
			// Inimigo: 80
			Definir("Enemies/Naves/PasserV", 0, 2);
		break;
		
		case 4:
			// Inimigo: 0
			Definir("Enemies/Family/F_NaveG", -2, 4);
			Definir("Enemies/Family/F_NaveG", 2, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 2);
			Definir("Enemies/Naves/DeltaShip", -4, 4);
			Definir("Enemies/Naves/DeltaShip", 4, 4);
			Definir("Enemies/Family/F_NaveG", 0, 4);
			Definir("Enemies/Naves/Turret", 0, 9);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Naves/TrackerR", 6, 4);
			
			// Inimigo: 10
			Definir("Enemies/Naves/DeltaShip", 0, 3);
			Definir("Enemies/Naves/DeltaShip", -3, 3);
			Definir("Enemies/Naves/DeltaShip", 3, 3);
			Definir("Enemies/Carrier/CarrierRandomG", 0, 3);
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Naves/DeltaShip", 2, 3);
			Definir("Enemies/Naves/DeltaShip", -2, 3);
			Definir("Enemies/Naves/DeltaShip", 3, 3);
			Definir("Enemies/Naves/DeltaShip", -3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			
			// Inimigo: 20
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Naves/DeltaShip", 2.5, 3);
			Definir("Enemies/Naves/DeltaShip", -2.5, 3);
			Definir("Enemies/Carrier/CarrierRandomP", 2, 3);
			Definir("Enemies/Carrier/CarrierRandomM", -2, 3);
			Definir("Enemies/Naves/TrackerL", -6, 3);
			Definir("Enemies/Naves/TrackerR", 6, 3);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Enemies/Naves/DeltaShip", 2, 3);
			
			// Inimigo: 30
			Definir("Enemies/Naves/DeltaShip", -2, 3);
			Definir("Enemies/Naves/Turret", 2, 3);
			Definir("Enemies/Naves/Turret", -2, 3);
			Definir("Enemies/Naves/DeltaShip", 4, 3);
			Definir("Enemies/Naves/DeltaShip", -4, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			Definir("Enemies/Naves/DeltaShip", -2, 3);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Family/F_NaveG", 3, 3);
			
			// Inimigo: 40
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Naves/TrackerL", -6, 3);
			Definir("Enemies/Naves/TrackerR", 6, 3);
			Definir("Enemies/Naves/DeltaShip", 3.5, 3);
			Definir("Enemies/Naves/DeltaShip", -3.5, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Naves/Turret", 4, 3);
			Definir("Enemies/Naves/Turret", -4, 3);
			Definir("Enemies/Naves/TrackerL", -6, 3);
			Definir("Enemies/Naves/TrackerR", 6, 3);
			
			// Inimigo: 50
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Enemies/Naves/DeltaShip", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			Definir("Enemies/Naves/DeltaShip", -4, 3);
			Definir("Enemies/Naves/DeltaShip", 4, 3);
			Definir("Enemies/Naves/TrackerL", -6, 0);
			Definir("Enemies/Naves/TrackerR", 6, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Family/F_NaveG", -2, 3);
			
			// Inimigo: 60
			Definir("Enemies/Family/F_NaveG", 2, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Naves/DeltaShip", 0, 3);
			Definir("Enemies/Naves/DeltaShip", -4, 3);
			Definir("Enemies/Naves/DeltaShip", 4, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Naves/DeltaShip", -4, 3);
			
			// Inimigo: 70
			Definir("Enemies/Naves/Turret", 0, 3);
			Definir("Enemies/Naves/DeltaShip", 4, 3);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
		break;
		
		case 5:
			// Inimigo: 0
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================1
			Definir("Enemies/Outros/BubbleP", 3, 2);
			Definir("Enemies/Outros/BubbleP", -3, 2);
			Definir("Enemies/Outros/BubbleP", 4, 2);
			Definir("Enemies/Outros/BubbleP", -4, 2);
			Definir("Enemies/Outros/BubbleM", 2, 4);
			Definir("Enemies/Outros/BubbleM", -2, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Naves/Ray2", 0, 10);
			Definir("Enemies/Naves/Miner", 0, 5);
			
			// Inimigo: 10
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================2
			Definir("Enemies/Outros/BubbleM", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Enemies/Outros/BubbleG", 0, 5);
			Definir("Enemies/Naves/Ray2", 0, 5);
			Definir("Enemies/Naves/Miner", 0, 8);
			Definir("Enemies/Outros/BubbleGG", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================3
			Definir("Enemies/Outros/BubbleG", -3, 5);
			Definir("Enemies/Outros/BubbleG", 3, 5);
			
			// Inimigo: 20
			Definir("Enemies/Outros/BubbleG", -2, 5);
			Definir("Enemies/Outros/BubbleG", 2, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================4
			Definir("Enemies/Naves/Ray2", 0, 8);
			Definir("Enemies/Naves/Miner", 0, 5);
			Definir("Enemies/Outros/BubbleGG", 0, 8);
			Definir("Enemies/Naves/Ray2", 0, 5);
			Definir("Enemies/Naves/Miner", 0, 5);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			
			// Inimigo: 30
			Definir("Enemies/Naves/Miner", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================5
			Definir("Enemies/Outros/BubbleG", 0, 5);
			Definir("Enemies/Outros/BubbleG", 0, 5);
			Definir("Enemies/Naves/Ray2", -3, 0);
			Definir("Enemies/Outros/BubbleP", 3, 4);
			Definir("Enemies/Outros/BubbleP", -3, 2);
			Definir("Enemies/Outros/BubbleP", 4, 2);
			Definir("Enemies/Outros/BubbleP", -4, 3);
			Definir("Enemies/Outros/BubbleM", 2, 5);
			
			// Inimigo: 40
			Definir("Enemies/Outros/BubbleM", -2, 5);
			Definir("Enemies/Outros/BubbleGG", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================6
			Definir("Enemies/Naves/Ray2", 0, 10);
			Definir("Enemies/Outros/BubbleG", 0, 5);
			Definir("Enemies/Outros/BubbleGG", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================7
			Definir("Enemies/Naves/Miner", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomG", 0, 5);
			
			// Inimigo: 50
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================8
			Definir("Enemies/Naves/Ray2", 2, 0);
			Definir("Enemies/Naves/Ray2", -2, 5);
			Definir("Enemies/Naves/Miner", 0, 5);
			Definir("Enemies/Outros/BubbleGG", 3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================9
			Definir("Enemies/Outros/BubbleGG", 4, 0);
			Definir("Enemies/Outros/BubbleGG", -4, 5);
			Definir("Enemies/Naves/Ray2", 3, 0);
			Definir("Enemies/Naves/Ray2", -3, 5);
			
			// Inimigo: 60
			Definir("Obstacles/Complex/SunRing", 0, 4); // =========================10
			Definir("Enemies/Naves/Ray2", 0, 5);
			Definir("Enemies/Outros/BubbleGG", 2, 0);
			Definir("Enemies/Outros/BubbleGG", -2, 5);
		break;
		
		case 6:
			// Inimigo: 0
			Definir("Enemies/Naves/Fighter", 4, 4);
			Definir("Enemies/Naves/Fighter", -4, 4);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 2, 4);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Enemies/Naves/FighterBig", 0, 10);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Naves/Fighter", -3, 0);
			
			// Inimigo: 10
			Definir("Enemies/Naves/Fighter", 3, 2);
			Definir("Enemies/Family/F_NaveG", 0, 2);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 4, 2);
			Definir("Enemies/Carrier/CarrierRandomM", -4, 4);
			Definir("Enemies/Naves/Fighter", 3, 4);
			Definir("Enemies/Naves/Fighter", -3, 4);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 2, 0);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			
			// Inimigo: 20
			Definir("Enemies/Naves/FighterBig", 2, 4);
			Definir("Enemies/Naves/FighterBig", -2, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Enemies/Naves/FighterBig", 3, 4);
			Definir("Enemies/Naves/Fighter", -3, 4);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			
			// Inimigo: 30
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Enemies/Naves/FighterBig", 0, 4);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/Fighter", 3, 3);
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			Definir("Enemies/Naves/Fighter", -3, 3);
			Definir("Enemies/Naves/FighterSlim", -3, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			
			// Inimigo: 40
			Definir("Enemies/Naves/Fighter", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Enemies/Naves/FighterBig", 0, 4);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			
			// Inimigo: 50
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Enemies/Naves/Fighter", 0, 4);
			Definir("Enemies/Naves/FighterBig", 3, 0);
			Definir("Enemies/Naves/FighterBig", -3, 4);
			Definir("Enemies/Family/F_NaveG", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			Definir("Enemies/Carrier/CarrierRandomP", 0, 3);
			Definir("Enemies/Carrier/CarrierRandomG", 0, 4);
			Definir("Enemies/Naves/FighterBig", 3, 0);
			Definir("Enemies/Naves/FighterBig", -3, 4);
			
			// Inimigo: 60
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Enemies/Naves/Fighter", 2, 4);
			Definir("Enemies/Naves/Fighter", -2, 4);
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Naves/FighterBig", 3, 0);
			Definir("Enemies/Naves/FighterBig", -3, 4);
			Definir("Enemies/Family/F_NaveG", 2, 3);
			Definir("Enemies/Family/F_NaveG", -2, 3);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			
			// Inimigo: 70
			Definir("Enemies/Family/F_NaveG", 3, 3);
			Definir("Enemies/Family/F_NaveG", -3, 3);
			Definir("Enemies/Naves/FighterSlim", 2, 4);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Naves/FighterBig", 3, 0);
			Definir("Enemies/Naves/FighterBig", -3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
		break;
		
		case 7:
			// Inimigo: 0
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Naves/FighterSlim", 3, 3);
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Enemies/Naves/Hunter", 0, 2);
			Definir("Enemies/Family/F_spaceship", 0, 4);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Enemies/Family/F_spaceship", 0, 3);
			
			// Inimigo: 10
			Definir("Enemies/Naves/FighterSlim", -2, 2);
			Definir("Enemies/Naves/FighterSlim", 2, 2);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/Hunter", 0, 4);
			Definir("Enemies/Family/F_spaceship", 3, 3);
			Definir("Enemies/Family/F_spaceship", -3, 3);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 4);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 1); // =========================2
			Definir("Enemies/Naves/Hunter", 0, 4);
			
			// Inimigo: 20
			Definir("Enemies/Naves/TrackerR", 6, 4);
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/Hunter", 3, 2);
			Definir("Enemies/Naves/Hunter", -3, 2);
			Definir("Enemies/Naves/FighterSlim", 2, 2);
			Definir("Enemies/Naves/FighterSlim", -2, 2);
			Definir("Enemies/Naves/Hunter", 4, 2);
			Definir("Enemies/Naves/Hunter", -4, 0);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			
			// Inimigo: 30
			Definir("Enemies/Naves/Ray", 0, 4);
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 3, 4);
			Definir("Enemies/Naves/Hunter", 0, 4);
			Definir("Enemies/Naves/FighterSlim", -3, 4);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/Ray", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			Definir("Enemies/Naves/Hunter", 2, 2);
			
			// Inimigo: 40
			Definir("Enemies/Naves/Hunter", -2, 1);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 2);
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Naves/TrackerR", 6, 0);
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Naves/SpaceShip2", 2, 4);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Enemies/Naves/SpaceShip2", -2, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			
			// Inimigo: 50
			Definir("Enemies/Naves/Hunter", 3, 3);
			Definir("Enemies/Naves/Hunter", 0, 3);
			Definir("Enemies/Naves/Hunter", -3, 3);
			Definir("Enemies/Naves/Ray", -3, 4);
			Definir("Enemies/Naves/Ray", 3, 4);
			Definir("Enemies/Naves/Hunter", -3, 3);
			Definir("Enemies/Naves/Hunter", 0, 3);
			Definir("Enemies/Naves/Hunter", 3, 3);
			Definir("Enemies/Naves/FighterSlim", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 2); // =========================6
			
			// Inimigo: 60
			Definir("Enemies/Naves/Hunter", -3, 0);
			Definir("Enemies/Naves/Hunter", 3, 3);
			Definir("Enemies/Naves/Hunter", 0, 3);
			Definir("Enemies/Naves/TrackerR", 6, 0);
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/FighterSlim", 2, 4);
			Definir("Enemies/Naves/FighterSlim", -2, 4);
			Definir("Enemies/Carrier/CarrierRandomG", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================7
			
			// Inimigo: 70
			Definir("Enemies/Family/F_spaceship", 0, 3);
			Definir("Enemies/Naves/SpaceShip2", 0, 4);
			Definir("Enemies/Naves/Hunter", 3, 3);
			Definir("Enemies/Naves/Hunter", -3, 3);
			Definir("Enemies/Naves/Ray", 0, 4);
			Definir("Enemies/Naves/TrackerR", 6, 0);
			Definir("Enemies/Naves/TrackerL", -6, 4);
			Definir("Enemies/Naves/SpaceShip2", 3, 4);
			Definir("Enemies/Naves/SpaceShip2", -3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			
			// Inimigo: 80
			Definir("Enemies/Carrier/CarrierRandomP", 0, 4);
			Definir("Enemies/Naves/Hunter", 0, 0);
			Definir("Enemies/Family/F_spaceship", 2, 3);
			Definir("Enemies/Family/F_spaceship", -2, 3);
			Definir("Enemies/Naves/SpaceShip2", -2, 4);
			Definir("Enemies/Naves/SpaceShip2", 2, 4);
			Definir("Enemies/Naves/Hunter", 3, 0);
			Definir("Enemies/Naves/Hunter", -3, 3);
			Definir("Enemies/Naves/Ray", 0, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			
			// Inimigo: 90
			Definir("Enemies/Naves/Hunter", 3, 0);
			Definir("Enemies/Naves/Hunter", -3, 3);
			Definir("Enemies/Naves/Ray", 3, 4);
			Definir("Enemies/Naves/Ray", -3, 4);
			Definir("Enemies/Naves/SpaceShip2", 3, 4);
			Definir("Enemies/Naves/SpaceShip2", -3, 4);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
		break;
		
		case 8:
			// Inimigo: 0
			Definir("Obstacles/Complex/O_Closing2", 0, 5);
			Definir("Obstacles/Complex/O_DoorMover", 0, 5);
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Obstacles/Complex/O_Closing2", 0, 2);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================1
			Definir("Enemies/Family/F_Mine3", 0, 5);
			Definir("Obstacles/Complex/O_Closing2", 0, 5);
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Obstacles/Complex/O_Closing2", 0, 5);
			Definir("Obstacles/Complex/O_Cross3DH", 0, 5);
			
			// Inimigo: 10
			Definir("Obstacles/Complex/O_Closing", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================2
			Definir("Obstacles/Complex/O_Cross", -2, 5);
			Definir("Obstacles/Complex/O_Cross2", 3, 5);
			Definir("Enemies/Family/F_Mine3", 0, 5);
			Definir("Obstacles/Complex/O_DoorMover", 5, 5);
			Definir("Obstacles/Complex/O_Closing", -5, 5);
			Definir("Enemies/Naves/Fighter", -5, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			
			// Inimigo: 20
			Definir("Obstacles/Complex/O_Closing", 5, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================3
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Obstacles/Complex/O_Closing2", 4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================4
			
			// Inimigo: 30
			Definir("Obstacles/Complex/O_Cross2", 4, 5);
			Definir("Obstacles/Complex/O_Cross", -3, 5);
			Definir("Obstacles/Complex/O_Cross3DH", 2, 5);
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomM", 0, 5);
			Definir("Enemies/Naves/PlayerEnemyHyper", 0, 10);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================5
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Enemies/Naves/Fighter", 0, 5);
			Definir("Enemies/Naves/Fighter", 0, 5);
			
			// Inimigo: 40
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Obstacles/Complex/O_DoorMover", 4, 5);
			Definir("Obstacles/Complex/O_DoorMover", -4, 5);
			Definir("Obstacles/Complex/O_DoorMover", 5, 5);
			Definir("Obstacles/Complex/O_DoorMover", -5, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================6
			Definir("Obstacles/Complex/O_Closing2", 5, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Obstacles/Complex/O_Closing", 0, 5);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			
			// Inimigo: 50
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Obstacles/Complex/SunRing", 0, 0); // =========================7
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Enemies/Family/F_Mine3", 0, 3);
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Obstacles/Complex/O_Closing2", 4, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================8
			Definir("Obstacles/Complex/O_Cross2", 4, 5);
			Definir("Obstacles/Complex/O_Cross", -3, 5);
			Definir("Obstacles/Complex/O_Cross3DV2", 2, 5);
			
			// Inimigo: 60
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================9
			Definir("Obstacles/Builder/O_Builder2", 0, 5);
			Definir("Enemies/Carrier/CarrierRandomP", 0, 5);
			Definir("Obstacles/Complex/SunRing", 0, 3); // =========================10
		break;
	}
}