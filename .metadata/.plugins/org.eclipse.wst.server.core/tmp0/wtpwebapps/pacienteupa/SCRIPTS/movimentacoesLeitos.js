function avisosAcoes(opcao) {	 
  	 if (opcao == 1) {  
	    alert("A transferência só poderá ser desfeita pela clínica original!");
   	 } else if (opcao == 2) {
   		 alert("Leito nao possui informações de transferência anterior!");
   	 } else if (opcao == 3) {
   		 alert("Leito original já ocupado! Não é possível desfazer a transferência!");   	 		 	    	
   	 } else if (opcao == 4 || opcao == 6 || opcao == 7 || opcao == 9 || opcao == 15) {    	 	 
   		Richfaces.showModalPanel("panelLiberacoes");
   	 } else if (opcao == 10) {
    	 alert("Usuário sem permissão");
    	 return false;	
   	 } else { // RESERVAR_INTERDITAR		    	  
   		Richfaces.showModalPanel("panelAcoes");
   	 }
} 

// Avisos e confirmacao da acao de transferencia, permuta ou transferencia
function avisosTransferencia(tipo) {
   if (tipo == 1) {
      alert("Leito transferido não pode retornar para a mesma clínica, caso deseje desfazer a transferência arraste para a área de ações.");
   } else if (tipo == 2) {
      alert("Não é possível transferir para um leito já ocupado ou em transferência!");
   } else if (tipo == 3) {
      alert("Não é possível transferir para um leito interditado ou reservado!");
   } else if (tipo == 17) {
	  alert("Não é possível transferir para um leito com paciente em trânsito ou centro cirurgico!");  
   } else if (tipo == 16) {
	   alert("Sexo do paciente não é compatível com a enfermaria.");
   } else if (tipo == 18) {
	   alert("Não pode transferir paciente para ele mesmo.");	
   } else if (tipo == 11 || tipo == 12 || tipo == 13 || tipo == 14 ){
	   Richfaces.showModalPanel("panelLiberacoes");
   }  else if (tipo == 10) {
      alert("Usuário sem permissão");
      return false;       
   }      
}

function avisosValidacao(erro, panel, show) {
	if (erro == 1) {
    	alert("Selecione o motivo da alta.");
    	return false;
	} else if (erro == 2) {
		alert("Selecione o hospital de destino.");
    	return false;
	} else if (erro == 3) {
		alert("Selecione a clínica de destino da transferência.");
    	return false;
	} else if (erro == 4) {
		alert("Preencha todos os campos da reserva do leito.");
    	return false;
	} else if (erro == 5) {
		alert("Informe o motivo da interdição do leito.");
    	return false;
	} else if (erro == 6) {
		alert("Informações foram alteradas por outro usuário, atualize a sua página (F5).");
    	return false;
	} else if (erro == 7) {
		alert("Use a ação 'RETORNAR PARA UNIDADE DE ORIGEM' para voltar o paciente ao seu leito anterior.");
    	return false;	
	} else if (erro == 8) {
		alert("Usuário sem permissão para esta ação.");
    	return false;		
	} else if (erro == 9) {
		alert("Usuário/Conselho e Senha/Assinatura inválidos.");
    	return false;	   
	} else if (erro == 10) {
		alert("Não há relatório de alta para este paciente.");
    	return false;	   	
	} else if (erro == 11) {
		alert("Erro ao gravar no banco de dados. Contate o NTI.");
    	return false;	   	
	} else if (erro == 12) {
		alert("Leito destino esta ocupado ou em transferência.");		
    	return false;	   		
	} else if (erro == 13) {
		alert("Sexo do leito é diferente do paciente.");		
    	return false;	   	
	} else if (erro == 14) {
		alert("Clínica e/ou Leito não selecionado.");		
    	return false;	   	
	} else if (erro == 15) {
		alert("Leito transferido não pode retornar para a mesma clínica, caso deseje desfazer a transferência arraste para a área de ações.");	
    	return false;
	} else if (erro == 17) {
		alert("Motivo do transporte do paciente não informado.");	
    	return false;	
	} else if (erro == 16) {
		// Sem efeito
		return false;
	} else if(erro == 18) {
		alert("O Campo Usuário/Conselho é obrigatório.");
		return false;
	} else if(erro == 19) {
		alert("O Campo Senha/Assinatura é obrigatório.");
		return false;
	} else if (erro == 20) {
		alert("Paciente já alocado, favor atualizar a página.");
		return false;
	} else if (erro == 21) {
		alert("O Leito esta ocupado, favor escolha outro leito.");
		return false;
	} else if (erro == 22) {
		alert("Preencha o relatório de transferência, para poder finalizar essa ação.");
		return false;
	} else if (erro == 23) {
		alert("Paciente sem autorização para alta de decisão médica.");
		return false;
	} else if (erro == 24) {
        alert("Preencha todos os campos da Sepse!");
        return false;
    } else if (erro == 25) {
        alert("Paciente não possui regulação!");
        return false;
    } else if (erro == 26) {
        alert("Informe o campo Justificativa!");
        return false;
    } else if (erro == 27) {
        alert("Informe a Data do óbito!");
        return false;
    } else if (erro == 28) {
        alert("Hora do óbito inválida!");
        return false;
    } else if (erro == 29) {
        alert("Informe a hora do óbito!");
        return false;
    } else if (erro == 30) {
        alert("Data do óbito não pode ser maior que a data atual!");
        return false;
    } else if (erro == 31) {
        alert("Data do óbito não pode ser anterior a data da entrada!");
        return false;
    }else if (erro == 32) {
        alert("Existe um paciente em transferência, atualize a sua página (F5).");
        return false;
    } else {
    	if (show) {
        	Richfaces.showModalPanel(panel);
    	} else {
    		Richfaces.hideModalPanel(panel);
    	}	 	
	} 	
}

function validarData(campo) {
	var expReg = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
     		    
	if ((campo.match(expReg)) && (campo != '')) {
		var dia = parseInt(campo.substring(0,2));
		var mes = parseInt(campo.substring(3,5));
		var ano = parseInt(campo.substring(6,10));
				
		if (mes > 12 || mes < 1) {
			return false;
		}
		if ((mes==4 || mes==6 || mes==9 || mes==11) && dia > 30) {
		    //O mes especificado contem no maximo 30 dias			
			return false;
		} else {
			if ( ano%4 !=0 && mes==2 && dia > 28) {
				//O mes especificado contem no maximo 28 dias				
				return false;
			} else {
				if ( ano%4 == 0 && mes == 2 && dia > 29) {
					//O mes especificado contem no maximo 29 dias					
					return false;
				} else {
					return true;
				}
			}
		}
	} else {
		return false;
	}
}

function validaAtendimentoMedico(msg) {
	if (msg != '') {
		alert(msg);
	}
}
