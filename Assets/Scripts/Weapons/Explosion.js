// AFETA MINA E MISSIL
var blow : Rigidbody;
var poder = 5;

// Impede o instanciamento de multiplas explosões em caso de colisão simultanea
private var ativado : boolean = false;

//acertar inimigo
function OnTriggerEnter ( otherObject : Collider ) {
	if ( otherObject.gameObject.tag == "Enemy" || otherObject.gameObject.tag == "EnemyArmored") {
		
		if (!ativado) {
			var temp = Instantiate(blow, transform.position, transform.rotation);
			temp.GetComponent("Crescendo").tamanhoMax = poder;
			
			if (temp.GetComponent("GenericBullet")) {
				temp.GetComponent("GenericBullet").bulletPower = poder;
			}
			ativado = true;
		}
	}
}