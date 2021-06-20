// cada fase define seu numero
var stageNum : int = 0;
var substageNum : int = 0;

// Menus
private var pauseMenu : GameObject;
private var startMenu : GameObject;
private var victoryMenu : GameObject;
//var victoryTheme : AudioClip;

private var menuOpen : AudioClip;
private var menuClose : AudioClip;

// Players
private var player1 : GameObject;
private var player2 : GameObject;

function Awake () {
	Universal.stage = stageNum;
	Universal.substage = substageNum;
	
	menuOpen = Resources.Load("Audio/SE/Menu/se_menu_open");
	menuClose = Resources.Load("Audio/SE/Menu/se_menu_close");
	
	pauseMenu = Resources.Load("Texts/PauseMenu");
	startMenu = Resources.Load("Texts/T_StageStart");
	victoryMenu = Resources.Load("Texts/T_VictoryMenu");
	player1 = Resources.Load("Player/Others/Player1");
	player2 = Resources.Load("Player/Others/Player2");
	
	var posicao = Vector3(0,0,0);
	var rotacao = Vector3(0,0,0);
	
	var particleanimator : ParticleAnimator;
	
	// Instancia player1, posiciona e rotaciona
	var p1 = Instantiate(player1, player1.transform.position, player1.transform.rotation);	
	p1.name = "Player1";
	
	// define rotação e posição iniciais conforme fase
	switch (Universal.stage) {
		case 1:
			posicao = Vector3(5.5, 0, 0);
			rotacao = Vector3(0,0,0);
		break;
		case 2:
			posicao = Vector3(0, -4.1, 0);
			rotacao = Vector3(0,0,270);
		break;
		case 3:
			posicao = Vector3(-5.5, 0, 0);
			rotacao = Vector3(0,0,180);
		break;
		case 4:
			posicao = Vector3(0, 4.1, 0);
			rotacao = Vector3(0,0,90);
		break;
		case 5:
			posicao = Vector3(0, 0, 0);
			rotacao = Vector3(0, 90, -90);
		break;
	}
	// Posiciona e rotaciona player1
	p1.transform.Rotate(rotacao);
	p1.transform.position = posicao;
	
	// fases horizontais
	if (stageNum == 1 || stageNum == 3 ) {
		p1.transform.position.y = 0.0;
	}
	
	// fases verticais
	if (stageNum == 2 || stageNum == 4) {
		p1.transform.position.x = 0.0;
	}
		
	if (TitleOptions.playersNumber == 2) {
		var p2 = Instantiate(player2, player2.transform.position, player2.transform.rotation);
		p2.name = "Player2";
		p2.transform.Rotate(rotacao);
		p2.transform.position = posicao;
		
		if (stageNum == 1 || stageNum == 3 ) {
			p1.transform.position.y = 2.0;
			p2.transform.position.y = -2.0;			
		}
		
		// fases verticais
		if (stageNum == 2 || stageNum == 4) {
			p1.transform.position.x = 2.0;
			p2.transform.position.x = -2.0;
		}
			
		if (Universal.stage == 2) {
			posicao = Vector3(0, -4.1, 0);
			rotacao = Vector3(0,0,270);
		}
		
		if (Universal.stage == 3) {
			posicao = Vector3(-5.5, 0, 0);
			rotacao = Vector3(0,0,180);
		}
		
		if (Universal.stage == 4) {
			posicao = Vector3(0, 4.1, 0);
			rotacao = Vector3(0,0,90);
		}
	}
	
	StageStart();
}

var temp;
function Update() {
	if (Input.GetButtonDown("Pause")) {
		Pausar();
	}
}

function Pausar() {
	// despausar
	if (Universal.paused) {
		Universal.paused = false;
		audio.PlayOneShot(menuClose);
		
		Time.timeScale = 1;
		AudioListener.volume = 1;
		//Destroy(temp);
	} else {
	//pausar
		Universal.paused = true;
		audio.PlayOneShot(menuOpen);
		
		Time.timeScale = 0;
		AudioListener.volume = 0.3;
		temp = Instantiate(pauseMenu);
	}
}

function StageStart() {
	var hud = Resources.Load("Effects/HUD");
	Instantiate(hud, hud.transform.position, hud.transform.rotation);
	
	yield WaitForSeconds (1);	
	audio.PlayOneShot(menuOpen);
	var menu = Instantiate(startMenu);
	yield WaitForSeconds (2);
	Destroy(menu);
	audio.PlayOneShot(menuClose);	
}


// stage complete ============================================================
function StageComplete(){
	// transição de fases
	audio.Stop();
	
	// registra tempo de conclusão de fase
	Universal.totalTime[Universal.stage] = Time.timeSinceLevelLoad;
	
	// Registra estagios passados	
	Universal.caminho[stageNum] = substageNum;
	
	// exibe mensagem de vitória
	yield WaitForSeconds (4);
	audio.PlayOneShot(menuOpen);
	temp = Instantiate(victoryMenu);
	yield WaitForSeconds (9);
	audio.PlayOneShot(menuClose);
	Destroy(temp);
	yield WaitForSeconds (1);
	
	// Finaliza ou retorna para a seleção de fases
	Common.combo = 0;
	
	if (Universal.stage == 4 && Universal.substage != 1 || Universal.stage == 5) {
		Application.LoadLevel("Win");
	} else if (Universal.stage == 4 && Universal.substage == 1) {
		Application.LoadLevel("Fase5-1");
		//Application.LoadLevel("StageSelect");
	} else {
		Application.LoadLevel("StageSelect");
	}
}

// Estatisticas da fase
// TODO
// adicionar 0 vezes q morreu
// adicionar 0 bombas usadas
private var shots : int = 0;
private var accuracy : int = 0;
private var itens : int = 0;
private var collect : int = 0;
private var enemyNum : int = 0;
private var enemyDown : int = 0;

function GetEnemyNum() {
	return enemyNum;
}

function SetEnemyNum(i : int) {
	enemyNum = i;
}

function GetEnemyDown() {
	return enemyDown;
}

function SetEnemyDown(i : int) {
	enemyDown = i;
}

function GetShots() {
	return shots;
}

function SetShots(i : int) {
	shots = i;
}

function GetAccuracy() {
	return accuracy;
}

function SetAccuracy(i : int) {
	accuracy = i;
}

function GetCollect() {
	return collect;
}

function SetCollect(i : int) {
	collect = i;
}

function GetItens() {
	return itens;
}

function SetItens(i : int) {
	itens = i;
}