var isQuitBtn = false;

function OnMouseUp () {
	if (isQuitBtn)
	{
		Application.Quit();
	} 
	else
	{
		Application.LoadLevel("Opening");
	}
}

















var isScore: boolean = false;


function Start() {
	
	var valor : String = "";
	
	
	
	
		
	if (isScore) {
		//Common.score += Common.playerLives * 10000;
		valor += formataNumero(Common.score);		
	}
	
	// Exibe texto
	GetComponent(TextMesh).text = valor;
}















function formataNumero(foo : int) {
	var pan : String = "";
	pan += foo;	
	
	var numeroFormat : String = "";
	
	// Itera pelos caracteres em ordem decrescente
	for (i = pan.length; i > 0; i--) {
		
		// Insere ponto a cada tres casas que não sejam a última
		if (i % 3 == 0 && i != pan.length) {
			numeroFormat += ".";
		}
		// Insere caracteres na ordem crescente
		numeroFormat += pan.Substring(pan.length - i, 1);
	}
	
	return numeroFormat;
}





//private var iniciado : boolean = false;
function Update() {
	
	//if (!iniciado) {		
		if (Input.GetButtonDown("Fire1")) {
			//iniciado = true;
			Iniciar();
		}
	//}
}


function Iniciar() {
	//var som = Resources.Load("Audio/SE/Effects/se_start-continue");
	//audio.PlayOneShot(som);
	//yield WaitForSeconds(som.length);
	Application.LoadLevel("Opening");
}

/*
function OnGUI () {
	instructionText = "1P";	
	instructionText = "Score: "+ Common.score;
	
	// + pontos por vida, bomba, power
	instructionText += "\nLives: " + Common.playerLives + " x 10.000";
	instructionText += "\nBombs: " + WeaponsBomb.bombs + " x 5.000";
	instructionText += "\nPower: " + WeaponsPrimary.power + " x 5.000";
	
	
	
	
	if (TitleOptions.playersNumber == 2) {
		instructionText += "\n2P Score: "+Common2.score;
	}
	
	instructionText += "\n\nTotal time";
	Universal.totalTime[0] = 0;
	
	
	if (Universal.totalTime[1]) {
		instructionText += "\nStage 1: " + Universal.totalTime[1];
		Universal.totalTime[0] = Universal.totalTime[1];
	}
	
	if (Universal.totalTime[2]) {
		instructionText += "\nStage 2: " + Universal.totalTime[2];
		Universal.totalTime[0] += Universal.totalTime[2];
	}
	
	if (Universal.totalTime[3]) {
		instructionText += "\nStage 3: " + Universal.totalTime[3];
		Universal.totalTime[0] += Universal.totalTime[3];
	}
	
	if (Universal.totalTime[4]) {
		instructionText += "\nStage 4: " + Universal.totalTime[4];
		Universal.totalTime[0] += Universal.totalTime[4];
	}
	
	
	
	
	
	if (Universal.stage == 5) {
		instructionText += "\nStage 5: " + Universal.totalTime[5];
		Universal.totalTime[0] += Universal.totalTime[5];
	}
	
	
	
	
	
	
	instructionText += "\nTotal Time: " + Universal.totalTime[0];
	
	
	GUI.Label(Rect(0,0,500,200), instructionText);
}*/