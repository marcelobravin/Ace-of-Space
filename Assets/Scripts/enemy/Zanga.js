//#pragma strict

private var script;
private var vidaInicial = 4;

function Start () {
	script = GetComponent(E_Basic);
	vidaInicial = script.enemyLife;
}

function FixedUpdate() {
	if (script.enemyLife < vidaInicial) {
		transform.parent.GetComponent("FallScript").speed = 3;
		
		var pan = transform.GetComponentInChildren(E_TimedShooter);
		pan.intervalo = 1;
		pan.inicio = 0;
		pan.Define();
		
		script.originalColor = Color.red;
		Destroy(transform.parent.GetComponent("ZigZag"));
		Destroy(this);
	}
}