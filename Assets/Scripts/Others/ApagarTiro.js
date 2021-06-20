function OnTriggerEnter ( other: Collider) {
	if (other.gameObject.tag == ("EnemyBullet")) {
		Destroy(other.gameObject);
	}
}