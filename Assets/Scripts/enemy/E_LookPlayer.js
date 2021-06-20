private var lookAtTarget : Transform;

private var desistencia : double = 0.0;
var perseguicao : double = 0;



function Start() {

	// colocar p2
	if (GameObject.FindWithTag("Player")) 	{
		lookAtTarget = GameObject.FindWithTag("Player").transform;
	}
	
	if (perseguicao > 0) {
		desistencia = Time.time + perseguicao;	
	}
	
	//InvokeRepeating("Perseguir", 0.1,0.1);
}

function Update() {
	// Colocar delay
	transform.LookAt(lookAtTarget);
	
	
	
	if (perseguicao > 0 && Time.time > desistencia) {
		Destroy(this);
	}
}