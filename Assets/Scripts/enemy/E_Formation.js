var objeto : GameObject;

private var posicaoX : double = 0;
private var posicaoY : double = 0;

var numLinhas : int = 1;
var numColunas : int = 4;
var distX : double = 0.5;
var distY : double = 0.5;

function Start() {
	posicaoX = transform.position.x;
	posicaoY = transform.position.y;
	
	Construir();
}

function Construir() {
	
	// Inverte linhas e colunas	
	if (Universal.stage == 2 || Universal.stage == 4) {
		var aux;
		
		aux = numColunas;
		numColunas = numLinhas;
		numLinhas = aux;
		
		aux = distY;
		distY = distX;
		distX = aux;
		
		
		// Centraliza fases verticais
		if (numColunas % 2 == 0) {
			posicaoX += (distX / 2) * (numColunas -1);
		} else if (numColunas > 1) {
			posicaoX += distX * (numColunas / 2);
		}
	} else {
		// Centraliza fases horizontais
		if (numLinhas % 2 == 0) {
			posicaoY += (distY / 2) * (numLinhas -1);
		} else if (numLinhas > 1) {
			posicaoY += distY * (numLinhas / 2);
		}
	}
	
	// Corrige distancia
	switch (Universal.stage) {
		case 2:
			distY = 0 - distY;
		break;
		
		case 3:
			distX = 0 - distX;
		break;
	}
	
	for (var i = 0; i < numColunas; i++) {
		for (var j = 0; j < numLinhas; j++) {
			
			// Corrige posicao
			posX = posicaoX - (i * distX);
			posY = posicaoY - (j * distY);
			
			// Instancia objeto
			Instantiate(objeto, Vector3(posX, posY, 0), transform.rotation);
		}
	}	
}