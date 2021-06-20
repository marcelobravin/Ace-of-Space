var carregamento: double = 0.0;

function Start() {
	particleEmitter.emit = false;
	if (Universal.selected[1] != "Blaster") {
		Destroy(this);
	}
}

function Update () {

	//if (Universal.selected[1] == "Blaster") {
		if (Input.GetButtonUp("Fire1")) {
			particleEmitter.emit = false;
			particleEmitter.maxSize = 0.01;
			particleEmitter.maxEmission = 0;
		}
		
		if (Input.GetButtonDown("Fire1")) {
			particleEmitter.emit = true;
		}
	//}
	
	if (particleEmitter.emit == true) {
		var carga = transform.parent.parent.Find("Capsule").GetComponent("WeaponsPrimary").carga;
		particleEmitter.maxEmission = carga;
		particleEmitter.maxSize = carga * 0.01;
	}
}