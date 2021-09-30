window.onload = inicio;

function inicio(){

	in_usuario = document.getElementById("in_usuario");
	btn_enviar_registro.addEventListener("click", validar_nombreUsuario);
	in_contrasena = document.getElementById("in_contrasena");
	btn_enviar_registro.addEventListener("click", validar_contrasena);
}

function validar_nombreUsuario(string){
	let capara = (in_usuario.value);
	let regex = /^[0-9a-zA-Z]+$/.test(capara);
	//alert("prueba del regex usuario "+ regex);
	if(capara.length > 3 && capara.length <=9){
		if(regex == true){
			return true; 
		}else{
			return false;
			//alert("casi pirovo");
		}    
	}else{
		return false;
		//alert("sapo hp se equivoco en el usuario");
	}
	//console.log(in_usuario.value);
}

function validar_contrasena(string){
	let capasena = (in_contrasena.value);
	let regex = /^[0-9a-zA-Z]+$/.test(capasena);
	//alert("prueba del regex contrasena "+regex);
	if(capasena.length >= 6){
		if(regex == true){
			return true;
			//alert("casi que no gonorrea")
		}else{
			return false;
			//alert("usted tiene clave: " + regex);
		}    
    //alert("usted es: " + capara);
	}else{
		return false;
		//alert("sapo hp nop fue asi");
	}
}

module.exports.validar_nombreUsuario = validar_nombreUsuario;
module.exports.validar_contrasena = validar_contrasena;