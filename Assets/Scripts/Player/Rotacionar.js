//script para virar nave

private var angulo : double = 0.0;
private var rotacaoMax : double = 4.0;

function Update () {

	if (Universal.stage == 1) {
		if (Input.GetAxis("Vertical") > 0.01 && angulo < rotacaoMax) {
			Rotacionar(1);
		} else if (Input.GetAxis("Vertical") < -0.01  && angulo >= -rotacaoMax) {
			Rotacionar(0);
		} else {
			if (angulo > 0.1) {
				Rotacionar(0);	
			} else if (angulo < -0.1) {
				Rotacionar(1);
			}
		}
	}
	
	if (Universal.stage == 3) {
		if (Input.GetAxis("Vertical") < -0.01 && angulo < rotacaoMax) {
			Rotacionar(1);
		} else if (Input.GetAxis("Vertical") > 0.01  && angulo >= -rotacaoMax) {
			Rotacionar(0);
		} else {
			if (angulo > 0.1) {
				Rotacionar(0);	
			} else if (angulo < -0.1) {
				Rotacionar(1);
			}
		}
	}
	
	if (Universal.stage == 2) {
		if (Input.GetAxis("Horizontal") < -0.01 && angulo < rotacaoMax) {
			Rotacionar(1);
		} else if (Input.GetAxis("Horizontal") > 0.01  && angulo >= -rotacaoMax) {
			Rotacionar(0);
		} else {
			if (angulo < -0.1) {
				Rotacionar(1);	
			} else if (angulo > 0.1) {
				Rotacionar(0);
			}
		}
	}
	
	if (Universal.stage == 4) {
		if (Input.GetAxis("Horizontal") > 0.01 && angulo < rotacaoMax) {
			Rotacionar(1);
		} else if (Input.GetAxis("Horizontal") < -0.01  && angulo >= -rotacaoMax) {
			Rotacionar(0);
		} else {
			if (angulo < -0.1) {
				Rotacionar(1);	
			} else if (angulo > 0.1) {
				Rotacionar(0);
			}
		}
	}
	
	if (Universal.stage == 5) {
		if (Input.GetAxis("Horizontal") < -0.01 && angulo < rotacaoMax) {
			Rotacionar(1);
		} else if (Input.GetAxis("Horizontal") > 0.01  && angulo >= -rotacaoMax) {
			Rotacionar(0);
		} else {
			if (angulo < -0.1) {
				Rotacionar(1);	
			} else if (angulo > 0.1) {
				Rotacionar(0);
			}
		}
	}
}

function Rotacionar(num) {

	if (!Universal.paused) {
		// if (gameObject.GetComponent("Common").confuse)
		if (num == 0) {
			angulo -= 0.1;
			transform.localRotation.z += 0.01;
		}
		
		if (num == 1) {
			angulo += 0.1;
			transform.localRotation.z -= 0.01;
		}
	}
}