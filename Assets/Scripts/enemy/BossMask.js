#pragma strict
var mask : Transform;

var tempo : int = 0;
var limiar : int = 10;
//private var grunhido;

function Start() {	
	InvokeRepeating("Restore", 1, 1);
	//grunhido = Resources.Load("Audio/SE/Sons de teste/19041^jetstart2");
	//audio.PlayOneShot(grunhido);
}

//function Update () {
function Restore() {
	if (!transform.Find(mask.name)) {
		tempo++;
		
		if (tempo >= limiar) {
			if (transform.Find("Body")) {
				tempo = 0;
				var bm = Instantiate(mask, transform.position, mask.rotation);
				bm.transform.parent = transform;
				bm.name = mask.name;
				//audio.PlayOneShot(grunhido);
			}
		}
	}	
}

function BossDead() {	
	Destroy(gameObject);
}