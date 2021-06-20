//Atributos do jogador
static var power : int = 0;
static var carga : double = 0;
private var travaArma : boolean = false;
private var fireRate : double = 0.1;
private var nextFire : double = 0.0;
var barraCheia : AudioClip;

// tiros comuns
var bullet: Transform;
var bullet2 : Transform;
var bullet3 : Transform;
var bullet4 : Transform;

// tiro grande
var bigBullet1: Transform;
// laser
var laser: Rigidbody;
// granade launcher
var grenade1: Rigidbody;
// sonic
var sonic1: GameObject;
// venom
var venom1 : Rigidbody;
var spreader : GameObject;

var experimental : Rigidbody;

function Start() {

	// Definição de firerate de acordo com arma selecionada
	switch(Universal.selected[1]) {
		case "Machine Gun": fireRate = 0.1;
		break;
		case "Spreader": fireRate = 0.1;
		break;
		case "Grenade": fireRate = 0.3;
		break;
		case "Sonic Wave": fireRate = 0.1;
		break;
		case "Venom": fireRate = 0.1;
		break;
		case "Blaster": fireRate = 0.3;
		break;
		case "Laser": fireRate = 0.05;
		break;
		case "???": fireRate = 0.3;
		break;
	}
	
	// melhoria de firerate de acordo com armadura selecionada
	if(Universal.selected[0] == "Shooter" || Universal.selected[0] == "Hyper") {
		fireRate = fireRate / 2;
	}	
}

function Update () {
 
 	// pause off
	if (Universal.paused == false) {
		if (travaArma == false) {
		
		
			//APERTAR TIRO---------------------------------------------------------------------
			if (Input.GetButtonDown("Fire1") && Time.time > nextFire) {
				
				switch(Universal.selected[1]) {
					case "Machine Gun":
						Gun();
						armaPrimaria();
					break;
					
					case "Spreader":
						Spreader();
						armaPrimaria();
					break;
					
					case "Grenade":
						Grenade();
						armaPrimaria();
					break;
					
					case "Sonic Wave":
						Sonic();
						armaPrimaria();
					break;
					
					case "Venom":
						Venom();
						armaPrimaria();
					break;
					
					case "Blaster":
						Blaster();
						armaPrimaria();
					break;
					
					case "???":
						Disruptor();
						armaPrimaria();
					break;
				}
			}
			
			
			//SEGURAR TIRO---------------------------------------------------------------------
			if (Input.GetButton("Fire1")) {				
				switch(Universal.selected[1]) {
				
					case "Blaster":
						if (carga < 100) {
							carga += 20 * Time.smoothDeltaTime;
							if (carga > 99) {
								audio.PlayOneShot(barraCheia);
							}
						} else {
							carga = 100;
						}
					break;
					
					case "Laser":
						carga += (1 + power) * 0.3 * Time.smoothDeltaTime;
						if (carga >= fireRate) {
							Laser();
							//armaPrimaria();
							carga = 0;
						}
					break;
				}
			}
			
			//SOLTAR TIRO---------------------------------------------------------------------
			if (Input.GetButtonUp("Fire1") && Time.time > nextFire) {
				
				switch(Universal.selected[1]) {				
					case "Blaster":
						Blaster();
						armaPrimaria();
					break;
				}
			}
		}
	}
}

////////////////////////////////////////////////////FUNÇÕES ARMAS
function armaPrimaria() {
/*
	if (!Universal.PRODUCAO) {
		print("Arma primaria: " + Universal.selected[1] + " Firerate: " + fireRate);
	}
	*/
	nextFire = Time.time + fireRate;
}

//////////////////////////////////////////////////////////////////////////

// --------------------------------------------------------------------------------ARMA PRIMARIAS
function Gun() {
	switch (power) {
		case 0: Instantiate(bullet, transform.position, transform.rotation);
		break;
		case 1: Instantiate(bullet2, transform.position, transform.rotation);
		break;
		case 2: Instantiate(bullet3, transform.position, transform.rotation);
		break;
		case 3: Instantiate(bullet4, transform.position, transform.rotation);
		break;
	}
}

function Grenade() {
	var grenade = Instantiate(grenade1, transform.position, transform.rotation);
	grenade.GetComponent("Explosion").poder = power + 1;
}

function Sonic() {	
	var son = Instantiate(sonic1, transform.position, transform.rotation);
	son.GetComponent("Crescendo").crescimentoX = 0.02 + (power * 0.02);
}

function Blaster() {
	var indiceCarga : double = carga / 10;
	indiceCarga =  Mathf.RoundToInt(indiceCarga);
	
	var shot = Instantiate(bigBullet1, transform.position, transform.rotation);		
	shot = shot.Find("Body");
	
	shot.GetComponent("GenericBullet").bulletPower = 2 + (2 * power) + (indiceCarga * 2);
	
	var tamanho : double = 2;	
	var tamanhoFinal : double = (1 + (0.3 * power) + (indiceCarga / 10)) / tamanho;
	
	shot.particleEmitter.maxSize = tamanhoFinal;
	shot.particleEmitter.minSize = tamanhoFinal;
	shot.collider.radius = tamanhoFinal * 0.8;
	
	if(carga > 50) {
		shot.GetComponent("GenericBullet").isPiercer = true;
	}
	
	carga = 0;
}

function Laser() {
	Instantiate(laser, transform.position, transform.rotation);
}

function Venom() {	
	var ven = Instantiate(venom1, transform.position, transform.rotation);
	ven.GetComponent("GenericBullet").veneno = (power + 1) * 2;
	
	var crescimento = 0.05 * power;
	ven.transform.localScale += Vector3(crescimento, crescimento, crescimento);
}

function Spreader() {
	var temp3 = Instantiate(spreader, transform.position, transform.rotation);
	temp3.gameObject.GetComponentInChildren(E_TimedShooter).bulletsNum =  0 + (power * 2);
}

function Disruptor() {
	var tiro = Instantiate(experimental, transform.position, transform.rotation);
	tiro.GetComponent("GenericBullet").bulletPower = power + 1;
	
	
	if (power >= 1) {
		tiro.GetComponent("Explosion").poder = power + 1;
	} else {
		Destroy(tiro.GetComponent("Explosion"));
	}
	
	if (power >= 2) {
		tiro.GetComponent("GenericBullet").veneno = power + 1;
	}
	
	if (power >= 3) {
		tiro.GetComponent("GenericBullet").isPiercer = true;
	}
	
	var crescimento = 0.1 * power;
	tiro.transform.localScale += Vector3(crescimento, crescimento, crescimento);
}