
function Start () {
	if(Universal.stage == 1 || Universal.stage == 3) {
		transform.position.x = 0 - transform.position.x;
	} else {
		transform.position.y = 0 - transform.position.y;
	}
}