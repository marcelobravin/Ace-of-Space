var speed : double = 1;
private var cima : boolean = true;
private var fronteira : double = 0;
var movimento : double = 0;

private var fronteiraV : double = 6;
private var fronteiraH : double = 4.5;
var posicaoInicial;
var posicao;

function Start() {
	
	if (Universal.stage == 1 || Universal.stage == 3) {
		posicaoInicial = transform.position.y;
		fronteira = fronteiraH;
	} else {
		posicaoInicial = transform.position.x;
		fronteira = fronteiraV;
	}
	
	// randomizar direcao ?
	cima = true;
}


function Update () {
	amtToMove = speed * Time.deltaTime;
	
	if (Universal.stage == 1 || Universal.stage == 3) {
		posicao = transform.position.y;
	} else {
		posicao = transform.position.x;
	}
	
	// Move
	if (cima) {
		if (Universal.stage == 1 || Universal.stage == 3) {
			transform.position.y += amtToMove;
		} else {
			transform.position.x += amtToMove;
		}
	} else {
		if (Universal.stage == 1 || Universal.stage == 3) {
			transform.position.y -= amtToMove;
		} else {
			transform.position.x -= amtToMove;
		}
	}
	
	// Não sai da area designada
	if (movimento > 0) {
		// Calcula diferença entre posicao inicial e atual
		var diferenca = posicaoInicial - posicao;
		
		if (diferenca >= movimento) {
			cima = true;
		}
		
		if (diferenca <= -movimento) {
			cima = false;
		}
	}
	
	// Não sai da tela
	if (posicao >= fronteira) {
		cima = false;
	}
	
	if (posicao <= -fronteira) {
		cima = true;
	}
}