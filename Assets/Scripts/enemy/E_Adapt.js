private var shooter : GameObject;
private var recuar: boolean = false;
private var velInicial : double = 0;
private var rastrear;

function Awake() {
	// Memoriza velocidade inicial para caso de ser atingido por slow
	rastrear = transform.parent.GetComponent("Track");
	velInicial = rastrear.speed;

	// Equipa Lança missel
	shooter = Resources.Load("Shooters/AbstractShooter");
	sh = Instantiate(shooter, transform.position, transform.rotation);
	sh.transform.parent = transform;
	sh.transform.Rotate(Vector3(0,90,0));
	
	script = sh.GetComponentInChildren(E_TimedShooter);
	script.bullet = Resources.Load("Bullets/Special/E_HomingMissile");
	script.bulletsSpeed = 3;
	script.intervalo = 5;
	script.bulletsNum = 1;
	script.isStar = false;
	
	// Equipa 1 arma aleatoria ou todas se for hyper
	if (transform.name == "PlayerEnemyHyper") {
		for (var i=0; i<=10; i++) {
			Equipar(i);
		}
	} else {
		var x : int = 0;
		x = Random.Range(1, 9);
		Equipar(x);
	}
}

// Cancela poison e slow
function StatusOff() {
	transform.GetComponent("E_Basic").poisonLevel = 0;
	
	if (rastrear.speed < velInicial) {
		rastrear.speed = velInicial;
	}
}

// Ir embora
function Recuar() {
	recuar = true;
	//BroadcastMessage("DontShoot");
}

function FixedUpdate() {
	if (recuar) {
		transform.Translate(Vector3.back * 2 * Time.deltaTime);
	}
}

function Equipar(arma) {
	switch(arma) {
		case 1:
			print("anihilator");
			shooter = Resources.Load("Shooters/AbstractShooter");
			sh = Instantiate(shooter, transform.position, transform.rotation);
			sh.transform.parent = transform;
			sh.transform.Rotate(Vector3(0,90,0));
			
			script = sh.GetComponentInChildren(E_TimedShooter);
			script.bullet = Resources.Load("Bullets/Simple/E_BigBullet");
			script.bulletsSpeed = 6;
			script.intervalo = 6;
			script.bulletsNum = 1;
			script.isStar = false;
		break;
		
		case 2:
			print("shield");
			shooter = Resources.Load("Obstacles/Simple/E_Shield");
			sh = Instantiate(shooter, transform.position, transform.rotation);
			sh.transform.parent = transform.parent;
		break;
		
		case 3:
			print("Spreader");
			script = transform.FindChild("Shooter").GetComponentInChildren(E_TimedShooter);
			script.bulletsNum = 5;
			script.Define();
		break;
		
		case 4:
			print("regen");
			transform.GetComponent("E_Basic").InvokeRepeating("Regenerar", 3, 3);	
		break;
		
		case 5:
			print("mine");
			shooter = Resources.Load("Shooters/AbstractShooter");
			sh = Instantiate(shooter, transform.position, transform.rotation);
			sh.transform.parent = transform;
			sh.transform.Rotate(Vector3(0,90,90));
			
			script = sh.GetComponentInChildren(E_TimedShooter);
			script.bullet = Resources.Load("Enemies/Outros/Mine");
			script.intervalo = 5;
			script.inicio = script.intervalo;
			script.bulletsNum = 1;
		break;
		
		case 6:
			print("Laser");
			script = transform.FindChild("Shooter").GetComponentInChildren(E_TimedShooter);
			script.bullet = Resources.Load("Bullets/Simple/E_Laser");
			script.intervalo = 5;
			script.laserSize = 3;
		break;
		
		case 7:
			print("chaos");			
			shooter = Resources.Load("Shooters/AbstractShooter");
			sh = Instantiate(shooter, transform.position, transform.rotation);
			sh.transform.parent = transform;
			sh.transform.Rotate(Vector3(270,90,0));
		
			script = sh.GetComponentInChildren(E_TimedShooter);
			script.bullet = Resources.Load("Bullets/Status/E_ChaosShot");
			script.bulletsSpeed = 3;
			script.intervalo = 5;
			script.bulletsNum = 5;
			script.isStar = false;
		break;
		
		case 8:
			print("status defense");
			InvokeRepeating("StatusOff", 0.1, 0.1);
		break;
		
		case 9:
			print("speed");
			rastrear.speed = 8;
			velInicial = rastrear.speed;
		break;
		
		/*
		case 10:
			print("metal");
			shooter = Resources.Load("Shooters/AbstractShooter");
			sh = Instantiate(shooter, transform.position, transform.rotation);
			sh.transform.parent = transform;
			sh.transform.Rotate(Vector3(0,90,90));
			
			script = sh.GetComponentInChildren(E_TimedShooter);
			script.bullet = Resources.Load("Obstacles/Simple/BlocoMetalGasoso");
			script.intervalo = 5;
			script.inicio = 5;
			script.bulletsNum = 1;
		break;
		*/
	}
}

// Ao morrer destroi escudo
function OnDestroy() {
	var x = transform.parent.FindChild("E_Shield(Clone)");
	if (x) {
		x.parent = transform;
		Destroy(x.gameObject);
	}
}