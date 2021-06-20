function Update() {
	if (Input.GetButtonDown("Fire1") || Input.GetButtonDown("Fire2")) {
		Instantiate(equipMenu);
		Destroy(gameObject);
	}
	
	if (Input.GetButtonDown("Pause")) {
		Destroy(gameObject);
	}
}
private var equipMenu;

function Start() {
	equipMenu = Resources.Load("Texts/PauseMenu");
	
	transform.Find("0").GetComponent(TextMesh).text = "Armor: " + Universal.selected[0];
	transform.Find("1").GetComponent(TextMesh).text = "Primary: " + Universal.selected[1];
	transform.Find("2").GetComponent(TextMesh).text = "Secondary: " + Universal.selected[2];
	transform.Find("3").GetComponent(TextMesh).text = "Skill: " + Universal.selected[3];
	transform.Find("4").GetComponent(TextMesh).text = "Bomb: " + Universal.selected[4];
	
	//var pow = Find("Player1").Find("Capsule")GetComponent("Common").pow;
	var pow = WeaponsPrimary.power;
	transform.Find("5").GetComponent(TextMesh).text = "Power: " + pow;
	
	// Player Common
	var status = GameObject.Find("Player1").GetComponent("Common");
	
	// Asas
	var mssg = "";
	
	if (status.WingL) {
		mssg = "Ok";
	} else {
		mssg = "Damaged";
	}
	
	transform.Find("6").GetComponent(TextMesh).text = "Wing Left: " + mssg;
	
	if (status.WingR) {
		mssg = "Ok";
	} else {
		mssg = "Damaged";
	}
	
	transform.Find("7").GetComponent(TextMesh).text = "Wing Right: " + mssg;
	
	// Status
	mssg = "";
	if (!status.slow && !status.haste && !status.trava && !status.travaArma && !status.confuse) {
		mssg += " Ok";
	} else {
		if (status.slow) {
			mssg += " Slow";
		}
		
		if (status.haste) {
			mssg += " Haste";
		}
		
		if (status.trava) {
			mssg += " Lock";
		}
		
		if (status.travaArma) {
			mssg += " Disarm";
		}
		
		if (status.confuse) {
			mssg += " Confuse";
		}
	}
	
	transform.Find("8").GetComponent(TextMesh).text = "Status:" + mssg;
}