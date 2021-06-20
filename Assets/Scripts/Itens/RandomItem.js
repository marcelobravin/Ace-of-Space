var isP : boolean = false;
var isM : boolean = false;
var isG : boolean = false;

//item p : energy, point, red
//item m : power, point, red
//item g : life, bomb, point, red


var materials : Material[];
private var item;

function Start() {
	item = transform.parent.GetComponent("Itens");
	
	if (isP) {
		InvokeRepeating("NextItemP", 2, 1);
	} else if (isM) {
		InvokeRepeating("NextItemM", 1, 1);
	} else if (isG) {
		InvokeRepeating("NextItemG", 0.5, 1);
	} 
}


var i : int = 0;

function NextItemP() {
	ZerarItem();
	
	if (i < 3) {
		i++;
	} else {
		i = 0;
	}
	

	if (i == 0) {
		transform.renderer.material = materials[1];
		item.isEnergy1 = true;
	}
	
	if (i == 1) {
		transform.renderer.material = materials[3];
		item.isPoint1 = true;
	}
	
	if (i == 2) {
		transform.renderer.material = materials[5];
		item.isTrap1 = true;
	}
	
	if (i == 3) {
		transform.renderer.material = materials[6];
		item.isRepair = true;
	}
}





function NextItemM() {
	ZerarItem();
	
	if (i < 3) {
		i++;
	} else {
		i = 0;
	}
	
	if (i == 0) {
		transform.renderer.material = materials[4];
		item.isPower = true;
	}
	
	if (i == 1) {
		transform.renderer.material = materials[3];
		item.isPoint2 = true;
	}
	
	if (i == 2) {
		transform.renderer.material = materials[5];
		item.isTrap2 = true;
	}
	
	if (i == 3) {
		transform.renderer.material = materials[1];
		item.isEnergy2 = true;
	}
}


function NextItemG() {
	ZerarItem();
	
	if (i < 3) {
		i++;
	} else {
		i = 0;
	}
	
	if (i == 0) {
		transform.renderer.material = materials[0];
		item.isBomb = true;
	}
	
	if (i == 1) {
		transform.renderer.material = materials[2];
		item.isLife = true;
	}
	
	if (i == 2) {
		transform.renderer.material = materials[3];
		item.isPoint3 = true;
	}
	
	if (i == 3) {
		transform.renderer.material = materials[5];
		item.isTrap3 = true;
	}
}




function ZerarItem() {
	item.isBomb = false;
	item.isEnergy1 = false;
	item.isEnergy2 = false;
	item.isLife = false;
	item.isPoint1 = false;
	item.isPoint2 = false;
	item.isPoint3 = false;
	item.isPower = false;
	item.isTrap1 = false;
	item.isTrap2 = false;
	item.isTrap3 = false;
	item.isRepair = false;
}