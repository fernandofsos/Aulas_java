function imprimirRelatorio(clinica,data,dataAnt) {
	if (clinica==0) {
	   alert("Selecione uma unidade.");	
	} else {	   
	   window.open("http://10.1.1.55:8080/relatorios/GeraRelCenso?p1=" + clinica + "&amp;p2=" + data + "&amp;p3=" + dataAnt,"relatorio","width=900,height=600");
	}
}

function telaPEP(clinica, usuario) {
	if (clinica==0) {
		alert("Selecione uma unidade.");
	} else {		
	    window.location = "http://svraplic2/sistemas2/pep/paginas/PEP_Ls_Paciente_Internado.aspx?p4="+clinica+"&amp;pusu="+usuario;	    
	}
}
	
function telaPEPProntuario(clinica, isnInternacao, isnInternacaoLeito) {
	if (clinica==0 || clinica==null) {
		alert("Selecione uma unidade.");
	} else {
		window.open("http://svraplic2/sistemas2/pep/paginas/PEP_cd_exame_solic_prontuario.aspx?p2="+isnInternacao+"&amp;p3="+isnInternacaoLeito+"&amp;p4="+clinica+"&amp;p6=","","scrollbars=yes,top=0,left=0");
		//window.open("http://svraplic2/sistemas2/pep/paginas/PEP_cd_exame_solic_prontuario.aspx?p2="+isnInternacao+"&amp;p3="+isnInternacaoLeito+"&amp;p4="+clinica+"&amp;p6=","PEP do Paciente","width=900,height=540");
		//var left = (screen.width/2)-(900/2);
		//var top = (screen.height/2)-(540/2);
	    //url = "http://svraplic2/sistemas2/pep/paginas/PEP_cd_exame_solic_prontuario.aspx?p2="+isnInternacao+"&amp;p3="+isnInternacaoLeito+"&amp;p4="+clinica+"&amp;p6=";	    
		//alert(url);		
	}
}

//Inicio codigo para contar caracteres restantes para campos input e textarea com as classes css: 'countdown limit_1000_' onde 1000 é o maxlength do componente.
//Para o uso desse recurso deve-se apenas fazer a chamada da funcao: initCountdown(), no final do codigo xhtml.
function initCountdown() {
	var countdown = {
	  init: function() {
	    countdown.remaining = countdown.max - jQuery(countdown.obj).val().length;
	    if (countdown.remaining > countdown.max) {
	    	jQuery(countdown.obj).val(jQuery(countdown.obj).val().substring(0,countdown.max));
	    }
	    jQuery(countdown.obj).siblings(".restantes").html("Restam " + countdown.remaining + " caracteres.");
	  },
	    max: null,
	    remaining: null,
	    obj: null
	};
	jQuery(".countdown").each(function() {
		jQuery(this).focus(function() {
	        var c = jQuery(this).attr("class");
	        countdown.max = parseInt(c.match(/limit_[0-9]{1,}_/)[0].match(/[0-9]{1,}/)[0]);
	        countdown.obj = this;
	        iCount = setInterval(countdown.init,1000);
	    }).blur(function() {
	        countdown.init();
	        clearInterval(iCount);
	    });
	});
}
//Fim codigo para contar caracteres restantes