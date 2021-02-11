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

function verificaTamanho(idForm, campo, tamMax, resposta)
{
	var strLen;
	strLen = 0;
	if(campo.value.length > 0)
	{
		strLen = strLen + campo.value.length;
	}
	if (strLen == 1)
   	{
	   	if(campo.value.substring(0,1) == " ")
		{
	       	campo.value = "";
			strLen = strLen - 1;
		}
   	}
	if (strLen > tamMax)
	{
		campo.value = campo.value.substring(0,tamMax);
		strLen = strLen - 1;
		return;
	}
	if(resposta != null)
	{	
		if(document.forms[idForm].elements[resposta] != null)
		{
			document.forms[idForm].elements[resposta].value = (tamMax - strLen);
		}
		else
		{
			document.getElementById(resposta).innerHTML = '(' + (tamMax - strLen) + ' caracteres restantes)';
		}
	}
}

function verificaTamanhoIgnoreQuebraLinha(idForm, campo, tamMax, resposta, isQuebraDupla) {
	var strLen;
	strLen = 0;
	var quebrasLinha = campo.value.split('\n').length - 1;
	if(campo.value.length > 0)
	{
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		if(isIE && isQuebraDupla) {
			strLen = strLen + campo.value.length - (quebrasLinha * 2);
		} else {
			strLen = strLen + campo.value.length - quebrasLinha;
		}	
	}
	if (strLen == 1)
   	{
	   	if(campo.value.substring(0,1) == " ")
		{
	       	campo.value = "";
			strLen = strLen - 1;
		}
   	}
	if (strLen > tamMax)
	{
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		if(isIE && isQuebraDupla) {
			campo.value = campo.value.substring(0,(tamMax + quebrasLinha * 2));
		} else {
			campo.value = campo.value.substring(0,(tamMax + quebrasLinha));
		}
		strLen = strLen - 1;
		return;
	}
	if(resposta != null)
	{	
		if(document.forms[idForm].elements[resposta] != null)
		{
			document.forms[idForm].elements[resposta].value = (tamMax - strLen);
		}
		else
		{
			document.getElementById(resposta).innerHTML = '(' + (tamMax - strLen) + ' caracteres restantes)';
		}
	}
}

function verificaData(dataReferencia) 
{
    var bissexto = 0;       
    var data = dataReferencia;        
    var tam = data.length;
    if (tam == 10)         
    {                
        var dia = data.substr(0,2);         
        var mes = data.substr(3,2);          
        var ano = data.substr(6,4);
        if ((ano > 1900) && (ano < 2100))          
       	{
           switch(mes)                     
           {                            
               case '01':                       
               case '03':                 
               case '05':              
               case '07':
               case '08':                        
               case '10':                        
               case '12':                   
               if  (dia <= 31)    
               {
                   return true;
               }
               break;                       
               case '04':                  
               case '06':           
               case '09':
               case '11':
               if  (dia <= 30) 
               { 
            	   return true;               
               } 
               break;    
               case '02':     
               /* Validando ano Bissexto / fevereiro / dia */    
               if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0))  
               {                    
               	   bissexto = 1;                  
               }          
               if ((bissexto == 1) && (dia <= 29))             
	               {                                      
               		return true;                                          
               }   
               if ((bissexto != 1) && (dia <= 28))
               {                     
              		return true;                             
               }                            
               break; 
           }          
        }   
    }
    return false;
}

function formataCPF(evt, campo) 
{
	if (soNumero(evt, campo))
	{
		var unicode = (evt.which) ? evt.which : evt.keyCode;

		vr = campo.value;
		vr = vr.replace( ".", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( ".", "" );
		vr = vr.replace( "-", "" );
		tam = vr.length;
		
		if (unicode >= 48 && unicode <= 57)
		{
			if (tam > 3 && tam < 7)
			{
				campo.value = vr.substr(0, 3) + '.' + vr.substr(3, tam);
			}
			else if (tam >= 7 && tam < 10)
			{
				campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3); 
			}
			else if (tam >= 10)
			{
				campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-' + vr.substr(9, 2);
			}
		}
		return true;
	}
	return false;
}


function mascara(o,f){   
    v_obj=o   
    v_fun=f   
    setTimeout("execmascara()",1)   
}   
  
function execmascara(){   
    v_obj.value=v_fun(v_obj.value)   
}   
  
function moeda(v){   
    v=v.replace(/\D/g,""); // permite digitar apenas numero   
    v=v.replace(/(\d{1})(\d{15})$/,"$1.$2") // coloca ponto antes dos ultimos digitos   
    v=v.replace(/(\d{1})(\d{11})$/,"$1.$2") // coloca ponto antes dos ultimos 11 digitos   
    v=v.replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 8 digitos   
    v=v.replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 5 digitos   
    v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos   
    return v;   
} 

function decimal(v){   
    v=v.replace(/\D/g,""); // permite digitar apenas numero  
    v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos   
    return v;   
} 

function validarData(campo) {
	if (campo != '') {
		if (campo.length != 10){
			return false;
		}
		
		var dia = parseInt(campo.substring(0,2), 10);
		var mes = parseInt(campo.substring(3,5), 10);
		var ano = parseInt(campo.substring(6,10), 10);
				
		if (mes > 12 || mes < 1) {
			return false;
		}
		if (dia > 31 || dia < 1) {
			return false;
		}
		if ((mes==4 || mes==6 || mes==9 || mes==11) && dia > 30) {
		    //O mês especificado contém no máximo 30 dias			
			return false;
		} else {
			if ( ano%4 !=0 && mes==2 && dia > 28) {
				//O mês especificado contém no máximo 28 dias				
				return false;
			} else {
				if ( ano%4 == 0 && mes == 2 && dia > 29) {
					//O mês especificado contém no máximo 29 dias					
					return false;
				} else {
					return true;
				}
			}
		}
	} else {
		return true;
	}
}

function preencherComCaracteres(texto, caracter, tamanho) {
	var caracteres = '';
	for(var i = 0; i < tamanho; i++) {
		caracteres += caracter;
	}
	
	return (caracteres + texto).slice(-(tamanho));
}