var som : AudioClip;
private var luz;

private var detonavel = false;
private var tempo : double = 0.0;
private var intervalo : double = 0.5;

function Start () {
	luz = transform.Find("Spotlight").GetComponent("Light");
	yield WaitForSeconds(3);
	detonavel = true;
	Explodir();
}


function Update() {

	if (detonavel) {
		if(Time.time > tempo) {
			piscar();
		}
	}
}




function Explodir () {

	audio.PlayOneShot(som);
	yield WaitForSeconds(som.length);
	
	var temp = transform.GetComponent("E_Basic").bala;
	Instantiate(temp, transform.position, transform.rotation);
	Destroy(gameObject);
}







function piscar() {
	
	if (luz.intensity == 0) {
		luz.intensity = 8;
	} else {
		luz.intensity = 0;
	}
	
	tempo = Time.time + intervalo;
	intervalo -= 0.03;
}