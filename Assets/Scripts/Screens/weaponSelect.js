// posicao atual
private var linha : int = 0;
private var coluna : int = 0;
var cubo : Transform;

// Efeitos sonoros
var cursor : AudioClip;
var confirma : AudioClip;

// Armas e suas descrições
var weapon = new Array(5);
var descricao = new Array(5);

// descrição das armas
// armadura
weapon[0] = new Array(8);
descricao[0] = new Array(8);

weapon[0][0] = "Light Armor";
weapon[0][1] = "Heavy Armor";
weapon[0][2] = "Charger";
weapon[0][3] = "Shooter";
weapon[0][4] = "Bomber";
weapon[0][5] = "Stealth";
weapon[0][6] = "Ace";
weapon[0][7] = "Hyper";

descricao[0][0] = "Maior velocidade ";
descricao[0][1] = "Maior resistência";
descricao[0][2] = "Mais energia";
descricao[0][3] = "Melhor cadência de tiro";
descricao[0][4] = "Mais bombas";
descricao[0][5] = "Evita tiros mais facilmente";
descricao[0][6] = "???";
descricao[0][7] = "???";

///////////////////////////////////////////////////////////////
// arma primaria
weapon[1] = new Array(8);
descricao[1] = new Array(8);

weapon[1][0] = "Machine Gun";
weapon[1][1] = "Laser";
weapon[1][2] = "Spreader";
weapon[1][3] = "Blaster";
weapon[1][4] = "Venom";
weapon[1][5] = "Grenade";
weapon[1][6] = "Sonic Wave";
weapon[1][7] = "???";

descricao[1][0] = "Tiro rápido";
descricao[1][1] = "Tiro contínuo";
descricao[1][2] = "Amplo alcance";
descricao[1][3] = "Concentra energia";
descricao[1][4] = "Causa dano contínuo";
descricao[1][5] = "Explode com impacto";
descricao[1][6] = "Atravessa armadura";
descricao[1][7] = "ARMA EXPERIMENTAL";

///////////////////////////////////////////////////////////////
// arma secundaria
weapon[2] = new Array(8);
weapon[2][0] = "Shotgun";
weapon[2][1] = "Cannon";
weapon[2][2] = "Wave";
weapon[2][3] = "Mine";
weapon[2][4] = "Homing Missile";
weapon[2][5] = "Web Shot";
weapon[2][6] = "Missile";
weapon[2][7] = "Missile Salvo";

descricao[2] = new Array(8);
descricao[2][0] = "Amplo alcance";
descricao[2][1] = "Dano concentrado";
descricao[2][2] = "Atravessa armadura";
descricao[2][3] = "4 explosões";
descricao[2][4] = "Persegue inimigo";
descricao[2][5] = "Desacelera inimigos";
descricao[2][6] = "Explode ao contato";
descricao[2][7] = "Múltiplos mísseis";

///////////////////////////////////////////////////////////////
weapon[3] = new Array(8);
weapon[3][0] = "Ballistic Shield"; // refletir tiro?
weapon[3][1] = "Force Field";
weapon[3][2] = "Agressive Shield";
weapon[3][3] = "Time";
weapon[3][4] = "Bit";
weapon[3][5] = "Hero's Fortune"; // instancia atirador
weapon[3][6] = "Hyperspace Warp";
weapon[3][7] = "Defense System";

descricao[3] = new Array(8);
descricao[3][0] = "Protege contra tiros";
descricao[3][1] = "Fica invencível";
descricao[3][2] = "Fica invencível e causa dano por contato";
descricao[3][3] = "Desacelera o tempo";
descricao[3][4] = "Invoca nave auxiliar";
descricao[3][5] = "Faz surgir um item aleatório";
descricao[3][6] = "Teletransporta";
descricao[3][7] = "Protege contra alterações de status";

///////////////////////////////////////////////////////////////
// bomba
weapon[4] = new Array(8);
weapon[4][0] = "Anihilator";
weapon[4][1] = "Nova Bomb";
weapon[4][2] = "Time Stop";
weapon[4][3] = "Hyper Mode";
weapon[4][4] = "Energy Blast";
weapon[4][5] = "Chemical Warfare";
weapon[4][6] = "Flash";
weapon[4][7] = "Black Hole";

descricao[4] = new Array(8);
descricao[4][0] = "Causa grande dano";
descricao[4][1] = "Causa dano em todos inimigos";
descricao[4][2] = "Paralisa o tempo";
descricao[4][3] = "Não gasta energia temporariamente";
descricao[4][4] = "Dispara um feixe destrutivo";
descricao[4][5] = "Causa dano e envenena inimigos";
descricao[4][6] = "Causa dano e destrói tiros inimigos";
descricao[4][7] = "???";
//////////////////////////////////////////////////////////////////////////////////////

// Controles
function Update () {
	// move cursor -------------------------------------------------------------------------
	if (Input.GetKeyDown("left")) {
		som();
		if (linha > 0) {
			linha--;
		} else {
			linha = 7;
		}
		exibir();
	} else if (Input.GetKeyDown("right")) {
		som();
		if (linha < weapon[coluna].length - 1) {
			linha++;
		} else {
			linha = 0;
		}
		exibir();
	} else if (Input.GetKeyDown("down")) {
		som();
		if (coluna < weapon.length - 1) {
			coluna++;
		} else {
			coluna = 0;
		}
		exibir();
	} else if (Input.GetKeyDown("up")) {
		som();
		if (coluna > 0) {
			coluna--;
		} else {
			coluna = 4;
		}
		exibir();
	}
	
	// realiza selecao ----------------------------------------------------------------------
	if (Input.GetButtonDown("Fire1")) {
		//audio.PlayOneShot(confirma);
		audio.PlayOneShot(cursor);
		
		Universal.selected[coluna] = weapon[coluna][linha];
		
		// Localiza icone da arma
		var selecionada = transform.Find("Fases").Find("Bloco"+(linha +1)).Find((coluna + 1).ToString());		
		
		var pan = gameObject.Find("cubo"+coluna);
		pan.transform.position = selecionada.transform.position;
	}
	
	if (Input.GetButtonDown("Bomb")) {
		Application.LoadLevel("StageSelect");
	}
	
	if (Input.GetButtonDown("Fire2")) {
		Application.LoadLevel("Opening");
	}
}

function Start() {
	exibir();
	Universal.selected[0] = weapon[0][0];
	Universal.selected[1] = weapon[1][0];
	Universal.selected[2] = weapon[2][0];
	Universal.selected[3] = weapon[3][0];
	Universal.selected[4] = weapon[4][0];
}

function som() {	
	audio.PlayOneShot(confirma);
}

function exibir() {

	// Localiza icone da arma
	var selecionada = transform.Find("Fases").Find("Bloco"+(linha +1)).Find((coluna + 1).ToString());
	
	// Localiza texto do nome da arma
	var textMesh : TextMesh = transform.Find("Textos").Find("WeaponName").GetComponent(TextMesh);
	
	// Exibe nome da arma
	textMesh.text = descricao[coluna][linha];
	
	// Localiza texto da descrição da arma
	textMesh = transform.Find("Textos").Find("WeaponDescription").GetComponent(TextMesh);
	textMesh2 = transform.Find("Textos").Find("WeaponDescription").Find("WeaponDescription").GetComponent(TextMesh);
	
	// Exibe descrição da arma
	var tipoArma = "";
	switch(coluna) {
		case 0: tipoArma = "Armadura";
		break;
		case 1: tipoArma = "Arma Primaria";
		break;
		case 2: tipoArma = "Arma Secundaria";
		break;
		case 3: tipoArma = "Habilidade Especial";
		break;
		case 4: tipoArma = "Bomba";
		break;
	}
	
	textMesh.text = tipoArma + ": " + weapon[coluna][linha];
	textMesh2.text = tipoArma + ": " + weapon[coluna][linha];
	
	// Destaca ícone da arma selecionada (hoverizada)
	BroadcastMessage("Encolher");
	var tamanho = 1.8;
	if (selecionada != null) {
	    selecionada.transform.localScale.x = tamanho;
	    selecionada.transform.localScale.y = tamanho;
    }    
}


/*
var stringToEdit : String = "P1";
function OnGUI () {
	// Make a text field that modifies stringToEdit.
	//stringToEdit = GUILayout.TextField (stringToEdit, 25);
	
	
	
	
	GUI.SetNextControlName("Text1");
	stringToEdit = GUILayout.TextField(stringToEdit);
	Universal.playerName[0] = stringToEdit;
}
*/