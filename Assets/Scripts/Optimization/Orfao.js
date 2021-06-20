#pragma strict

function FixedUpdate() {
	if (transform.parent == null) {
		Destroy(gameObject);
	}
}