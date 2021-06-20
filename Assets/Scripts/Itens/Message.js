function Start() {
	InvokeRepeating("Subir", 0.5, 0.01);
	yield WaitForSeconds(3);
	Destroy(gameObject);
}

function Subir () {
	transform.position.y += 0.2 * Time.smoothDeltaTime;
}