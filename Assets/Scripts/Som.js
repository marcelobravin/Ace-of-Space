#pragma strict

function Start () {
	transform.DetachChildren();
	Destroy(gameObject, audio.clip.length);
}