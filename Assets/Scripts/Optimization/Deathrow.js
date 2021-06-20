// tempo de vida do objeto
var lifeTime : double = 0;

function Start() {
	//yield WaitForSeconds(lifeTime);
	Destroy(gameObject, lifeTime);
}
