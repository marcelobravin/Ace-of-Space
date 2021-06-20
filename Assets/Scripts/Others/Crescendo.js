// tamanho a ser alcançado
var tamanhoMax: int = 2;

// tempo em q ao ser atingido realiza crescimento
var frequencia = 0.01;

// var auxiliar q define o momento em q o crescimento deve acontecer
//private var momento = 0.0;
var isBlackHole : boolean = false;
var isSonic : boolean = false;

// taxa de crescimento
var crescimentoX : double = 0.01;
var crescimentoY : double = 0.01;
var crescimentoZ : double = 0.01;


var child;
function Start() {
	child = transform.FindChild("Body");
	InvokeRepeating("Crescer", frequencia, frequencia);
}

//function Update () {
function Crescer() {
	transform.localScale += Vector3(crescimentoX, crescimentoY, crescimentoY) *70*Time.deltaTime;
	
	if (isSonic) {
		child.collider.height += crescimentoX * 2;
	}
	
	if (isBlackHole) {
		rigidbody.mass += 0.02;
	}
	
	// se chegar ao tamanho maximo destroi objeto
	if (tamanhoMax != 0) {
		if (transform.localScale.x >= tamanhoMax  || transform.localScale.y >= tamanhoMax || transform.localScale.z >= tamanhoMax) {
			Destroy(gameObject);
		}
	}
}