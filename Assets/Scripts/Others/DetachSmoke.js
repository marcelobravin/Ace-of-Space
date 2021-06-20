#pragma strict

function OnDestroy () {
	var fumaca = transform.Find("Smoke");
	if (fumaca) {
		fumaca.particleEmitter.minEmission = 0;
		fumaca.particleEmitter.maxEmission = 0;
		//fumaca.transform.parent = transform.parent;
		fumaca.transform.parent = null;
	}
}