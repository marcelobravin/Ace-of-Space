// posicao atual
private var linha : int = 0;
private var coluna : int = 0;

var marcador: GameObject;
var marcador2: GameObject;

var baixo : boolean = false;

var cursor : AudioClip;
var confirma : AudioClip;

// blocos
var stageNumber = new Array(5);

// bloco 1
stageNumber[0] = new Array(1);
stageNumber[0][0] = "1";

// bloco 2
stageNumber[1] = new Array(2);
stageNumber[1][0] = "2-1";
stageNumber[1][1] = "2-2";

// bloco 3
stageNumber[2] = new Array(4);
stageNumber[2][0] = "3-1";
stageNumber[2][1] = "3-2";
stageNumber[2][2] = "3-3";
stageNumber[2][3] = "3-4";

// bloco 4
stageNumber[3] = new Array(8);
stageNumber[3][0] = "4-1";
stageNumber[3][1] = "4-2";
stageNumber[3][2] = "4-3";
stageNumber[3][3] = "4-4";
stageNumber[3][4] = "4-5";
stageNumber[3][5] = "4-6";
stageNumber[3][6] = "4-7";
stageNumber[3][7] = "4-8";

// bloco 5 TST
stageNumber[4] = new Array(1);
stageNumber[4][0] = "5-1";

var stageName = new Array(5);

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
stageName[3][6] = "Crisis";
stageName[3][7] = "Sorrow";

// bloco 5 TST
stageName[4] = new Array(1);
stageName[4][0] = "The Ace of Space";

function Update () {
	// move cursor -------------------------------------------------------------------------
	//AMBTST stage select
	if (!Universal.PRODUCAO) {
		if (Input.GetKeyDown("left")) {
			if (coluna > 0 && linha > stageNumber[coluna - 1].length - 1) {
				linha = stageNumber[coluna - 1].length - 1;			
			}
			
			if (coluna > 0) {
				coluna--;
				exibir();
			}
		} else if (Input.GetKeyDown("right")) {
			if (coluna < stageNumber.length - 1) {
				coluna++;
				if (linha != 1) {
					linha *= 2;
				}
				exibir();
			}
			baixo = true;
		}
	}
	
	if (Input.GetKeyDown("down")) {
		if (linha < stageNumber[coluna].length -1 && baixo) {
		//if (linha < stageNumber[coluna].length -1) {
			linha++;
			baixo = false;
			exibir();
			som();
		}
	} else if (Input.GetKeyDown("up")) {
		if (linha > 0 && !baixo) {
		//if (linha > 0) {
			baixo = true;
			linha--;			
			exibir();
			som();
		}
	}
	
	// realiza stageNumber ----------------------------------------------------------------------
	//if (Input.GetKeyDown("space") ) {
	if (Input.GetButtonDown("Fire1")) {
		audio.PlayOneShot(cursor);
		Application.LoadLevel("fase" + (coluna + 1) + "-" + (linha + 1));
	}
	
	if (Input.GetButtonDown("Fire2")) {
		if (Universal.stage == 0) {
			Application.LoadLevel("WeaponSelect");
		}
	}
}

function Start() {
	// Seleciona próxima fase e estágio conforme ultima fase passada	
	coluna = Universal.stage;
	if (Universal.caminho[coluna] != null) {
		linha = (Universal.caminho[coluna] * 2) -1;
	}
	
	// Ressalta fase atual
	var faseHover = transform.Find("Fases").Find("Bloco"+(coluna +1)).Find((linha + 1).ToString());
	Instantiate(marcador2, faseHover.position, faseHover.rotation);
	
	// Localiza texto da fase atual
	var textMesh : TextMesh = transform.Find("Textos").Find("currentStage").GetComponent(TextMesh);
	
	// Exibe fase atual
	textMesh.text = Universal.stage.ToString();
	
	// Marca fases passadas
	for (i = 1; i < Universal.caminho.length; i++) {
		if (Universal.caminho[i] != null) {
			var faseAnterior = transform.Find("Fases").Find("Bloco"+i).Find((Universal.caminho[i]).ToString());
			var mark = Instantiate(marcador, faseAnterior.position, faseAnterior.rotation);
			
			// Marca ranking das fases passadas
			mark.name = i.ToString();
		}
	}
	
	// Localiza texto do estagio atual
	textMesh = transform.Find("Textos").Find("currentSubStage").GetComponent(TextMesh);
	
	// Exibe fase atual
	textMesh.text = Universal.substage.ToString();
	
	/*
	if (Universal.stage == 5) {
		transform.Find("Fases").transform.position.x -= 5;
	}
	*/
	
	exibir();
}


function som() {
	audio.PlayOneShot(confirma);
}
	
function exibir() {	
	// Localiza icone da fase selecionada
	var selecionada = transform.Find("Fases").Find("Bloco"+(coluna +1)).Find((linha + 1).ToString());
		
		
	var pan = gameObject.Find("CursorGirando(Clone)");		
	pan.transform.position = selecionada.transform.position;
	
	// Localiza texto do nome da fase
	var textMesh : TextMesh = transform.Find("Textos").Find("StageName").GetComponent(TextMesh);
	
	// Exibe nome da fase
	textMesh.text = stageName[coluna][linha];
	
	// Localiza texto do numero da fase
	textMesh = transform.Find("Textos").Find("StageNumber").GetComponent(TextMesh);
	
	// Exibe numero da fase
	textMesh.text = stageNumber[coluna][linha];
	
	// Destaca ícone da fase selecionada
	BroadcastMessage("Encolher");
	var tamanho = 1.6;
	if (selecionada != null) {	    
	    selecionada.transform.localScale.x = tamanho;
	    selecionada.transform.localScale.y = tamanho;
    }
}