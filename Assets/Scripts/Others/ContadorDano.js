private var danoTotal : int = 0;
private var contar : boolean = true;

var tempo : double = 10;

function Hit(dano) {
	if (contar) {
		danoTotal += dano;
		print(danoTotal);
	}
}

function Continuo(dano) {
	if (contar) {
		danoTotal += dano;
	}
}

function Web() {
	
}


function Start() {
	if (tempo > 0) {
		yield WaitForSeconds(tempo);
		contar = false;
	}
}