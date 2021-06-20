private var b1;
private var b2;

private var movido : double = 0;
var closingSpeed : double = 0.01;

function Start() {	
	b1 = transform.Find("Barrier1");
	b2 = transform.Find("Barrier2");
	
	if (Universal.stage == 3 || Universal.stage == 4) {
		closingSpeed = -closingSpeed ;
	}
	
	if (Universal.stage == 1 || Universal.stage == 3) {
		InvokeRepeating("Close", 3, 0.01);
	} else {
		InvokeRepeating("CloseHorizontal", 2, 0.01);
	}
}

function Close() {
	if (movido <= 4.0 && movido >= -4.0) {
		b1.transform.position.y -= closingSpeed;
		b2.transform.position.y += closingSpeed;
		movido += closingSpeed;
	}
}


function CloseHorizontal() {
	if (movido <= 4.0 && movido >= -4.0) {
		b1.transform.position.x -= closingSpeed;
		b2.transform.position.x += closingSpeed;
		movido += closingSpeed;
	}
}

function Open(open) {

	if (Universal.stage == 2 || Universal.stage == 4) {
		b1.transform.position.x += closingSpeed * open;
		b2.transform.position.x -= closingSpeed * open;
		movido -= closingSpeed * open;
	} else {
		b1.transform.position.y += closingSpeed * open;
		b2.transform.position.y -= closingSpeed * open;
		movido -= closingSpeed * open;
	}
}