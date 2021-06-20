#pragma strict

var blow : Rigidbody;
var main : Transform;
//var isMultiple : boolean = false;

//var poder = 5;
var isMain : boolean = false;

private var vezes : int = 2;

// Impede o instanciamento de multiplas explosões em caso de colisão simultanea
private var ativado : boolean = false;

function Start () {
	if (!isMain){
		Instantiate(blow, transform.position, transform.rotation);
		InvokeRepeating("Explosao", 0.2, 0.2);
	}
}

function Explosao () {
	
	if (vezes <= 0) {
		//yield WaitForSeconds(0.5);
		//Destroy(gameObject);
		CancelInvoke("Explosao");
		
	} else {
		var numero1 = Random.Range(-1, 1);
		var numero2 = Random.Range(-1, 1);
		
		var posicao1 = Vector3(transform.position.x + numero1 ,transform.position.y + numero2, transform.position.z);
		
		var temp = Instantiate(blow, posicao1, transform.rotation);
		//temp.transform.parent = transform;
		var pan = temp.GetComponent("Crescendo");
		vezes--;
	}
}

//acertar inimigo
function OnTriggerEnter ( otherObject : Collider ) {
	if (main) {
		if ( otherObject.gameObject.tag == "Enemy" || otherObject.gameObject.tag == "EnemyArmored") {
			
			if (!ativado) {
				var temp = Instantiate(main, transform.position, transform.rotation);
			}
			ativado = true;
		}
	}
}