var som : AudioClip;
private var luz;
private var target : Transform;
private var detonavel = false;


private var tempo : double = 0.0;
private var intervalo : double = 0.5;


function Start() {
	target = GameObject.FindWithTag("Player").transform;
	detonavel = true;
	luz = transform.Find("Spotlight").GetComponent("Light");
}




function Update() {

	if (detonavel) {
		
		if (target) {
			var alvoX = target.position.x;
			var posX = transform.position.x;
			
			var alvoY = target.position.y;
			var posY = transform.position.y;
			
			distX = Mathf.Abs(alvoX-posX);
			distY = Mathf.Abs(alvoY-posY);
			
			dist = distX + distY;
			
			//print(alvoX +" : "+ posX +" = "+ dist);
			
			
			if (dist <= 3) {
				Explodir();
				detonavel = false;
			}
		}
	} else {
		if(Time.time > tempo) {
			piscar();
		}
	}
}


function Explodir () {

	var temp = transform.GetComponent("E_Basic").bala;

	audio.PlayOneShot(som);
	yield WaitForSeconds(som.length);
	
	
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