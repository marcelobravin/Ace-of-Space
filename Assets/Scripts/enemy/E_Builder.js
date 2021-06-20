var numLinhas : int = 4;
private var numColunas : int = 1; // Definido pela largura da fase

private var posicaoX : double = 0;
private var posicaoY : double = 4.7;
private var distX : double = 0.5;
private var distY : double = 0.5;

var isMini : boolean = false;
var isMined : boolean = false;
var isRocky : boolean = false;
var isRockMetal : boolean = false;
var isMetal : boolean = false;
var isGravital : boolean = false;

var tijolinho : GameObject;
var tijolo : GameObject;
var bomba : GameObject;
var pedra : GameObject;
var metal: GameObject;
var gravital : GameObject;

	
function Start() {
	posicaoX = -transform.position.x;
	posicaoY = -transform.position.y;
	
	var random : boolean = false;
	var objeto;
	var objeto2;
	
	if (isMined) {
		random = true;
		
		objeto = tijolo;
		objeto2 = bomba;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 20;
			posicaoY += 5.25;
		} else {
			numColunas = numLinhas;
			numLinhas = 27;
			posicaoX += 7;
		}
	}
	
	if (isRocky) {
		objeto = pedra;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 10;
			posicaoY += 5.5;
		} else {
			numColunas = numLinhas;
			numLinhas = 13;
			
			posicaoX += 7;
		}
	}	
		
	if (isRockMetal) {
		random = true;
		objeto = pedra;
		objeto2 = metal;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 10;
			posicaoY += 5.5;
		} else {
			numColunas = numLinhas;
			numLinhas = 13;
			
			posicaoX += 7;
		}
	}
	
	if (isMini) {
		objeto = tijolinho;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 32;
			posicaoY += 4.95;
		} else {
			numColunas = numLinhas;
			numLinhas = 43;
			posicaoX -= 0.4;
		}
	}
	
	if (isGravital) {
		objeto = gravital;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 10;
			posicaoY += 5.5;
		} else {
			numColunas = numLinhas;
			numLinhas = 13;			
			posicaoX += 7;
		}
	}
	
	
	if (isMetal) {
		objeto = metal;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			numColunas = 10;
			posicaoY += 5.5;
		} else {
			numColunas = numLinhas;
			numLinhas = 13;			
			posicaoX += 7;
		}
	}
	
	// gambi corretiva
	distX = objeto.transform.localScale.x - 0.001;
	distY = objeto.transform.localScale.y;
	
	if (Universal.stage == 1 || Universal.stage == 3) {		
		distX = 0 - distX;
	}
	
	if (objeto == metal) {
		var num = -1;
		var num2 = -1;
		
		if (Universal.stage == 1 || Universal.stage == 3) {		
			num = Mathf.RoundToInt(Random.Range(1, 9));
			print(num + " Se vier zero mudar o random range pra 1 !!");
		} else {
			num2 = Mathf.RoundToInt(Random.Range(1, 12));
			print(num2 + " Se vier zero mudar o random range pra 1 !!");			
		}
	}
	
	// Constroi
	for (var i = 1; i <= numLinhas; i++) {
		for (var j = 1; j <= numColunas; j++) {
			var pan;
			if (random) {
				// Aleatoriza
				if (Random.Range(0, 20) >=0.1) {
					pan = Instantiate(objeto, Vector3((i * distX) - posicaoX, (j * distY) - posicaoY, 0), transform.rotation);
				} else {
					pan = Instantiate(objeto2, Vector3((i * distX) - posicaoX, (j * distY) - posicaoY, 0), transform.rotation);
				}
			} else {
				if (objeto == metal) {
					
					if (j != num && j != num + 1 && i != num2 && i != num2 + 1) {
						pan = Instantiate(objeto, Vector3((i * distX) - posicaoX, (j * distY) - posicaoY, 0), transform.rotation);
					}
				} else {
					pan = Instantiate(objeto, Vector3((i * distX) - posicaoX, (j * distY) - posicaoY, 0), transform.rotation);
					
				}				
			}
			
			// Agrupa blocos em um objeto
			if (pan) {
				pan.transform.parent = transform;
			}
		}
	}	
}