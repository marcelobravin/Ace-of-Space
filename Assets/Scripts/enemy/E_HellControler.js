var inicio : double = 1;
var intervalo : double = 5.0;
var hell : GameObject;


var bullet : GameObject;
var bulletsNum : int = 1;
var bulletsSpeed : int = 1;

var firerate : double = 1.0;
var lifeTime : double = 5.0;

var mira : boolean = false;
var giroX : double = 0.0;
//var giroY : double = 0.0;
//var giroZ : double = 0.0;


function Start() {	
	InvokeRepeating("Atirar", inicio, intervalo);
}



function Atirar() {
	
	var temp = Instantiate(hell, transform.position, transform.rotation);
	
	// teste pai
	temp.transform.parent = transform;
	temp.GetComponent("E_TimedShooter").bullet = bullet;
	temp.GetComponent("E_TimedShooter").bulletsNum = bulletsNum;
	temp.GetComponent("E_TimedShooter").bulletsSpeed = bulletsSpeed;
	temp.GetComponent("E_TimedShooter").intervalo = firerate;
	
	
	temp.GetComponent("Deathrow").lifeTime = lifeTime;
	
	
	temp.GetComponent("Spin").giroX = giroX;
	//temp.GetComponent("Spin").giroY = giroY;
	//temp.GetComponent("Spin").giroZ = giroZ;
	
	
	if (mira) {
		temp.GetComponent("E_LookPlayer").enabled = true;
	}
}



function DontShoot() {
	Destroy(gameObject);
}