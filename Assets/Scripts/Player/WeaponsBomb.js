static var bombs : int = 3;

var anihilator : Rigidbody;
var nova : GameObject;
var blackHole : Rigidbody;
var blast : GameObject;
var chemical : Transform;
var flash : Rigidbody;
var hyper : GameObject;

var travaArma : boolean = false;
var tickTack : AudioClip;

private var fireRate : double = 1.0;
private var nextFire : double = 0.0;
private var originalLightColor;


function Start() {
	originalLightColor = RenderSettings.ambientLight;
	
	if(Universal.selected[0] == "Bomber" || Universal.selected[0] == "Hyper") {
		if (bombs < 5) {
			bombs = 5;
		}
	}
}

function Update () { 
 	// pause off
	if (!Universal.paused) {
		if (!travaArma) {
	
			// bomba
			if (Input.GetButtonDown("Bomb") && Time.time > nextFire) {
				if (bombs > 0) {
					bombs--;
					nextFire = Time.time + fireRate;					
					
					switch(Universal.selected[4]) {
						
						case "Anihilator": Anihilator();
						break;		
					
						case "Nova Bomb": NovaBomb();
						break;
						
						case "Time Stop": TimeBomb();
						break;
						
						case "Hyper Mode": HyperMode();
						break;
						
						case "Energy Blast": Blast();
						break;
						
						case "Black Hole": BlackHole();
						break;	
						
						case "Chemical Warfare": Chemical();
						break;
						
						case "Flash": Flash();
						break;						
					}
				}
			}
		}
	}
}

// --------------------------------------------------------------------------------BOMBAS
function Anihilator() {
	Instantiate(anihilator, transform.position, transform.rotation);
}
		
function NovaBomb() {
	Instantiate(nova, transform.position, transform.rotation);
}

function BlackHole() {
	Instantiate(blackHole, transform.position, transform.rotation);
}

function Blast() {
	var temp = Instantiate(blast, transform.position, transform.rotation);
	temp.transform.parent = transform;
	yield WaitForSeconds(5);
	Destroy(temp);
}

function HyperMode() {

	// Começa
	GetComponent("WeaponsSecondary").autoFill = true;
	var tal = Instantiate(hyper, transform.position, transform.rotation);
	tal.transform.parent = transform;
	
	// Espera
	yield WaitForSeconds(5);
	
	// Termina	
	GetComponent("WeaponsSecondary").autoFill = false;	
	Destroy(tal);
}

function TimeBomb() {	
	
	//if (Time.timeScale == 1) {
		var comp = GetComponent("WeaponsPrimary");
		var originalFireRate = comp.fireRate;
		
		//var sign = Instantiate(warp, Vector3(0,0,-5), Quaternion(0,0,0,0));
		
		audio.loop = true;
		audio.clip = tickTack;
		audio.Play();
		RenderSettings.ambientLight = Color.white;
	
		// Começa
		Time.timeScale = 0.1;
		comp.fireRate *= 0.1;
		
		// Espera
		yield WaitForSeconds(1);
		
		// Termina
		Time.timeScale = 1;	
		comp.fireRate = originalFireRate;
		audio.Stop();
		RenderSettings.ambientLight = originalLightColor;
	//}
}

function Chemical() {
	Instantiate(chemical, transform.position, transform.rotation);
}
function Flash() {
	Instantiate(flash, transform.position, transform.rotation);
}