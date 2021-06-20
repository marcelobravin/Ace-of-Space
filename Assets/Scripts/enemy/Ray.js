var materials : Material[];
private var matNum : int = 0;

var inicio : double = 0.0;
var intervalo : double = 0.0;

function Start() {
	InvokeRepeating("Trocar", inicio, intervalo);
}

function Trocar() {

	if (matNum < materials.Length - 1) {
		matNum++;
	} else {
		matNum = 0;
	}
	
	transform.renderer.material = materials[matNum];
	if (matNum == 1) {
		collider.enabled = false;
	} else {
		collider.enabled = true;
	}
}