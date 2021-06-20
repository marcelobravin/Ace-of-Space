var filho : GameObject;

var distancia : double = 0.0;

private var ativado : boolean = false;

function Semear() {
	
	if (!ativado) {
		ativado = true;
		Instantiate(filho, Vector3(transform.position.x - distancia, transform.position.y, transform.position.z), transform.rotation);
		Instantiate(filho, Vector3(transform.position.x + distancia, transform.position.y, transform.position.z), transform.rotation);
		//Instantiate(filho, Vector3(transform.position.x , transform.position.y, transform.position.z), transform.rotation);
		Instantiate(filho, Vector3(transform.position.x, transform.position.y - distancia, transform.position.z), transform.rotation);
		Instantiate(filho, Vector3(transform.position.x, transform.position.y + distancia, transform.position.z), transform.rotation);
	}
}