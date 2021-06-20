private var number : double = 0;
private var intervalo : double = 0.2;
private var pand : double = 0.0;

// colocar em ordem definida
// colocar number : int = Random.Range(0, 9);
// switch (number)
function Update() {
	if (Time.time > pand) {
		number = Random.Range(0, 9);
		pand = Time.time + intervalo;
		
		if (number <= 1) {
			transform.renderer.material.color = Color.black;
		} else if (number >1 && number <= 2) {
			transform.renderer.material.color = Color.blue;
		} else if (number >2 && number <= 3) {
			transform.renderer.material.color = Color.cyan;
		} else if (number >3 && number <= 4) {
			transform.renderer.material.color = Color.gray;
		} else if (number >4 && number <= 5) {
			transform.renderer.material.color = Color.green;
		} else if (number >5 && number <= 6) {
			transform.renderer.material.color = Color.magenta;
		} else if (number >6 && number <= 7) {
			transform.renderer.material.color = Color.yellow;
		} else if (number >7 && number <= 8) {
			transform.renderer.material.color = Color.white;
		}
	}
}