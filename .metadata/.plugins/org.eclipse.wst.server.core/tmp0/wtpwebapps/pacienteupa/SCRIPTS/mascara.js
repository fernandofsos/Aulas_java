/**
 * campo -- input que receber� o foco tamanhoMaximo -- Numero Maximo de
 * Caracteres do campo indice -- tabindex do proximo campo.
 */

function mascaraHora(hora){ 
	var tmp = ''; 
	tmp = tmp + hora.value; 
	if (tmp.length == 2){ 
		tmp = tmp + ':'; 
		hora.value = tmp; 
	} 
	if (tmp.length == 5){ 
		if ( ! verificarHoraDigitada(tmp) ) {
			alert("Hora informada é inválida");
			hora.focus();
		} 
	} 
	if (hora.value.length > 5){
		hora.value = hora.substring(0,4); 
	}
} 

function limitarTamanhoCampo(campo,tam) {
    if (campo.value.length > tam) {
	    campo.value = campo.value.substr(0,tam);
    }
}
          
function verificarHoraDigitada(hora){ 
	var hrs = hora.substring(0,2); 
	var min = hora.substring(3,5);
	var isValida = true; 
	
	if ((hrs < 0 ) || (hrs > 23) || ( min < 0) ||( min > 59)){ 
		isValida = false; 
	} 
               
	if (hora == "") { 
		isValida = false; 
	} 
	
    return isValida;	
} 

function validarHora(hora){ 
	var val = hora.value;
	var hrs = val.substring(0,2); 
	var min = val.substring(3,5);
	
	if (!isNaN(hrs) && !isNaN(min) && val.length == 5) {
		if ((hrs < 0 ) || (hrs > 23) || ( min < 0) ||( min > 59)){ 
				alert("Hora informada é inválida");
				hora.value = "";
				hora.focus();
		} 
	}
} 

//Formatar Campo Monetario Com 3 Casas Decimais
function currencyFormat(fld, milSep, decSep, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13)
		return true; // Entra
	key = String.fromCharCode(whichCode); // Comece o valor chave do codigo chave
	if (strCheck.indexOf(key) == -1)
		return false; // Chave inv?lida
	len = fld.value.length;
	for (i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep))
			break;
	aux = '';
	for (; i < len; i++)
		if (strCheck.indexOf(fld.value.charAt(i)) != -1)
			aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0)
		fld.value = '';
	if (len == 1)
		fld.value = '0' + decSep + '0' + aux;
	if (len == 2)
		fld.value = '0' + decSep + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
		fld.value += decSep + aux.substr(len - 2, len);
	}
	return false;
} 


function saltaCampo(campo, tamanhoMaximo, indice) {
	var vr = campo.value;
	var tam = vr.length;
	var elements = document.forms[0].elements;
	if (tam >= tamanhoMaximo && typeof (elements[indice]) != 'undefined') {
		for (i = 0; i < elements.length; i++) {
			if (elements[i].tabIndex == indice) {
				alert(elements[i])
				elements[i].focus();
			}
		}
	}

}


//Formata o campo valor
function formataValorReal(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 2) {
		campo.value = vr;
	}
	if ((tam > 2) && (tam <= 5)) {
		campo.value = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 6) && (tam <= 8)) {
		campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + ','
				+ vr.substr(tam - 2, tam);
	}
	if ((tam >= 9) && (tam <= 11)) {
		campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.'
				+ vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 12) && (tam <= 14)) {
		campo.value = vr.substr(0, tam - 11) + '.' + vr.substr(tam - 11, 3) + '.'
				+ vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ','
				+ vr.substr(tam - 2, tam);
	}
	if ((tam >= 15) && (tam <= 17)) {
		campo.value = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3) + '.'
				+ vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.'
				+ vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 18) && (tam <= 20)) {
		campo.value = vr.substr(0, tam - 17) + '.' + vr.substr(tam - 17, 3) + '.'
				+ vr.substr(tam - 14, 3) + '.' + vr.substr(tam - 11, 3) + '.'
				+ vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ','
				+ vr.substr(tam - 2, tam);
	}

}

// Formata o campo valor
function formataValor(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 2) {
		campo.value = vr;
	}
	if ((tam > 2) && (tam <= 5)) {
		campo.value = vr.substr(0, tam - 2) + '.' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 6) && (tam <= 8)) {
		campo.value = vr.substr(0, tam - 5) + '' + vr.substr(tam - 5, 3) + '.'
				+ vr.substr(tam - 2, tam);
	}
	if ((tam >= 9) && (tam <= 11)) {
		campo.value = vr.substr(0, tam - 8) + '' + vr.substr(tam - 8, 3) + ''
				+ vr.substr(tam - 5, 3) + '.' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 12) && (tam <= 14)) {
		campo.value = vr.substr(0, tam - 11) + '' + vr.substr(tam - 11, 3) + ''
				+ vr.substr(tam - 8, 3) + '' + vr.substr(tam - 5, 3) + '.'
				+ vr.substr(tam - 2, tam);
	}
	if ((tam >= 15) && (tam <= 17)) {
		campo.value = vr.substr(0, tam - 14) + '' + vr.substr(tam - 14, 3) + ''
				+ vr.substr(tam - 11, 3) + '' + vr.substr(tam - 8, 3) + ''
				+ vr.substr(tam - 5, 3) + '.' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 18) && (tam <= 20)) {
		campo.value = vr.substr(0, tam - 17) + '' + vr.substr(tam - 17, 3) + ''
				+ vr.substr(tam - 14, 3) + '' + vr.substr(tam - 11, 3) + ''
				+ vr.substr(tam - 8, 3) + '' + vr.substr(tam - 5, 3) + '.'
				+ vr.substr(tam - 2, tam);
	}

}

function formataValorMoeda(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 3) {
		campo.value = vr;
	}
	if ((tam > 2) && (tam <= 6)) {
		campo.value = vr.substr(0, tam - 3) + '.' + vr.substr(tam - 3, tam);
	}
	if ((tam >= 7) && (tam <= 8)) {
		campo.value = vr.substr(0, tam - 6) + '' + vr.substr(tam - 6, 3) + '.'
				+ vr.substr(tam - 3, tam);
	}
	if ((tam >= 9)) {
		campo.value = vr.substr(0, tam - 6) + '' + vr.substr(tam - 6, 3) + '.'
				+ vr.substr(tam - 6, 3);
	}
}

function formataValorMoeda4(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 4) {
		campo.value = vr;
	}
	if ((tam > 4) && (tam <= 8)) {
		campo.value = vr.substr(0, tam - 4) + '.' + vr.substr(tam - 4, tam);
	}
	if ((tam >= 9) && (tam <= 13)) {
		campo.value = vr.substr(0, tam - 8) + '' 
		+ vr.substr(tam - 8, 5) + '.' 
		+ vr.substr(tam - 4, tam);
	}
	if ((tam >= 14) && (tam <= 18)) {
		campo.value = vr.substr(0, tam - 12) + '' 
		+ vr.substr(tam - 12, 5)  + '' 
		+ vr.substr(tam - 8, 5)  + '.' 
		+ vr.substr(tam - 4, tam);
	}
	if ((tam >= 19) && (tam <= 23)) {
		campo.value = vr.substr(0, tam - 16) + '' 
		+ vr.substr(tam - 16, 5)  + '' 
		+ vr.substr(tam - 12, 5)  + '' 
		+ vr.substr(tam - 8, 5)  + '.' 
		+ vr.substr(tam - 4, tam);
	}
	if ((tam >= 24) && (tam <= 28)) {
		campo.value = vr.substr(0, tam - 23) + '' 
		+ vr.substr(tam - 20, 5) + ''
		+ vr.substr(tam - 16, 5) + '' 
		+ vr.substr(tam - 12, 5) + ''
		+ vr.substr(tam - 8, 5)  + '.' 
		+ vr.substr(tam - 4, tam);
	}
	if ((tam >= 30) && (tam <= 34)) {
		campo.value = vr.substr(0, tam - 29) + '' 
		+ vr.substr(tam - 28, 5) + ''
		+ vr.substr(tam - 24, 5) + ''
		+ vr.substr(tam - 20, 5) + '' 
		+ vr.substr(tam - 16, 5) + ''
		+ vr.substr(tam - 12, 5) + '' 
		+ vr.substr(tam - 8, 5)  + '.'
		+ vr.substr(tam - 4, tam);
	}
}


function somenteNumero(campo) {
	var digits = "0123456789";
	var campo_temp;
	for ( var i = 0; i < campo.value.length; i++) {
		campo_temp = campo.value.substring(i, i + 1);
		if (digits.indexOf(campo_temp) == -1) {
			campo.value = campo.value.substring(0, i);
		}
	}
}

function somenteLetras(campo) {
	var digits = "abcdefghijlmnopqrstuvxzwy";
	var campo_temp;
	for ( var i = 0; i < campo.value.length; i++) {
		campo_temp = campo.value.substring(i, i + 1);
		if (digits.indexOf(campo_temp) == -1) {
			campo.value = campo.value.substring(0, i);
		}
	}
}

function filtraCampo(campo) {
	var s = "";
	var cp = "";
	vr = campo.value;
	tam = vr.length;
	for (i = 0; i < tam; i++) {
		if (vr.substring(i, i + 1) != "/" && vr.substring(i, i + 1) != "-"
				&& vr.substring(i, i + 1) != "."
				&& vr.substring(i, i + 1) != ","
				&& vr.substring(i, i + 1) != "("
				&& vr.substring(i, i + 1) != ")") {
			s = s + vr.substring(i, i + 1);
		}
	}
	campo.value = s;
	return cp = campo.value
}

// Formata data no padrao DDMMAAAA
function formataData(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam > 2 && tam < 5)
		campo.value = vr.substr(0, tam - 2) + '/' + vr.substr(tam - 2, tam);
	if (tam >= 5 && tam <= 10)
		campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/'
				+ vr.substr(4, 4);
}

// Formata hora no padrao HH:MM
function formataHora(campo, teclapres) {
	var tecla = teclapres.keyCode;
	campo.value = filtraCampo(campo);
	vr = campo.value;
	vr = vr.replace(".", "");
	vr = vr.replace(":", "");
	vr = vr.replace(":", "");
	tam = vr.length + 1;

	if (tecla != 9 && tecla != 8) {
		if (tam > 2 && tam < 5)
			campo.value = vr.substr(0, tam - 2) + ':' + vr.substr(tam - 2, tam);
	}
}

// Formata o campo CEP
function formataCEP(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;
    
	if (tam > 9) {
    	campo.value =  vr.substr(0, 8);
    } else {	 
      if (tam <= 5)
		 campo.value = vr;
	  if (tam > 5)
		  campo.value = vr.substr(0, tam - 3) + '-' + vr.substr(tam - 3, tam);
    }  
}

// Formata o campo CGC
function formataCGC(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 2) {
		campo.value = vr;
	}
	if ((tam > 2) && (tam <= 6)) {
		campo.value = vr.substr(0, tam - 2) + '-' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 7) && (tam <= 9)) {
		campo.value = vr.substr(0, tam - 6) + '/' + vr.substr(tam - 6, 4) + '-'
				+ vr.substr(tam - 2, tam);
	}
	if ((tam >= 10) && (tam <= 12)) {
		campo.value = vr.substr(0, tam - 9) + '.' + vr.substr(tam - 9, 3) + '/'
				+ vr.substr(tam - 6, 4) + '-' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 13) && (tam <= 14)) {
		campo.value = vr.substr(0, tam - 12) + '.' + vr.substr(tam - 12, 3)
				+ '.' + vr.substr(tam - 9, 3) + '/' + vr.substr(tam - 6, 4)
				+ '-' + vr.substr(tam - 2, tam);
	}
	if ((tam >= 15) && (tam <= 17)) {
		campo.value = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3)
				+ '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3)
				+ '.' + vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
	}
}

// Formata o campo CPF
function formataCPF(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;
	if (tam <= 2) {
		campo.value = vr;
	}
	if (tam > 2 && tam <= 5) {
		campo.value = vr.substr(0, tam - 2) + '-' + vr.substr(tam - 2, tam);
	}
	if (tam >= 6 && tam <= 8) {
		campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + '-'
				+ vr.substr(tam - 2, tam);
	}
	if (tam >= 9 && tam <= 11) {
		campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.'
				+ vr.substr(tam - 5, 3) + '-' + vr.substr(tam - 2, tam);
	}

}

function formataPercentual(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	if (tam <= 3) {
		campo.value = vr;
	}
	if ((tam > 3) && (tam <= 6)) {
		campo.value = vr.substr(0, tam - 3) + ',' + vr.substr(tam - 3, tam);
	}	
}

function formataTelefone(campo) {
	campo.value = filtraCampo(campo);
	vr = campo.value;
	tam = vr.length;

	/*
	 * CODIGO ORIGINAL if ( tam <= 4 ){ campo.value = vr; }
	 * 
	 * if ( tam > 4) { campo.value = vr.substr(0, tam-4 ) + '-' +
	 * vr.substr(tam-4, tam); }
	 */

	if (tam > 1) {
		if (tam == 2) {
			campo.value = "(" + vr.substr(0, 2) + ')';
		} else if (tam <= 6) {
			campo.value = "(" + vr.substr(0, 2) + ')' + vr.substr(2, tam);
		} else {
			campo.value = "(" + vr.substr(0, 2) + ')' + vr.substr(2, 4) + "-"
					+ +vr.substr(6, tam);
		}
	}
}

function formataNumero(campo) {
	var valor = campo.value;
	campo.value = valor.replace(/[^0123456789]/g, '');

}

function formataLetra(campo) {
	var valor = campo.value;
	campo.value = valor.replace(/[0123456789]/g, '');
}

function formataMascara(format, field) {
	var result = "";
	var maskIdx = format.length - 1;
	var error = false;
	var valor = field.value;
	var posFinal = false;
	if (field.setSelectionRange) {
		if (field.selectionStart == valor.length)
			posFinal = true;
	}
	valor = valor.replace(/[^0123456789Xx]/g, '')
	for ( var valIdx = valor.length - 1; valIdx >= 0 && maskIdx >= 0; --maskIdx) {
		var chr = valor.charAt(valIdx);
		var chrMask = format.charAt(maskIdx);
		switch (chrMask) {
		case '#':
			if (!(/\d/.test(chr)))
				error = true;
			result = chr + result;
			--valIdx;
			break;
		case '@':
			result = chr + result;
			--valIdx;
			break;
		default:
			result = chrMask + result;
		}
	}

	field.value = result;
	field.style.color = error ? 'red' : '';
	if (posFinal) {
		field.selectionStart = result.length;
		field.selectionEnd = result.length;
	}
	return result;
}

function verificarHoraDigitada2(hora){ 
	var hrs = hora.substring(0,2); 
	var min = hora.substring(3,5);
	var isValida = true; 

	if ((hrs < 0 ) || (hrs > 23) || ( min < 0) ||( min > 59)){ 
		isValida = false; 
	} 				

	if (hora == "") { 
		isValida = false; 
	} 
	
    return isValida;	
}

function tamanhoHora(hora, regraHoraDuracao){  
	if (hora.value.length > 0){
		var digits = "0123456789:";
		var campo_temp;
		for ( var i = 0; i < hora.value.length; i++) {
			campo_temp = hora.value.substring(i, i + 1);
			if (digits.indexOf(campo_temp) == -1) {
				alert("Hora informada incorreta.");
				hora.focus();
				return false;
			}
		}
		
		if (hora.value.length < 5){ 
			alert("Hora informada incorreta.");
			hora.focus();
			return false;
		}
		var cont = 0;
		
	    for(var j = 0; j < hora.value.length; j++){
	        if(hora.value.charAt(j) == ":"){
	            cont++; 
	        }
	    }
	    
	    if (cont > 1){
			hora.focus();
			return false;
		}
	    
		if (hora.value.length == 5){ 
			if ( ! verificarHoraDigitada2(hora.value) ) {
					alert("A Hora não pode ultrapassar 23:59!");							
					hora.value = '';
					hora.focus();
			}
		} 
	}
	return true;
}
