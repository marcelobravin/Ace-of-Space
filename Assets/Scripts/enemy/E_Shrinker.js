var encolhedor : boolean = true;
var escala : double = 0.1;

var isX : boolean = false;
var isY : boolean = false;
var isZ : boolean = false;

// verifica se crescer ou encolher
function Tamanho(bulletPower) {
	if (encolhedor) {
		Encolher(bulletPower);
	} else {
		Crescer(bulletPower);
	}
}

// encolhe de acordo com o bulletpower
function Encolher(bulletPower) {

	if (isX) {
		transform.localScale.x -= escala * bulletPower;
	}
	
	if (isY) {
		transform.localScale.y -= escala * bulletPower;
	}
	
	if (isZ) {
		transform.localScale.z -= escala * bulletPower;
	}
}

// cresce de acordo com o bulletpower
function Crescer(bulletPower) {
	transform.localScale.x += escala * bulletPower;
	transform.localScale.y += escala * bulletPower;
	transform.localScale.z += escala * bulletPower;
}