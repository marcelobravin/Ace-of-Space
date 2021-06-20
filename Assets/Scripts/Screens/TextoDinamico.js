private var valor : int = 0;
var isGameOver : boolean = false;
var isCounter : boolean = false;
var isStage : boolean = false;
var isStageName : boolean = false;

// estatisticas
var isItens : boolean = false;
var isCollect : boolean = false;

var isShots : boolean = false;
var isAccuracy : boolean = false;

var isEnemyNum : boolean = false;
var isEnemyDown : boolean = false;

// Ranking
var isRankKills : boolean = false;
var isRankAccuracy : boolean = false;
var isRankCollect : boolean = false;
var isRankTotal : boolean = false;


private static var ranks = new Array(3);

// get e set
function Awake () {


	// colocar como static
	var pan = gameObject.FindWithTag("MainCamera").GetComponent("Stages");
	
	if (isGameOver) {
		valor = 9;
		isCounter = true;
	}
	
	if (isEnemyNum) {
		valor = pan.GetEnemyNum();
		CorrigirPosicao();
	}
	
	if (isEnemyDown) {
		valor = pan.GetEnemyDown();
	}
	
	if (isShots) {
		valor = pan.GetShots();
		// gambiarra p causa do flash qdo chefe morre
		// e subchefe?
		valor--;
		CorrigirPosicao();
	}
	
	if (isAccuracy) {
		valor = pan.GetAccuracy();
	}
	
	if (isItens) {
		valor = pan.GetItens();
		CorrigirPosicao();
	}
	
	if (isCollect) {
		valor = pan.GetCollect();
	}
	
			
	// Faz ultima verificação e exibe o texto
	if (isCounter) {
		InvokeRepeating("Contar", 1,1.0);
	} else {
		GetComponent(TextMesh).text = valor.ToString();
	}
	
	
	if (isStageName) {
		GetComponent(TextMesh).text = "Stage: " + Universal.stage + " - " + Universal.substage;
	}
	
	if (isStage) {
		var stageName = new Array(5);
		
		
		// pegar o nome
		// bloco 1
		stageName[0] = new Array(1);
		stageName[0][0] = "Vanilla Skies";
		
		// bloco 2
		stageName[1] = new Array(2);
		stageName[1][0] = "Afternoon Break";
		stageName[1][1] = "Hunting Wars";
		
		// bloco 3
		stageName[2] = new Array(4);
		stageName[2][0] = "Glacial Air";
		stageName[2][1] = "Horizon Coming";
		stageName[2][2] = "Red Alert";
		stageName[2][3] = "Crumbling Walls";
		
		// bloco 4
		stageName[3] = new Array(8);
		stageName[3][0] = "This Day We Fight!";
		stageName[3][1] = "Final Strike";
		stageName[3][2] = "Danger";
		stageName[3][3] = "The Storm";
		stageName[3][4] = "Last Hope";
		stageName[3][5] = "Air Heroes";
		stageName[3][6] = "Ambush";
		stageName[3][7] = "Sorrow";
		
		// bloco 5
		stageName[4] = new Array(8);
		stageName[4][0] = "The Ace of Space";
		
		GetComponent(TextMesh).text = stageName[Universal.stage - 1][Universal.substage - 1];
	}
	
	
	
	
	if (isRankKills) {
		var manager = pan;
		var valor1 = manager.GetEnemyNum();
		var valor2 = manager.GetEnemyDown();
		var ranking = "F";		
		
		
		if (valor1 == valor2) {
			ranking = "S";
		} else if (valor2 >= (valor1 * 0.9)) {
			ranking = "A";
		} else if (valor2 >= (valor1 * 0.7)) {
			ranking = "B";
		} else if (valor2 >= (valor1 * 0.5)) {
			ranking = "C";
		} else if (valor2 >= (valor1 * 0.3)) {
			ranking = "D";
		} else if (valor2 >= (valor1 * 0.1)) {
			ranking = "E";
		}
		
		GetComponent(TextMesh).text = ranking;
		ranks[0] = ranking;
	}
	
	

	
	if (isRankAccuracy) {
		manager = pan;
		valor1 = manager.GetShots();
		valor2 = manager.GetAccuracy();
		ranking = "F";		
		
		
		if (valor2 > valor1) {
			ranking = "S";
		} else if (valor2 >= (valor1 * 0.9)) {
			ranking = "A";
		} else if (valor2 >= (valor1 * 0.7)) {
			ranking = "B";
		} else if (valor2 >= (valor1 * 0.5)) {
			ranking = "C";
		} else if (valor2 >= (valor1 * 0.3)) {
			ranking = "D";
		} else if (valor2 >= (valor1 * 0.1)) {
			ranking = "E";
		}
		
		GetComponent(TextMesh).text = ranking;
		ranks[1] = ranking;
	}
	
	
	
	
	
	if (isRankCollect) {
		manager = pan;
		valor1 = manager.GetItens();
		valor2 = manager.GetCollect();
		ranking = "F";		
		
		
		if (valor1 == valor2) {
			ranking = "S";
		} else if (valor2 >= (valor1 * 0.9)) {
			ranking = "A";
		} else if (valor2 >= (valor1 * 0.7)) {
			ranking = "B";
		} else if (valor2 >= (valor1 * 0.5)) {
			ranking = "C";
		} else if (valor2 >= (valor1 * 0.3)) {
			ranking = "D";
		} else if (valor2 >= (valor1 * 0.1)) {
			ranking = "E";
		}
		
		GetComponent(TextMesh).text = ranking;
		ranks[2] = ranking;
	}
	
}

// numeros a esquerda da barra
function CorrigirPosicao() {	
	if (valor > 9) {
		transform.position.x += 0.39;
	}
	
	if (valor > 99) {
		transform.position.x += 0.39;
	}
	
	if (valor > 999) {
		transform.position.x += 0.39;
	}
}
	
	
	
	
function Start() {
	
	if (isRankTotal) {
		GetComponent(TextMesh).text = "-";
		yield WaitForSeconds(1);
		
		ranking = "F";
			
		
		
		//print(ranks[1] + " - " + ranks[2] + " - " + ranks[0]);
		
		var pontos : double = 0;
		for (var i = 0; i < ranks.length; i++) {
			switch (ranks[i]) {
				case "S" :
					//print("S-6");
					pontos += 6;
				break;
				case "A" :
					//print("A-5");
					pontos += 5;
				break;
				case "B" :
					//print("B-4");
					pontos += 4;
				break;
				case "C" :
					//print("C-3");
					pontos += 3;
				break;
				case "D" :
					//print("D-2");
					pontos += 2;
				break;
				case "E" :
					//print("E-1");
					pontos += 1;
				break;
				case "F" :
					//print("F-0");
					pontos += 0;
				break;
			}
		}
		
		
		//pontos = pontos / 3;
		pontos /= 3;
		//print(pontos);
		
		if (pontos >= 5.5) {
			ranking = "S";
		} else if (pontos >= 4.5) {
			ranking = "A";
		} else if (pontos >= 3.5) {
			ranking = "B";
		} else if (pontos >= 2.5) {
			ranking = "C";
		} else if (pontos >= 1.5) {
			ranking = "D";
		} else if (pontos >= 0.5) {
			ranking = "E";
		} else {
			ranking = "F";
		}
		
		GetComponent(TextMesh).text = ranking;
		
		//print (Universal.stage +" :"+ ranking);
		Universal.rankings[Universal.stage] = ranking;
	}
}




function Update() {
	if (isGameOver) {
		if (Input.GetButtonDown("Fire2")) {
			Contar();
		} else if (Input.GetButtonDown("Fire1")) {
			
			
			// Volta pra seleção de fases?
			// nesse caso modificar stageNum e substage Num
			//Universal.stage--;
			//Application.LoadLevel("StageSelect");
			
			Application.LoadLevel("fase" + (Universal.stage) + "-" + (Universal.substage));
			
			// Reinicializa
			Common.speed = 5;
			Common.playerLives = 3;
			Common.score = 0;
			Common.combo= 0;
		}
	}	
}




// contador regressivo
// play sound
function Contar() {
	if (valor >= 0) 	{
		GetComponent(TextMesh).text = valor.ToString();
		valor--;		
	} else {
		if (isGameOver) {
			Application.LoadLevel("GameOver");
		}
	}	
}