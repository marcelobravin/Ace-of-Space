private var originalColor;

var isGray : boolean = false;
var isGreen : boolean = false;
var isMagenta : boolean = false;
var isYellow : boolean = false;
var isCyan : boolean = false;
var isRed: boolean = false;
var isBlue: boolean = false;
var isWhite: boolean = false;
var isBlack: boolean = false;

function Start () {
	//shipbody.transform.renderer.material.color = Color(.1, .9, .9, 1);
		
	if (isGray) {
		originalColor = Color.gray;
	}
	
	if (isGreen) {
		originalColor = Color.green;
	}
	
	if (isMagenta) {
		originalColor = Color.magenta;
	}
	
	if (isYellow) {
		originalColor = Color.yellow;
	}
	
	if (isCyan) {
		originalColor = Color.cyan;
	}
	
	if (isRed) {
		originalColor = Color.red;
	}
	
	if (isBlue) {
		originalColor = Color.blue;
	}
	
	if (isWhite) {
		originalColor = Color.white;
	}
	
	if (isBlack) {
		originalColor = Color.black;
	}
	
	transform.renderer.material.color = originalColor;
	
	if (GetComponent("E_Basic")) {
		GetComponent("E_Basic").originalColor = originalColor;
	}
}