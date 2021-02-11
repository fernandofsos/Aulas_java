/**
 *  @author Carlos Di�go
 *  @since 15/12/2011
 */




/**
 * Fun��o utilizada para deixar caracteres maiusculos
 * 
 * @param campo
 */

function upper(campo)
{
	var str = campo.value;
	campo.value = str.toUpperCase();
}


function soNumero(evt, campo)
{
	if (navigator.appCodeName == 'Mozilla' && (navigator.appName == 'Netscape' || navigator.appName == 'Opera'))
	{
		if (evt.which)
		{
			if ((evt.which < 48 || evt.which > 57) && evt.which != 8 && evt.which != 9)
			{
				if(navigator.appName == 'Opera') // Opera
				{
					if((evt.which == 86 || evt.which == 67) && evt.ctrlKey) // Ctrl + V ou Ctrl + C
					{
						return true;
					}
				}
				else // Firefox, Chrome, Safari
				{
					if((evt.which == 118 || evt.which == 99) && evt.ctrlKey) // Ctrl + V ou Ctrl + C
					{
						return true;
					}
				}	
				return false;
			}
		}
	}
	else // IE
	{
		if (evt.keyCode < 48 || evt.keyCode > 57)
		{
			return false;
		}
	}
	return true;
}

function formataData(evt, campo) 
{
	if (soNumero(evt, campo))
	{
		var unicode = (evt.which) ? evt.which : evt.keyCode;

		vr = campo.value;
		vr = vr.replace( ".", "" );
		vr = vr.replace( "-", "" );
		vr = vr.replace( "/", "" );
		vr = vr.replace( "/", "" );
		vr = vr.replace( "/", "" );
		tam = vr.length + 1;
		
		if (unicode >= 48 && unicode <= 57)
		{
			if (tam > 2 && tam < 5)
				campo.value = vr.substr(0, 2) + '/' + vr.substr(2, tam);
			if (tam >= 5 && tam <= 10)
				campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4); 
		}
		return true;
	}
	return false;
}

function avisosPesquisa(tipo) {
     if (tipo==1) {
	     alert("Digite pelo menos 3 letras ou numeros.");
     } else if (tipo==2) {
    	 alert("Não há pacientes cadastrados que atendam a esta pesquisa.");
     }else{
    	 alert("Não há pacientes cadastrados que atendam a esta pesquisa." + tipo);
     }
 }
 
 
 function mensgemImportacaoArquivo(valor){
 	 if (valor==1) {
 	  	alert("Operação realizada com sucesso!");
 	 } else if(valor==2){
 	  	alert("Arquivo deletado com sucesso!");
     } else if(valor==3)  { 
        alert("Nome do arquivo Errado!");
     }else {
    	alert("A Operação não pode ser realizada, contate NTI."); 
     }
 
 }
 
 
 function btnRemoverArquivoImportacao(){
 	document.getElementById("formulario:btnDeletaArquivoTmp").click();
}

function nomarlizeTelefone(evt, campo)
{
	if (navigator.appCodeName == 'Mozilla' && (navigator.appName == 'Netscape' || navigator.appName == 'Opera'))
	{
		if (evt.which)
		{
			if ((evt.which < 48 || evt.which > 57) && evt.which != 40 && evt.which != 41 && evt.which != 45 && evt.which != 8 && evt.which != 9)
			{
				if (navigator.appName == 'Opera')
				{
					if ((evt.which == 86 || evt.which == 67) && evt.ctrlKey) // Ctrl + V ou Ctrl + C
					{
						return true;
					}
				}
				else // Firefox, Chrome, Safari
				{
					if ((evt.which == 118 || evt.which == 99) && evt.ctrlKey) // Ctrl + V ou Ctrl + C
					{
						return true;
					}
				}	
	
				return false;
			}
		}
	}
	else // IE
	{
		if ((evt.keyCode < 48 || evt.keyCode > 57) && evt.which != 40 && evt.which != 41 && evt.which != 45)
		{
			return false;
		}
	}
	
	return true;
}

