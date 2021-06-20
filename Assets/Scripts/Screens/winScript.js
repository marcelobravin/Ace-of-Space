var is1: boolean = false;
var is2: boolean = false;
var is3: boolean = false;
var is4: boolean = false;
var is5: boolean = false;
var isTotal: boolean = false;

var isScore: boolean = false;
var isLives: boolean = false;
var isRank: boolean = false;

function Start() {
	
	var valor : String = "";
	if (is1) {
		if (Universal.totalTime[1]) {
			valor = formataTempo(Universal.totalTime[1]);
		}
	}
	
	if (is2) {
		if (Universal.totalTime[2]) {
			valor = formataTempo(Universal.totalTime[2]);
		}
	}
	
	if (is3) {
		if (Universal.totalTime[3]) {
			valor = formataTempo(Universal.totalTime[3]);
		}
	}
	
	if (is4) {
		if (Universal.totalTime[4]) {
			valor = formataTempo(Universal.totalTime[4]);
		}
	}
	
	if (is5) {
		if (Universal.totalTime[5]) {
			valor = formataTempo(Universal.totalTime[5]);
		}
	}
	
	if (isTotal) {
		Universal.totalTime[0] = 0;
		
		for (i = 1; i <= 5; i++) {
			if (Universal.totalTime[i]) {
				Universal.totalTime[0] += Universal.totalTime[i];
			}			
		}
		
		// Finaliza		
		valor = formataTempo(Universal.totalTime[0]);
	}
	
	if (isScore) {
		Common.score += Common.playerLives * 10000;
		valor += formataNumero(Common.score);		
	}
	
	if (isLives) {
		valor += Common.playerLives;
		valor += " x10.000 = ";
		valor += formataNumero(Common.playerLives * 10000);
	}
	
	if (isRank) {
		var stage = 0;
		if (is1) {
			stage = 1;
		}
		
		if (is2) {
			stage = 2;
		}
		
		if (is3) {
			stage = 3;
		}
		
		if (is4) {
			stage = 4;
		}
		
		if (is5) {
			stage = 5;
		}
		
		if (isTotal) {
			var pontos = 0;
			var validos = 0;
			stage = 0;
			print (Universal.rankings.length);
			for (i = 1; i <= 5; i++) {
				if (Universal.rankings[i]){
					validos++;
					switch (Universal.rankings[i]) {
						
						case "S" :
							pontos += 6;
						break;
						case "A" :
							pontos += 5;
						break;
						case "B" :
							pontos += 4;
						break;
						case "C" :
							pontos += 3;
						break;
						case "D" :
							pontos += 2;
						break;
						case "E" :
							pontos += 1;
						break;
						case "F" :
							pontos += 0;
						break;
					}
				}
			}
			
			if (validos > 0) {
				pontos /= validos;
			}
			print("total rank:" +pontos);
			
			if (pontos >= 5.5) {
				ranking = "S";
			} else if (pontos >= 4.5) {
				ranking = "A";
			} else if (pontos >= 3.5) {
				ranking = "B";
			} else if (pontos >= 2.5) {
				ranking = "C";
			} else if (pontos >= 1.5) {
				ranking = "D";
			} else if (pontos >= 0.5) {
				ranking = "E";
			} else {
				ranking = "F";
			}
			
			Universal.rankings[0] = ranking;
		}
		
		if (Universal.rankings[stage]) {
			valor = "";
			valor += Universal.rankings[stage];
		}
	}
	
	// Exibe texto
	GetComponent(TextMesh).text = valor;
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

function formataTempo(numero) {
	var tempo : String = "";
	
	if (numero) {
		numero = Mathf.RoundToInt(numero);
		
		//Minutos
		tempo += (numero / 60);
		tempo += ":";
		
		//Segundos
		if ((numero % 60) < 10) {
			tempo += "0";
		}
		tempo += (numero % 60);
	} else {
		tempo += 0;
	}
	
	return tempo;
}

//private var iniciado : boolean = false;
function Update() {
	
	//if (!iniciado) {		
		if (Input.GetButtonDown("Fire1")) {
			//iniciado = true;
			Iniciar();
		}
	//}
}

function Iniciar() {
	//var som = Resources.Load("Audio/SE/Effects/se_start-continue");
	//audio.PlayOneShot(som);
	//yield WaitForSeconds(som.length);
	Application.LoadLevel("Opening");
}