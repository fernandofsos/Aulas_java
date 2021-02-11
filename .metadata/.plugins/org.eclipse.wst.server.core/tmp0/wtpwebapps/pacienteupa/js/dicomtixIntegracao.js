var url = dicomtixConfig.url_imagem;
var oculto = false;
var colunas = 1;
var linhas = 1;

var studyObj = jQuery.parseJSON(window.opener.document.getElementById("dicomtixExameObj").value);
var usuarioObj = jQuery.parseJSON(window.opener.document.getElementById("dicomtixUsuarioObj").value);
document.title = studyObj.patientName;

var studyViewerCopy = $('#studyViewerTemplate').clone();
studyViewerCopy.attr("id", 'x' + studyObj.patientId);
studyViewerCopy.removeClass('hidden');
studyViewerCopy.appendTo('#tabContent');

document.getElementById("spanNomeUsuario").innerHTML = usuarioObj.nome;

var preConfig = {
				  CR: [
						{label: 'Padrao', wl: '1600', ww: '2800'},
						{label: '[20/40]', wl: '20', ww: '40'},
						{label: '[40/80]', wl: '40', ww: '80'},
						{label: '[80/160]', wl: '80', ww: '160'},
						{label: '[160/320]', wl: '160', ww: '320'},
						{label: '[320/640]', wl: '320', ww: '640'},
						{label: '[640/1280]', wl: '640', ww: '1280'},
						{label: '[1280/2560]', wl: '1280', ww: '2560'},
						{label: '[2560/5120]', wl: '2560', ww: '5120'}
				  ],
				  CT: [
						{label: 'Padrao', wl: '-65', ww: '1016'},
						{label: 'Abdomen', wl: '60', ww: '400'},
						{label: 'Angio', wl: '300', ww: '600'},
						{label: 'Bone', wl: '300', ww: '1500'},
						{label: 'Brain', wl: '40', ww: '80'},
						{label: 'Chest', wl: '40', ww: '400'},
						{label: 'Lungs', wl: '-400', ww: '1500'}
					],
				  DX: [
						{label: 'Padrao', wl: '2047', ww: '4095'},
						{label: '[20/40]', wl: '20', ww: '40'},
						{label: '[40/80]', wl: '40', ww: '80'},
						{label: '[80/160]', wl: '80', ww: '160'},
						{label: '[160/320]', wl: '160', ww: '320'},
						{label: '[320/640]', wl: '320', ww: '640'},
						{label: '[640/1280]', wl: '640', ww: '1280'},
						{label: '[1280/2560]', wl: '1280', ww: '2560'},
						{label: '[2560/5120]', wl: '2560', ww: '5120'}
					],
				  MG: [
						{label: 'Padrao', wl: '8046', ww: '15956'},
						{label: '[30/60]', wl: '30', ww: '60'},
						{label: '[125/250]', wl: '125', ww: '250'},
						{label: '[500/1000]', wl: '500', ww: '1000'},
						{label: '[1875/3750]', wl: '1875', ww: '3750'},
						{label: '[3750/7500]', wl: '3750', ww: '7500'},
						{label: '[7500/15000]', wl: '7500', ww: '15000'},
						{label: '[15000/30000]', wl: '15000', ww: '30000'},
						{label: '[30000/60000]', wl: '30000', ww: '60000'}
					],
				  MR: [
						{label: 'Padrao', wl: '393', ww: '787'},
						{label: '[30/60]', wl: '30', ww: '60'},
						{label: '[125/250]', wl: '125', ww: '250'},
						{label: '[500/1000]', wl: '500', ww: '1000'},
						{label: '[1875/3750]', wl: '1875', ww: '3750'},
						{label: '[3750/7500]', wl: '3750', ww: '7500'},
						{label: '[7500/15000]', wl: '7500', ww: '15000'},
						{label: '[15000/30000]', wl: '15000', ww: '30000'},
						{label: '[30000/60000]', wl: '30000', ww: '60000'}
					]
};

var menuPreConfiguracoes = $("#menuPreConfiguracoes")[0];
if(studyObj.modality && menuPreConfiguracoes){
   if(preConfig[studyObj.modality] && preConfig[studyObj.modality].length > 0){
      for(var i = 0; i < preConfig[studyObj.modality].length; i++){
	      var a = document.createElement('a');
	      a.setAttribute("class", "preConfiguracao");
		  a.href="#";
	      a.title = preConfig[studyObj.modality][i].wl + ',' + preConfig[studyObj.modality][i].ww;
	      a.innerHTML = preConfig[studyObj.modality][i].label;
		  
		  var li = document.createElement('li');
		  li.appendChild(a);
		  menuPreConfiguracoes.appendChild(li);
	   }
	}
}

var stacks = [];
var elementAtivo = null;
var serieAtiva = 0;

function splitTela(rows, columns) {
    linhas = rows;
    colunas = columns;

    // width and heihgt of user's screen
    var width = window.innerWidth - 240;
    var height = window.innerHeight - 110 - (rows * 0.5); // 110px toolbar, 0.5px for the border

    // calculate canvas sizes
    var cellWidth = width / columns;
    var cellHeight = height / rows;

    //Limpando a matriz de visualizacao de imagens
    $("#matrixView").children().each(function(indice, filho){
        $(filho).remove();
    });

    var serieAtual = 0;
    var seriesList = $(studyViewerCopy).find('.thumbnails')[0];
    for(var y = 0; y < rows; y++) {
        var rowName = 'row' + y;
        $('#matrixView').append('<div id="' + rowName + '" class="viewerRows"></div>');
        for(var x = 0; x < columns; x++) {
            $('#' + rowName).append('<div id="column' + x + '" class="viewerCells" style="width:' + cellWidth + 'px; height:' + cellHeight + 'px;"></div>');
            // new ids
            var tmpId = '#' + rowName + ' #column' + x;
            var newId = 'canvas' + x + '' + y;
            // append canvas and divs

            if(serieAtual < stacks.length){
                var cellView =  $("#cellView").clone();
                cellView.attr("id", 'cellView_' + serieAtual);
                $(tmpId).append(cellView);

                var element = $(cellView).find('.viewport')[0];

                $(element).parent()[0].style.width = cellWidth;
                $(element).parent()[0].style.height = cellHeight;

                //element.style.width = cellWidth;
                //element.style.height = cellHeight;
                mostrarSerie(serieAtual, element);

                if(serieAtual == 0){
                  definirFuncaoBotoes(serieAtual, element);
                }

                elementAtivo = element;

                $(seriesList).find('a')[serieAtual].click();

                serieAtual++;
            }
        }
    }
};

function mostrarSerie(serieAtual, element){
    var parent = $(element).parent();
    var childDivs = $(parent).find('.overlay');
    var topLeft = $(childDivs[0]).find('div');
    $(topLeft[0]).text(studyObj.patientName);
    $(topLeft[1]).text(studyObj.patientId);
    var topRight= $(childDivs[1]).find('div');
    $(topRight[0]).text(studyObj.studyDescription);
    $(topRight[1]).text(studyObj.studyDate);
    var bottomLeft = $(childDivs[2]).find('div');
    var bottomRight = $(childDivs[3]).find('div');
    

    function onImageRendered(e) {
        $(bottomRight[0]).text("Zoom:" + e.detail.viewport.scale.toFixed(2));
        $(bottomRight[1]).text("WW/WL:" + Math.round(e.detail.viewport.voi.windowWidth) + "/" + Math.round(e.detail.viewport.voi.windowCenter));
        $(bottomLeft[1]).text("Render Time:" + e.detail.renderTimeInMs + " ms");
    }
    element.addEventListener("CornerstoneImageRendered", onImageRendered, false);

    var imageId = stacks[serieAtual].imageIds[0];

    $(element).attr("serie", serieAtual);

    // image enable the dicomImage element
    cornerstone.enable(element);
    cornerstone.loadAndCacheImage(imageId).then(function(image) {
        cornerstone.displayImage(element, image);
        if(stacks[0].frameRate !== undefined && stacks[0].frameRate > 0) {
            cornerstone.playClip(element, stacks[0].frameRate);
        }

        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.touchInput.enable(element);

        // Enable all tools we want to use with this element
        cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.probe.enable(element);
        cornerstoneTools.length.enable(element);
        cornerstoneTools.ellipticalRoi.enable(element);
        cornerstoneTools.rectangleRoi.enable(element);
        cornerstoneTools.wwwcTouchDrag.activate(element);
        cornerstoneTools.zoomTouchPinch.activate(element);


        // stack tools
        cornerstoneTools.addStackStateManager(element, ['playClip']);
        cornerstoneTools.addToolState(element, 'stack', stacks[0]);
        cornerstoneTools.stackScrollWheel.activate(element);
        cornerstoneTools.stackPrefetch.enable(element);
    });

    $(element).on('click touchstart',function() {
        if(this != elementAtivo){		
			disableAllTools(elementAtivo);

			elementAtivo = this;
        
			serieAtiva = $(this).attr("serie");
        
			definirFuncaoBotoes(serieAtiva, elementAtivo);

			cornerstoneTools.stopClip(elementAtivo);
			cornerstoneTools.stackScroll.disable(elementAtivo);
			cornerstoneTools.stackScroll.enable(elementAtivo, stacks[serieAtiva], 0);
		};
    });
}

function loadStudyJson(studyViewer)
{		
		// Load the first series into the viewport
        $('#wadoURL').val();

        var currentStackIndex = 0;
        var seriesIndex = 0;
        studyObj.seriesList.forEach(function(series) {
            var stack = {
                seriesDescription: series.seriesDescription,
                stackId : series.seriesNumber,
                imageIds: [],
                seriesIndex : seriesIndex,
                currentImageIdIndex: 0,
                frameRate: series.frameRate
            }
            if(series.numberOfFrames !== undefined && series.numberOfFrames > 0) {
                var numberOfFrames = series.numberOfFrames;
                for(var i=0; i < numberOfFrames; i++) {
                    var imageId = series.instanceList[0].imageId + "?frame=" + i;
                    if(imageId.substr(0, 4) !== 'http') {
                        //imageId = "dicomweb://cornerstonetech.org/images/ClearCanvas/" + image.imageId;
						imageId = url + imageId;
                    }
					//alert(imageId);
                    stack.imageIds.push(imageId);
                }
            } else {
                series.instanceList.forEach(function(image) {
                    var imageId = image.imageId;
                    if(image.imageId.substr(0, 4) !== 'http') {
                        //imageId = "dicomweb://cornerstonetech.org/images/ClearCanvas/" + image.imageId;
                        imageId = url + image.imageId;
                    }
                    stack.imageIds.push(imageId);
					//alert(imageId);
                });

            }
            seriesIndex++;
            stacks.push(stack);
        });

        var imageViewer = $(studyViewer).find('.imageViewer')[0];
        var viewportWrapper = $(imageViewer).find('.viewportWrapper')[0];
        var parentDiv = $(studyViewer).find('.viewer')[0];

        var studyRow = $(studyViewer).find('.studyRow')[0];
        var width = $(studyRow).width();

        // image enable the dicomImage element and activate a few tools
        var element = $(studyViewer).find('.viewport')[0];
        mostrarSerie(currentStackIndex, element);
        if(currentStackIndex == 0){
            elementAtivo = element;
        }
        definirFuncaoBotoes(currentStackIndex, element);

        // resize the parent div of the viewport to fit the screen
        var seriesList = $(studyViewer).find('.thumbnails')[0];
        stacks.forEach(function(stack) {
            var seriesEntry = '<a class="list-group-item" + ' +
                    'oncontextmenu="return false"' +
                'unselectable="on"' +
                'onselectstart="return false;"' +
                'onmousedown="return false;">' +
                        '<div class="csthumbnail"' +
                    'oncontextmenu="return false"' +
                    'unselectable="on"' +
                    'onselectstart="return false;"' +
                    'onmousedown="return false;"></div>' +
                    "<div class='text-center small'>" + stack.seriesDescription + '</div></a>';
            var seriesElement = $(seriesEntry).appendTo(seriesList);
            var thumbnail = $(seriesElement).find('div')[0];
            cornerstone.enable(thumbnail);
            cornerstone.loadAndCacheImage(stacks[stack.seriesIndex].imageIds[0]).then(function(image) {
                if(stack.seriesIndex === 0) {
                    $(seriesElement).addClass('active');
                }
                cornerstone.displayImage(thumbnail, image);

            });
			
            $(seriesElement).on('click touchstart', function () {
                // make this series visible
                $("#spanPreConfig").html('Pré-configurações');
                
                var activeThumbnails = $(seriesList).find('a').each(function() {
                    $(this).removeClass('active');
                });
                $(seriesElement).addClass('active');

                cornerstoneTools.stopClip(elementAtivo);
                cornerstoneTools.stackScroll.disable(elementAtivo);
                cornerstoneTools.stackScroll.enable(elementAtivo, stacks[stack.seriesIndex], 0);
                cornerstone.loadAndCacheImage(stacks[stack.seriesIndex].imageIds[0]).then(function(image) {
                    var defViewport = cornerstone.getDefaultViewport(elementAtivo, image);
                    currentStackIndex = stack.seriesIndex;
                    cornerstone.displayImage(elementAtivo, image, defViewport);
                    cornerstone.fitToWindow(elementAtivo);
                    var stackState = cornerstoneTools.getToolState(elementAtivo, 'stack');
                    stackState.data[0] = stacks[stack.seriesIndex];
                    stackState.data[0].currentImageIdIndex = 0;
                    cornerstoneTools.stackPrefetch.enable(elementAtivo);

                    var parent = $(elementAtivo).parent();
                    var childDivs = $(parent).find('.overlay');
                    var bottomLeft = $(childDivs[2]).find('div');

                    $(bottomLeft[1]).text("# Images: " + stacks[stack.seriesIndex].imageIds.length);
                    $(bottomLeft[2]).text("Image #" + (stacks[stack.seriesIndex].currentImageIdIndex + 1) + "/" + stacks[stack.seriesIndex].imageIds.length);

                    serieAtiva = stack.seriesIndex;

                    if(stacks[stack.seriesIndex].frameRate !== undefined && stacks[stack.seriesIndex].frameRate > 0) {
                        cornerstoneTools.playClip(elementAtivo, stacks[stack.seriesIndex].frameRate);
                    }
                });
            });
        });
		
        function resizeStudyViewer() {
            var studyRow = $(studyViewer).find('.studyRow')[0];
            
            viewportWrapper.style.width = ((window.innerWidth - 240) / colunas) + "px";
            viewportWrapper.style.height = ((window.innerHeight - 110) / linhas) + "px";

            parentDiv.style.width = ((window.innerWidth - 240) / colunas) + "px";
            parentDiv.style.height = ((window.innerHeight - 110) / linhas) + "px";

            imageViewer.style.width = ((window.innerWidth - 240) / colunas) + "px";
            imageViewer.style.height = ((window.innerHeight - 110) / linhas) + "px";
            
            studyRow.style.height = ((window.innerHeight - 110) / linhas) + "px";
            
            viewportWrapper.style.height = ((window.innerHeight - 120) / linhas) + "px";

			$(seriesList).height(window.innerHeight - 110);
            cornerstone.resize(element, true);
        }

        $(window).resize(function() {
            resizeStudyViewer();
        });
		
        resizeStudyViewer();
}

function resizeMain() {
    var height = window.innerHeight;
	$('#main').height(height - 50);
    $('#tabContent').height(height - 50 -42);
}

$(window).resize(function() {
    resizeMain();
});

resizeMain();

// show the new tab (which will be the last one since it was just added
$('#tabs a:last').tab('show');

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	$(window).trigger('resize');
});

// Now load the study.json
//splitTela('2,2');
loadStudyJson(studyViewerCopy);

function disableAllTools(element)
{
    cornerstoneTools.wwwc.disable(element);
    //cornerstoneTools.wwwc.deactivate(element);
    cornerstoneTools.wwwcTouchDrag.deactivate(element);
	
    cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
    cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
    cornerstoneTools.probe.deactivate(element, 1);
    cornerstoneTools.length.deactivate(element, 1);
    cornerstoneTools.ellipticalRoi.deactivate(element, 1);
    cornerstoneTools.rectangleRoi.deactivate(element, 1);
    cornerstoneTools.stackScroll.deactivate(element, 1);
    cornerstoneTools.zoomTouchDrag.deactivate(element);
    cornerstoneTools.panTouchDrag.deactivate(element);
    cornerstoneTools.stackScrollTouchDrag.deactivate(element);
    cornerstoneTools.angle.deactivate(element, 1);
}

function predefinido(element, ww, wc)
{
    disableAllTools(element);
    
    var viewport = cornerstone.getViewport(element);

    viewport.voi.windowWidth = Number(ww);
    viewport.voi.windowCenter = Number(wc);
    cornerstone.setViewport(element, viewport);
}

function removeToolState(element, toolType)
{
    var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
    var toolData = toolStateManager.get(element, toolType);
    
    if(toolData){
        for(var i = 0; i < toolData.data.length; i++) {
            cornerstoneTools.removeToolState(element, toolType, toolData.data[i]);
        }
    }
}

function splitView(linhas, colunas){
    splitTela(linhas, colunas);
};

function apagarFuncaoBotoes(){
    $("#btn01").off('click touchstart');
    $("#btn02").off('click touchstart');
    $("#btn03").off('click touchstart');
    $("#btn04").off('click touchstart');
    $("#btn05").off('click touchstart');
    $("#btn06").off('click touchstart');
    $("#btn07").off('click touchstart');
    $("#btn08").off('click touchstart');
    $("#btn09").off('click touchstart');
    $("#btn10").off('click touchstart');
    $("#btn11").off('click touchstart');
    $("#btn12").off('click touchstart');
    $("#limparInformacoes").off('click touchstart');

    if($( "a[class='preConfiguracao']" ).length > 0){
        $( "a[class='preConfiguracao']" ).each(function(indice){
           $(this).off('click touchstart');
        });
    }

    if($( "a[class='split']" ).length > 0){
        $( "a[class='split']" ).each(function(indice){
           $(this).off('click touchstart');
        });
    }

    $("#limparImagem").off('click touchstart');

    $("#limparSerie").off('click touchstart');
};

function definirFuncaoBotoes(serieAtual, elementAtivo){
    apagarFuncaoBotoes();

    var buttons = $(studyViewerCopy).find('button');
    // Tool button event handlers that set the new active tool
    $("#btn01").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        //cornerstoneTools.wwwc.activate(elementAtivo, 1);
        cornerstoneTools.wwwc.activate(elementAtivo);
        cornerstoneTools.wwwcTouchDrag.activate(elementAtivo);
    });
    $("#btn02").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        var viewport = cornerstone.getViewport(elementAtivo);
        if(viewport.invert === true) {
            viewport.invert = false;
        }
        else {
            viewport.invert = true;
        }
        cornerstone.setViewport(elementAtivo, viewport);
    });
    $("#btn03").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.zoom.activate(elementAtivo, 5); // 5 is right mouse button and left mouse button
        cornerstoneTools.zoomTouchDrag.activate(elementAtivo);
    });
    $("#btn04").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.pan.activate(elementAtivo, 3); // 3 is middle mouse button and left mouse button
        cornerstoneTools.panTouchDrag.activate(elementAtivo);
    });
    $("#btn05").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.stackScroll.activate(elementAtivo, 1);
        cornerstoneTools.stackScrollTouchDrag.activate(elementAtivo);
    });
    $("#btn06").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.length.activate(elementAtivo, 1);
    });
    $("#btn07").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.probe.activate(elementAtivo, 1);
    });
    $("#btn08").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.ellipticalRoi.activate(elementAtivo, 1);
    });
    $("#btn09").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.rectangleRoi.activate(elementAtivo, 1);
    });
    $("#btn10").on('click touchstart',function() {
        var frameRate = stacks[serieAtual].frameRate;
        if(frameRate === undefined) {
            frameRate = 10;
        }
        cornerstoneTools.playClip(elementAtivo, 3);
    });
    $("#btn11").on('click touchstart',function() {
        cornerstoneTools.stopClip(elementAtivo);
    });
    $("#btn12").on('click touchstart',function() {
        disableAllTools(elementAtivo);
        cornerstoneTools.angle.activate(elementAtivo, 1);
    });
    $("#limparInformacoes").on('click touchstart',function() {
        if(oculto){
            $(elementAtivo).find(".overlay").removeAttr("hidden");
            $(this).html($(this).html().substr(8));
        } else {
            $(elementAtivo).find(".overlay").attr("hidden", "");
            $(this).html("Mostrar " +  $(this).html());
        }
        oculto = !oculto;
    });

    if($( "a[class='preConfiguracao']" ).length > 0){
        $( "a[class='preConfiguracao']" ).each(function(indice){
           var title = $(this).attr("title");
           var wl = title.split(',')[0];
           var ww = title.split(',')[1];
           $(this).on('click touchstart', function() {
              predefinido(elementAtivo, ww, wl);
              $("#spanPreConfig").html(this.innerHTML);
           });
           
           //if(indice == 0){
           //  $(this).click();
           //}
        });
    }

    if($( "a[class='split']" ).length > 0){
        $( "a[class='split']" ).each(function(indice){
           var title = $(this).attr("title");
           var linhas = title.split(',')[0];
           var colunas = title.split(',')[1];
           $(this).on('click touchstart', function() {
              splitView(linhas, colunas);
              $("#spanSplit").html($(this).html());
           });
        });
    }

    $("#limparImagem").on('click touchstart',function() {
        removeToolState(elementAtivo, 'angle');
        removeToolState(elementAtivo, 'ellipticalRoi');
        removeToolState(elementAtivo, 'length');
        removeToolState(elementAtivo, 'probe');
        removeToolState(elementAtivo, 'rectangleRoi');
        cornerstone.updateImage(elementAtivo);
    });

    $("#limparSerie").on('click touchstart',function() {
        var enabledImage = cornerstone.getEnabledElement(elementAtivo);
        enabledImage.toolStateManager = cornerstoneTools.newImageIdSpecificToolStateManager();
        cornerstone.updateImage(elementAtivo);
        cornerstoneTools.addStackStateManager(elementAtivo, ['playClip']);
        cornerstoneTools.addToolState(elementAtivo, 'stack', stacks[0]);
        cornerstoneTools.stackScrollWheel.activate(elementAtivo);
        cornerstoneTools.stackPrefetch.enable(elementAtivo);
    });

    elementAtivo.removeEventListener("CornerstoneNewImage");

    var parent = $(elementAtivo).parent();
    var childDivs = $(parent).find('.overlay');
    var bottomLeft = $(childDivs[2]).find('div');

    function onNewImage(e) {
        //alert('Entrou no new Image');
        // if we are currently playing a clip then update the FPS
        var playClipToolData = cornerstoneTools.getToolState(elementAtivo, 'playClip');
        if(playClipToolData !== undefined && playClipToolData.data.length > 0 && playClipToolData.data[0].intervalId !== undefined && e.detail.frameRate !== undefined) {
            $(bottomLeft[0]).text("FPS: " + Math.round(e.detail.frameRate));
            //console.log('frameRate: ' + e.detail.frameRate);
        } else {
            if($(bottomLeft[0]).text().length > 0) {
                $(bottomLeft[0]).text("");
            }
        }
        $(bottomLeft[2]).text("Image #" + (stacks[serieAtiva].currentImageIdIndex + 1) + "/" + stacks[serieAtiva].imageIds.length);
    }
    elementAtivo.addEventListener("CornerstoneNewImage", onNewImage, false);
}

$("#btn01").tooltip();
$("#btn02").tooltip();
$("#btn03").tooltip();
$("#btn04").tooltip();
$("#btn05").tooltip();
$("#btn06").tooltip();
$("#btn07").tooltip();
$("#btn08").tooltip();
$("#btn09").tooltip();
$("#btn10").tooltip();
$("#btn11").tooltip();
$("#btn12").tooltip();

// prevent scrolling on ios
document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });