//#pragma strict

private var texto;
private var item;
private var posicaoInicial : Vector3;

function Start () {
	texto = Resources.Load("Texts/1000");
	coletados = Universal.aneisColetados;
	posicaoInicial = transform.position;
	
	var qual : String = "Itens/I_Points1";
	switch (Universal.aneisColetados) {
		case 1: qual = "Itens/I_Points2";
		break;
		
		case 2: qual = "Itens/I_Points3";
		break;
		
		case 3: qual = "Itens/I_Repair";
		break;
		
		case 4: qual = "Itens/I_Energy";
		break;
		
		case 5: qual = "Itens/I_EnergyG";
		break;
		
		case 6: qual = "Itens/I_PowerUp";
		break;
		
		case 7: qual = "Itens/I_Bomb";
		break;
		
		case 8: qual = "Itens/I_Life";
		break;
		
		case 9: qual = "Itens/I_All";
		break;
	}
	item = Resources.Load(qual);
}

function OnTriggerEnter ( other: Collider) {

	if (other.gameObject.tag == ("Player")) {
		Contabilizar();
	}
}

function Contabilizar() {
	Universal.aneisColetados++;
	var coletados = Universal.aneisColetados;
	
	Instantiate(item, posicaoInicial, Quaternion(0,0,0,0));
	
	// Instancia e muda texto do numero
	var item = Instantiate (texto, transform.parent.position, Quaternion(0,180,0,0));
	var tex : TextMesh = item.gameObject.GetComponent(TextMesh);
	tex.text = "" + coletados;
	
	// Muda texto da sombra
	tex = item.transform.Find("1000").GetComponent(TextMesh);
	//item.transform.renderer.material.color = Color.yellow;
	tex.text = "" + coletados;
	
	var x = transform.parent.Find("Corpo");
	var pan = x.GetComponent("Resizer");
	pan.escala *= 16;
	
	pan = x.GetComponent("Spin");
	pan.giroZ *= 16;
	
	Destroy(x.GetComponent(Collider));
	Destroy(this);
}