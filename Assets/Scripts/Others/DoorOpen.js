// ao colidir
function OnTriggerEnter ( otherObject : Collider ) {
	// se colidir com inimigo blindado
	if (otherObject.gameObject.GetComponent("GenericBullet")) {		
		gameObject.SendMessageUpwards("Open", 50);
	}
}