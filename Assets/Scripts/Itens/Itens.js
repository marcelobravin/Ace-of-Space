// brilhar
var shine : GameObject;

// qual item é esse
var isBomb : boolean = false;
var isEnergy1 : boolean = false;
var isEnergy2 : boolean = false;
var isLife : boolean = false;
var isPoint1 : boolean = false;
var isPoint2 : boolean = false;
var isPoint3 : boolean = false;
var isPower : boolean = false;

var isTrap1 : boolean = false;
var isTrap2 : boolean = false;
var isTrap3 : boolean = false;
var isRepair : boolean = false;
var isMax : boolean = false;

var B : GameObject;
var lifeUp : GameObject;
var points1 : GameObject;
var points2 : GameObject;
var points3 : GameObject;
var pow : GameObject;
var max : GameObject;

var pointsLose1 : GameObject;
var pointsLose2 : GameObject;
var pointsLose3 : GameObject;

var manager;
function Start() {
	// Localiza gerenciador de estatisticas
	manager = GameObject.Find("Main Camera").GetComponent("Stages");
	
	// Incrementa numero de itens
	manager.SetItens(manager.GetItens() + 1);
	
	if (transform.position.z != 0) {
		transform.position.z = 0;
	}
}

// verifica qual objeto colisor
function OnTriggerEnter(other: Collider) {
	// corpo do player 1
	if (other.gameObject.tag == ("Player")) {
		Verificar(other);
	}
	// bico do player 1
	if (other.gameObject.tag == ("Bico1")) {
		Verificar("Bico");
	}
	
	// Player2
	// corpo do player 2
	if (other.gameObject.tag == ("Player2")) {
		Verificar(other);
	}
	
	// bico do player 2
	if (other.gameObject.tag == ("Bico2")) {
		Verificar("Bico2");
	}
}

function Verificar(other) {
	
	// Inicializa texto a ser instanciado
	var texto = shine;

	// verifica se colisão foi com o bico do player 1 ou 2 e trata solicitação
	if (other == "Bico") {
		other = gameObject.FindWithTag("Player");
	} else if (other == "Bico2") {
		other = gameObject.FindWithTag("Player2");
	}
	
	// verifica qual item é esse e chama função correspondente
	if (isBomb) {
		other.SendMessage("BombUp");
		texto = B;
	}
	
	if (isEnergy1) {
		other.SendMessage("Energy", 1);
	}
	
	if (isEnergy2) {
		other.SendMessage("Energy", 2);
	}
	
	if (isLife) {
		other.SendMessage("Life");
		texto = lifeUp;
	}
	
	if (isPoint1) {
		other.SendMessage("PointsUp", 1);
		texto = points1;
	}
	
	if (isPoint2) {
		other.SendMessage("PointsUp", 2);
		texto = points2;
	}
	
	if (isPoint3) {
		other.SendMessage("PointsUp", 3);
		texto = points3;
	}
	
	if (isPower) {
		other.SendMessage("Power");
		texto = pow;
	}
	
	
	
	if (isTrap1) {
		other.SendMessage("PointsDown", 1);
		texto = pointsLose1;
	}
	if (isTrap2) {
		other.SendMessage("PointsDown", 2);
		texto = pointsLose2;
	}
	if (isTrap3) {
		other.SendMessage("PointsDown", 3);
		texto = pointsLose3;
	}
	
	if (isRepair) {
		other.SendMessage("Repair");
	}
	
	if (isMax) {
		texto = max;
	}
	
	// Executa processos
	Instantiate(texto, transform.position, Quaternion(0,180,0,0));
	manager.SetCollect(manager.GetCollect() + 1); // Incrementa numero de itens coletados
	Destroy(gameObject);
}