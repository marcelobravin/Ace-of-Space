Shader "Transparent/Unlit" {
Properties {
	_Color ("Main Color", Color) = (1,1,1,1)
	_MainTex ("Base (RGB) Trans (A)", 2D) = "white" {}
}

Category {
	ZWrite Off
	Alphatest Greater 0
	Tags {Queue=Transparent}
	Blend SrcAlpha OneMinusSrcAlpha 
	ColorMask RGB
	SubShader {
		Material {
			Diffuse [_Color]
		}
		Pass {
			Lighting Off
			SetTexture [_MainTex] {
				constantColor [_Color]
                Combine texture * constant, texture * constant 
			} 
		}
	} 
}
}