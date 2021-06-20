// iniciliza como falso
function Start () {
	Desfumacar();
}

function Esfumacar () {
	particleEmitter.emit = true;
}

function Desfumacar () {
	particleEmitter.emit = false;
}