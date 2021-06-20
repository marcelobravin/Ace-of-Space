#pragma strict

private var stage : int = 1;

function Start () {
	stage = parseInt(transform.parent.name);
	var txt = "";
	txt += Universal.rankings[stage];
	transform.GetComponent(TextMesh).text = txt;
}