//function Update() {
function FixedUpdate() {
	if (transform.childCount == 0) {
		Destroy(gameObject);
	}
}