var dicomtixConfig = {
				protocolo: 'http',
				host: '10.1.4.9',
				porta: 80,
				aplicacao: 'Wado',
				url_imagem: 'dicomweb://10.1.4.9/Wado/api/imagem/'
};

var dicomtixIntegracao = {
    getExame: function(usuario, senha, exameId, funcaoSucesso, funcaoErro, funcaoProgresso){
	   var url_usuario = dicomtixConfig.protocolo + '://' + dicomtixConfig.host + ':' + dicomtixConfig.porta + '/' + dicomtixConfig.aplicacao + '/api/usuario';
	   var url_exame = dicomtixConfig.protocolo + '://' + dicomtixConfig.host + ':' + dicomtixConfig.porta + '/' + dicomtixConfig.aplicacao + '/api/exame';
	   var url_imagem = dicomtixConfig.url_imagem;
	   var usuario = {login: usuario, senha: MD5(senha)};

	   //loggar
	   $.post(url_usuario, usuario, 
			function(data){
			    var inputUsuario = document.getElementById("dicomtixUsuarioObj");
 			    if(!inputUsuario){
				   inputUsuario = document.createElement("input");
				   inputUsuario.setAttribute("type", "hidden");
				   inputUsuario.setAttribute("name", "dicomtixUsuarioObj");
				   inputUsuario.setAttribute("id", "dicomtixUsuarioObj");
				   document.getElementById("formDicomtix").appendChild(inputUsuario);
			    }
			    inputUsuario.value = JSON.stringify(data);
				
				var exameFiltro = {studyId: exameId, instituicao: data.instituicao};
				$.post(url_exame, exameFiltro, 
				       function(listaExame){
						   //Obter todas as imagens do exame
						   var exame = listaExame[0];
						   exame.nrImagensBaixadas = 0;
						   exame.nrImagensErro = 0;
						   exame.nrImagens = 0;
						   exame.seriesList.forEach(function(serie){
							   serie.instanceList.forEach(function(image){
								  exame.nrImagens++;
							   });
							});
							
							if(funcaoProgresso){
								funcaoProgresso(0, exame.nrImagens);
							}
							
						   exame.seriesList.forEach(function(serie){
							   serie.instanceList.forEach(function(image){
								  var imageId = image.imageId;
								  if(imageId.substr(0, 4) != 'http'){
									imageId = url_imagem + image.imageId;
								  }

								  try{
									var promessa = cornerstone.loadAndCacheImage(imageId);

									promessa.done(function(image) {
										exame.nrImagensBaixadas++;
										if(funcaoProgresso){
											funcaoProgresso(exame.nrImagensErro + exame.nrImagensBaixadas, exame.nrImagens);
										}
										
										if((exame.nrImagensBaixadas + exame.nrImagensErro) == exame.nrImagens){
											if(funcaoSucesso){
												funcaoSucesso('Exame baixado com sucesso!');
											}
											
											//Abrir a tela de detalhe em outra aba
											var newWindowRef = window.open('detalhe.html', '_newtab');
										    if(newWindowRef){
											   newWindowRef.document.title = exame.patientName;
											   newWindowRef.name = exame.studyId;
										    }
										}
									});

									promessa.fail(function(image){
										exame.nrImagensErro++;
										if(funcaoProgresso){
											funcaoProgresso(exame.nrImagensErro + exame.nrImagensBaixadas, exame.nrImagens);
										}
									});
								  }catch(err){
									if(funcaoErro){
										funcaoErro('Erro inesperado no downlaod das imagens: ' + err.message);
									}
								  }
							   });
							});
								
						   //Criar atributo hidden chamado: dicomtixExameObj
						   var input = document.getElementById("dicomtixExameObj");
						   if(!input){
							   input = document.createElement("input");
							   input.setAttribute("type", "hidden");
							   input.setAttribute("name", "dicomtixExameObj");
							   input.setAttribute("id", "dicomtixExameObj");
							   document.getElementById("formDicomtix").appendChild(input);
						   }
						   input.value = JSON.stringify(exame);
				}).fail(function(mensagem) {
					if(funcaoErro){
						funcaoErro('Erro na consulta do exame. ' + mensagem);
					}
				});
			}).fail(function(mensagem) {
					if(funcaoErro){
						funcaoErro('Erro na validação do usuário.' + mensagem);
					}
			});
	}
};