// aumenta ou reduz burner de acordo com a velocidade

function FixedUpdate() {
	particleEmitter.maxSize = 0.02 * Common.speed;
	particleEmitter.maxEnergy = 0.05 * Common.speed;
}