private var custo : int = 0;

var isBomb : boolean = false;
var isEnergy : boolean = false;
var isPontos : boolean = false;
var isVidas : boolean = false;
var isCombo : boolean = false;
var isComboMultiplier : boolean = false;

var mat : Material[];

function Start() {
	if (isEnergy) {
		if (Universal.selected[2] == "Shotgun") {
			custo = 20;
		}
		
		if (Universal.selected[2] == "Cannon") {
			custo = 40;
		}
		
		if (Universal.selected[2] == "Wave") {
			custo = 40;
		}
		
		if (Universal.selected[2] == "Mine") {
			custo = 20;
		}
		
		if (Universal.selected[2] == "Web Shot") {
			custo = 10;
		}
		
		if (Universal.selected[2] == "Missile") {
			custo = 15;
		}
		
		if (Universal.selected[2] == "Homing Missile") {
			custo = 20;
		}
		
		
		if (Universal.selected[2] == "Missile Salvo") {
			custo = 25;
		}
	}
}

private var texto : String = "";
function Update () {
	if (isBomb) {
		texto = "";
		
		if (WeaponsBomb.bombs <= 5) {
			for (var i = 0; i < WeaponsBomb.bombs; i++) {
				texto += "B ";
			}
		} else {
			texto += "B x" + WeaponsBomb.bombs;
		}
	}
	
	if (isEnergy) {
		texto = "";
		texto += Mathf.RoundToInt(WeaponsSecondary.energyMeter);
		var barra = transform.Find("Cube");
		
		// pra não afetar shadow
		if (barra) {
		//cubeBKP
			barra.localScale = Vector3(WeaponsSecondary.energyMeter /175, 0.02, 0.04);
			
			// barra linerenderer
			//barra.localScale = Vector3(0, 0, WeaponsSecondary.energyMeter /350);
			
			// Colore barra de energia --- se = 200 dourada
			if (WeaponsSecondary.energyMeter >= 99) {
				barra.renderer.material = mat[2];
			} else if (WeaponsSecondary.energyMeter >= custo) {
				barra.renderer.material = mat[0];
			} else {
				barra.renderer.material = mat[1];
			}
		}		
	}
	
	if (isPontos) {
		texto = "";
		texto += formataNumero(Common.score);
	}
	
	if (isVidas) {
		texto = "";
		texto += Common.playerLives;
	}
	
	if (isCombo) {
		texto = "";
		if (Common.combo > 0) {
			texto += Common.combo;
		}
		
		
		// invokeRepeat (barControl, 0.1,0.1);
		// COMBO BARS
		var tamanho : double = Common.combo;
		
		// colocar no function Start() {}
		barra = transform.Find("Cube");
		barra2 = transform.Find("Cube2");
		barra3 = transform.Find("Cube3");
		barra4 = transform.Find("Cube4");
		barra5 = transform.Find("Cube5");
		barra6 = transform.Find("Cube6");
		barra7 = transform.Find("Cube7");
		barra8 = transform.Find("Cube8");
		barra9 = transform.Find("Cube9");
		
		
		// não afeta shadow
		if (barra) {
			if (tamanho == 0) {
							
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
			} else if (tamanho <= 1000) {
				// olhar common
				// colocar tudo numa repetição, vetor de barras
				// tamanho - valor
				
				tamanho = tamanho / 1000;
				barra.renderer.enabled = true;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra.localScale = Vector3(tamanho, 0.02, 0.04);
				//barra.localScale = Vector3(0, 0, tamanho);
			} else if (tamanho > 1000 && tamanho <= 2000) {
						
				tamanho = tamanho / 1000;
				barra.renderer.enabled = true;
				barra2.renderer.enabled = true;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra.localScale = Vector3(1, 0.02, 0.04);
				barra2.localScale = Vector3(tamanho - 1, 0.02, 0.04);
				
				
			} else if (tamanho > 2000 && tamanho <= 3000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = true;
				barra3.renderer.enabled = true;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra2.localScale = Vector3(1, 0.02, 0.04);
				barra3.localScale = Vector3(tamanho - 2, 0.02, 0.04);
				
				
			} else if (tamanho > 3000 && tamanho <= 4000) {			
				tamanho = tamanho / 1000;
				
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = true;
				barra4.renderer.enabled = true;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra3.localScale = Vector3(1, 0.02, 0.04);
				barra4.localScale = Vector3(tamanho - 3, 0.02, 0.04);
				
				
			} else if (tamanho > 4000 && tamanho <= 5000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = true;
				barra5.renderer.enabled = true;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra4.localScale = Vector3(1, 0.02, 0.04);
				barra5.localScale = Vector3(tamanho - 4, 0.02, 0.04);
				
				
			} else if (tamanho > 5000 && tamanho <= 6000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = true;
				barra6.renderer.enabled = true;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra5.localScale = Vector3(1, 0.02, 0.04);
				barra6.localScale = Vector3(tamanho - 5, 0.02, 0.04);
				
				
			} else if (tamanho > 6000 && tamanho <= 7000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = true;
				barra7.renderer.enabled = true;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = false;
				
				barra6.localScale = Vector3(1, 0.02, 0.04);
				barra7.localScale = Vector3(tamanho - 6, 0.02, 0.04);
				
				
			} else if (tamanho > 7000 && tamanho <= 8000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = true;
				barra8.renderer.enabled = true;
				barra9.renderer.enabled = false;
				
				barra7.localScale = Vector3(1, 0.02, 0.04);
				barra8.localScale = Vector3(tamanho - 7, 0.02, 0.04);
			} else if (tamanho > 8000 && tamanho <= 9000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = true;
				barra9.renderer.enabled = true;
				
				barra8.localScale = Vector3(1, 0.02, 0.04);
				barra9.localScale = Vector3(tamanho - 8, 0.02, 0.04);
			} else if (tamanho > 9000) {			
				tamanho = tamanho / 1000;
				barra.renderer.enabled = false;
				barra2.renderer.enabled = false;
				barra3.renderer.enabled = false;
				barra4.renderer.enabled = false;
				barra5.renderer.enabled = false;
				barra6.renderer.enabled = false;
				barra7.renderer.enabled = false;
				barra8.renderer.enabled = false;
				barra9.renderer.enabled = true;
				
				
				barra9.localScale = Vector3(1, 0.02, 0.04);
			}
		}
	}
	
	
	if (isComboMultiplier) {
		
		
		// Deixar calculo do comboMultiplier no player e só pegar resultado
		var comboMultiplier = 0;
		var num : double = (Common.combo / 1000);
		comboMultiplier = Mathf.RoundToInt(num);
		
		// Se combo for maior q 0
		if (num > 0) {
			// Se combo ultrapassar 10 para de contar
			if (num >9) {
				comboMultiplier = 9;
			}
			texto = "x" + (comboMultiplier +1);
		} else {
			texto = "";
		}
	}
	
	// Atualiza texto
	GetComponent(TextMesh).text = texto;
}

function formataNumero(foo : int) {
	var pan : String = "";
	pan += foo;	
	
	var numeroFormat : String = "";
	
	// Itera pelos caracteres em ordem decrescente
	for (i = pan.length; i > 0; i--) {
		
		// Insere ponto a cada tres casas que não sejam a última
		if (i % 3 == 0 && i != pan.length) {
			numeroFormat += ".";
		}
		// Insere caracteres na ordem crescente
		numeroFormat += pan.Substring(pan.length - i, 1);
	}
	
	return numeroFormat;
}