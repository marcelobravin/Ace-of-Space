#pragma strict
/*
function OnDestroy() {
	//Destroy(gameObject.Find("Laser"));
	Destroy(transform.parent.Find("Laser").gameObject);
}
*/


// Ao morrer destroi escudo
function OnDestroy() {
	var x = transform.parent.FindChild("Laser");
	if (x) {
		x.parent = transform;
		Destroy(x.gameObject);
	}
}