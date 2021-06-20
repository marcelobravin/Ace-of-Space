// bala : tipo, qtd e vel
var bullet : GameObject;
var bulletsNum : int = 1;
var bulletsSpeed : int = 1;

var isChild : boolean = false;
var isStar : boolean = false; // formato
var isKamikaze : boolean = false; // só uma vez?
var intervalo : double = 5.0;// tempo entre um disparo e outro
var inicio : double = 1;// primeiro disparo

var laserSize : double = 0;// primeiro disparo


// abre essa var como inicial 15?
private var angulo : double;
var range;

function Start() {
	Define();
}

function Define() {
	if(!bullet) {
		bullet = Resources.Load("Bullets/Simple/E_Bullet");
	}
	
	// define formato da onda de balas [leque/estrela]
	if (isStar) {
		angulo = 360 / bulletsNum;
	} else {
		angulo = 15;
	}
	
	// arredonda range
	if (bulletsNum % 2 == 0) {
		range = (bulletsNum/2);
	} else {
		range = (bulletsNum/2) + 0.5;
	}
	
	// Atira
	CancelInvoke("Atirar");
	InvokeRepeating("Atirar", inicio, intervalo);
}

// instancia balas
function Atirar() {

	for (var i : int = -(range); i <= range; i++) {
		
		var rot = angulo * i;
		var enemyRot = Vector3(rot,0,rot);
		var temp = Instantiate(bullet, transform.position, transform.rotation);
		temp.transform.Rotate(enemyRot);
		
		if (isChild) {
			temp.transform.parent = transform;
		}
		
		if (laserSize > 0) {
			temp.GetComponent("LaserCont").tamanhoMax = laserSize;
		}
		
		// define velocidade das balas (comuns/status)
		if (temp.GetComponent("E_StatusShot")){
			temp.GetComponent("E_StatusShot").bulletSpeed = bulletsSpeed;
		} else if (temp.GetComponent("E_Bullet")) {
			temp.GetComponent("E_Bullet").bulletSpeed = bulletsSpeed;
		}
	}
	
	// se for kamikaze autodestroi
	// ou se intervalo for igual a zero
	if(isKamikaze) {
		Destroy(gameObject);
	}
}

function DontShoot() {
	Destroy(gameObject);
}

function OnBecameInvisible() {
	Destroy(gameObject);
}
// Detach laser
function OnDestroy() {
	
	if (laserSize > 0) {
		if (transform.Find("E_Laser(Clone)")) {
			var laser = transform.Find("E_Laser(Clone)");
			laser.GetComponent("E_Bullet").bulletSpeed = 3;
			laser.transform.parent = null;
		}
	}
}