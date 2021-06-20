// vetor de materiais
var materials : Material[];
var originalColor;

function Start () {
	// memoriza a cor inicial da nave
	originalColor = transform.renderer.material.color;
	DefinirChassi();
}

private var matNum : int = 0;

function Update () {

	
	if (!Universal.PRODUCAO) {
		// troca material da nave ao apertar botão 1
		if(Input.GetKeyDown("2")) {
			if (matNum < materials.Length - 1) {
				matNum++;
			} else {
				matNum = 0;
			}
			transform.renderer.material = materials[matNum];
			print("Material: " + matNum);
		}
		
		/*
		// muda tamanho da nave ao apertar botão 2
		if(Input.GetKeyDown("2")) {
			GameObject.FindWithTag("Player").transform.localScale -= Vector3(0.1, 0.1, 0.1);
			print("Tamanho: " + transform.localScale);
		}
		*/
	}
}

var mesh : Mesh;
function DefinirChassi() {

	//case "Light Armor";
	transform.renderer.material = materials[0];
	
	// muda material de acordo com armadura selecionada
	switch (Universal.selected[0]) {
		case "Heavy Armor": transform.renderer.material = materials[1];
		break;
			
		case "Charger": transform.renderer.material = materials[2];
		break;
			
		case "Shooter": transform.renderer.material = materials[3];
		break;
			
		case "Bomber": transform.renderer.material = materials[4];
		break;
			
		case "Stealth":
			GameObject.FindWithTag("Player").transform.localScale = Vector3(0.6, 0.6, 0.6);
		break;
			
		case "Ace": transform.renderer.material = materials[5];
		break;
			
		case "Hyper": transform.GetComponent(MeshFilter).mesh = mesh;
		break;
	}
}



// colore nave de acordo com status do script "common"
function Colorir(cor) {
//transform.renderer.material.color = Color(.1, .9, .9, 1);
	
	
	//print(transform.renderer);
	if (transform.renderer.material) {
		if (cor == "OriginalColor") {
			transform.renderer.material.color = originalColor;
		}
		
		if (cor == "Slow") {
			transform.renderer.material.color = Color.cyan;
		}
		
		if (cor == "Haste") {
			transform.renderer.material.color = Color.yellow;
		}
		
		if (cor == "TravaArma") {
			transform.renderer.material.color = Color.green;
		}
		
		if (cor == "TravaDirecao") {
			transform.renderer.material.color = Color.magenta;
		}
		
		if (cor == "Confusao") {
			transform.renderer.material.color = Color.black;
		}
		
		// Cor do heavy e hyperArmor
		if (cor == "Danificado") {
			transform.renderer.material.color = Color.red;
		}
	}
}


// Começa a piscar quando invencivel
function piscar(ativar) {
	if (ativar) {
		InvokeRepeating("pan", 0, 0.1);
	} else {
		CancelInvoke("pan");		
		transform.renderer.enabled = true;
	}
}


function pan() {
	if (transform.renderer.enabled) {
		transform.renderer.enabled = false;
	} else {
		transform.renderer.enabled = true;
	}
}