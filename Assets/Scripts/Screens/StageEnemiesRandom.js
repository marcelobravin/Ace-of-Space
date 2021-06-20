// lista de inimigos
private var inimigo : GameObject;
private var posicao : float = 0;
private var inter : float = 5;

// bola da vez
private var hora : double = 1.0;
private var i : int = 0;

private var inimigos : Object[];

function Start(){
	inimigos = Resources.LoadAll("Enemies");
	print(inimigos.length);
}

function Update () {
	if (Time.time >= hora) {
		Instanciar();
	}	
}


function Instanciar() {
	var enemyRot;
	var vec = Vector3(0, 0, 0);

	inimigo = Definir();
	inter = Random.Range(5, 9);
	
	if (Universal.stage == 1 || Universal.stage == 3) {
		posicao = Random.Range(-4, 4);
	} else {
		posicao = Random.Range(-6, 6);
	}
	
	
	switch (Universal.stage) {
		case 1:
			vec = Vector3(-9, posicao, 0);
			enemyRot = Vector3(0, 0, 0);
		break;
		
		case 2:
			vec = Vector3(posicao, 8, 0);
			enemyRot = Vector3(0, 0, 270);
		break;
		
		case 3:
			vec = Vector3(9, posicao, 0);
			enemyRot = Vector3(0, 0, 180);
		break;
		
		case 4:
			vec = Vector3(posicao, -8, 0);
			enemyRot = Vector3(0, 0, 90);
		break;
	}
	var temp = Instantiate(inimigo, vec, inimigo.transform.rotation);
	temp.transform.Rotate(enemyRot);
	
	
	// Define hora de aparecer próximo inimigo
	hora = Time.time + inter;
	i++;
	print("inimigo: " + i);
}


function Definir() {
	var num : int =  Random.Range(0, inimigos.length);
	// random group (carrier, familia, pequeno, medio, grande, player, obstaculo)
	// escolhido = group;
	
	
	
	return inimigos[num];
}