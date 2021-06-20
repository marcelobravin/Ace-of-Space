#pragma strict

var objeto : GameObject;

private var posicaoX : double = 0;
private var posicaoY : double = 0;

var numColunas : int = 3;
var distX : double = 0.5;
var distY : double = 0.5;

function Start() {
	posicaoX = transform.position.x;
	posicaoY = transform.position.y;
	
	// Instancia objeto no centro da formaçao
	Instantiate(objeto, Vector3(posicaoX, posicaoY, 0), transform.rotation);
	
	for (var i=1; i<numColunas; i++) {
		
		// Instancia objetos auxiliares
		switch (Universal.stage) {
			case 1:
				Instantiate(objeto, Vector3(posicaoX - (i * distX), posicaoY - (i * distY), 0), transform.rotation);
				Instantiate(objeto, Vector3(posicaoX - (i * distX), posicaoY + (i * distY), 0), transform.rotation);
			break;
			
			case 2:
				Instantiate(objeto, Vector3(posicaoX - (i * distX), posicaoY + (i * distY), 0), transform.rotation);
				Instantiate(objeto, Vector3(posicaoX + (i * distX), posicaoY + (i * distY), 0), transform.rotation);
			break;
			
			case 3:
				Instantiate(objeto, Vector3(posicaoX + (i * distX), posicaoY + (i * distY), 0), transform.rotation);
				Instantiate(objeto, Vector3(posicaoX + (i * distX), posicaoY - (i * distY), 0), transform.rotation);
			break;
			
			case 4:
				Instantiate(objeto, Vector3(posicaoX + (i * distX), posicaoY - (i * distY), 0), transform.rotation);
				Instantiate(objeto, Vector3(posicaoX - (i * distX), posicaoY - (i * distY), 0), transform.rotation);
			break;
		}
		
	}
	Destroy(this);
}