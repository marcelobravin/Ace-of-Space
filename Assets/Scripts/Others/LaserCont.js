var tamanhoMax : double = 10;

function Update () {
	
	if (transform.localScale.z < 0 - (tamanhoMax)) {
		Destroy(transform.GetComponent("Crescendo"));
		transform.GetComponent("E_Bullet").bulletSpeed = 3;
	}
}