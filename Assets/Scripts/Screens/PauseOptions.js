// opcoes
var isRestart = false;
var isBack = false;
var isQuit = false;

private var opcao : int = 1;

function Update() {

	if (Input.GetButtonDown("Pause")) {
		Destroy(gameObject);
	}

	if (Input.GetKeyDown("up")) {
		opcao--;
	}
	
	if (Input.GetKeyDown("down")) {
		opcao++;
	}
	
	if (opcao > 4) {
		opcao = 1;
	} else if (opcao < 1) {
		opcao = 4;
	}
	
//	print(opcao);
	
	if (transform.Find("Cone")) {
		switch (opcao) {
			case 1:
				transform.Find("Cone").position.y = 0.6;
			break;
			
			case 2:
				transform.Find("Cone").position.y = 0.1;
			break;
			
			case 3:
				transform.Find("Cone").position.y = -0.4;
			break;
			
			case 4:
				transform.Find("Cone").position.y = -0.9;
			break;
		}
	}
	
	if (Input.GetButtonDown("Fire1")) {		
		switch(opcao) {			
			case 2:
				Application.LoadLevel("Fase" + (Universal.stage) + "-" + (Universal.substage));
			break;
			
			case 3:				
				Application.LoadLevel("Opening");
			break;
			
			case 4:
				var equipMenu = Resources.Load("Texts/EquipMenu");
				
				Instantiate(equipMenu);
				Destroy(gameObject);
			break;
		}
		
		if (opcao != 4) {
			//GameObject.Find("Main Camera").GetComponent("Stages").Pausar();
			Universal.paused = false;
			//audio.PlayOneShot(menuClose);
			
			Time.timeScale = 1;
			AudioListener.volume = 1;
			Destroy(gameObject.parent);
			Destroy(gameObject);
		}
	}
}
/*
// onclick
function OnMouseUp () {
	
	// reinicia fase
	if (isRestart) {
		Application.LoadLevel("Fase" + (Universal.stage) + "-" + (Universal.substage));
	}
	
	// volta pra tela de titulo
	if (isBack) {
		Application.LoadLevel("Opening");
	}
	
	// fecha aplicativo
	if (isQuit) {
		Application.Quit();
	}
	
	GameObject.Find("Main Camera").GetComponent("Stages").Pausar();
}
*/