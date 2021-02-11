/**
 * 
 */


	var b = document.getElementsByTagName('body');
	var body = b[0];
	
	body.onload = function(){		
		if(self.name == ""){
			self.name =  new Date().getTime();
		}
		if(self.name == 'close'){
			var cname = getCookie('name');
			self.name = cname;
		}
		verifica();
	}
	
	function verifica(){
		
		var abas = getCookie('aba');
		var cname = getCookie('name');
		
		if(!abas || abas == ''||abas=='null' || self.name ==cname){
			setCookie('aba',1);			
			setCookie('name', self.name);			
			destruirCookies();
		}else{			
			var novoHtml = '<style> .rich-modalpanel{display: none} </style>';
			novoHtml += '<p style="font-family:sans;margin-top: 150px;font-size: 23px;color: white;background: red;width: 500px;text-align: center;margin-left: 32%;padding: 6px;border-radius: 6px;">Já existe uma janela do sistema aberta</p>';
			body.innerHTML = novoHtml;
			//boddy.appenChild(p);
		
		}
		
	}
	
	function deleteAbaCookies(){
		setCookie('aba','');
	}
	
	function destruirCookies(){		
		body.onbeforeunload = function(){
			//setCookie('aba',null);
			document.cookie = "aba=null";
		}
	}
	
	
	function getCookie(cname) {
		  var name = cname + "=";
		  var decodedCookie = decodeURIComponent(document.cookie);
		  var ca = decodedCookie.split(';');
		  for(var i = 0; i <ca.length; i++) {
		    var c = ca[i];
		    while (c.charAt(0) == ' ') {
		      c = c.substring(1);
		    }
		    if (c.indexOf(name) == 0) {
		      return c.substring(name.length, c.length);
		    }
		  }
		  return "";
		}
	
	
	function setCookie(cname, cvalue, exdays) {
		  document.cookie = cname + "=" + cvalue + "";
		  void(0);
	}
	