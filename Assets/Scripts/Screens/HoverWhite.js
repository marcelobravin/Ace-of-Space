// hover off
function Start() {
	renderer.material.color = Color.gray;
}

// hover
function OnMouseEnter() {
	renderer.material.color = Color.white;
}

// hover off
function OnMouseExit() {
	renderer.material.color = Color.gray;
}