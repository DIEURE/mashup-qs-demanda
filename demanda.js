/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */

var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
	qlik.on("error", function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});
	$("#closePopup").click(function () {
		$('#popup').hide();
	});



	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('2b721db1-ca23-4fbb-a516-b3eb5affa688', config);

	//get objects -- inserted here --
	app.getObject('CurrentSelections', 'CurrentSelections');

	/* function graf_externos() { */

	//Pegar a data d-1 do relatorio
	app.getObject('b0d3bcea-8f4b-48e5-9c1b-396ca28701a4').then(function (dadosdata) {
		//console.log(dadosdata);
		$('#KPI01_DATA').html(dadosdata.layout.title);
	});


	//get objects -- Dados para os KPI's - A R C O - S U L-

	app.getObject('7a02ca2b-12d1-45e0-b669-752dfc8a2d85').then(function (dados_sul) {
		//console.log("Arco",dados)
		$('#KPI01_ARCO_SUL_DM').html(dados_sul.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI01_ARCO_SUL_PJ1').html(dados_sul.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI01_ARCO_SUL_T1').html(dados_sul.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI01_ARCO_SUL_T2').html(dados_sul.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	//get objects -- Dados para os KPI's - A R C O - L E S T E-

	app.getObject('445f2128-407e-4402-ae44-b517ca86c625').then(function (dados_leste) {
		//console.log("Arco",dados)
		$('#KPI02_ARCO_LESTE_DM').html(dados_leste.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI02_ARCO_LESTE_PJ1').html(dados_leste.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI02_ARCO_LESTE_T1').html(dados_leste.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI02_ARCO_LESTE_T2').html(dados_leste.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	//get objects -- Dados para os KPI's - A R C O - O E S T E-

	app.getObject('a897229e-2c8a-4d98-a766-85a347079545').then(function (dados_oeste) {
		//console.log("Arco",dados)
		$('#KPI03_ARCO_OESTE_DM').html(dados_oeste.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI03_ARCO_OESTE_PJ1').html(dados_oeste.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI03_ARCO_OESTE_T1').html(dados_oeste.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI03_ARCO_OESTE_T2').html(dados_oeste.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	//get objects -- Dados para os KPI's - S M B -  

	app.getObject('55003db3-1036-4ff4-b21c-c6a7f5617f61').then(function (dados_smb) {
		//console.log("Arco",dados)
		$('#KPI04_SMB_DM').html(dados_smb.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		//$('#KPI04_SMB_PJ1').html(dados.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);		

		$('#KPI04_SMB_T1').html(dados_smb.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		//$('#KPI04_SMB_T2').html(dados.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	//get objects -- Dados para os KPI's - S M B - BRT NORTE-SUL  

	app.getObject('4a7333e2-3998-4765-902e-e90ec0709ba7').then(function (dados_smb_ns) {
		//console.log("Arco",dados)
		$('#KPI04_SMB_NS_DM').html(dados_smb_ns.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI04_SMB_NS_PJ1').html(dados_smb_ns.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI04_SMB_NS_T1').html(dados_smb_ns.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI04_SMB_NS_T2').html(dados_smb_ns.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	//get objects -- Dados para os KPI's - S M B - B R T L E S T E - O E S T E 

	app.getObject('5102b1d4-89c8-4812-8688-91706aa84ece').then(function (dados_smb_lo) {
		//console.log("Arco Leste Oeste",dados_smb_lo)
		$('#KPI05_SMB_LO_DM').html(dados_smb_lo.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI05_SMB_LO_PJ1').html(dados_smb_lo.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		//$('#KPI05_SMB_LO_T1').html(dados_smb_lo.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI05_SMB_LO_T2').html(dados_smb_lo.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});

	/*------------------------------------------------------------------------------------------------ */
	//get objects -- Dados para os KPI's - D E M A N D A  D I A R I A 

	app.getObject('SJRAxUt').then(function (dados_dem) {
		//console.log("Demanda_Diaria", dados_dem)
		$('#KPI06_DEM_DM').html(dados_dem.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI06_DEM_PJ1').html(dados_dem.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI06_DEM_T1').html(dados_dem.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI06_DEM_T2').html(dados_dem.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);


	});



	/*  2 kpi abs*/
	//app.getObject('802dbd29-46df-435c-83ff-1f0ca9393b5e').then(function (dados_abs) {
	app.getObject('JmYjWy').then(function (dados_abs) {
		//console.log("Absoluta",dados_abs);
		$('#KPI07_ABS_DM').html(dados_abs.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI07_ABS_PJ1').html(dados_abs.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI07_ABS_T1').html(dados_abs.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI07_ABS_T2').html(dados_abs.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);
	});



	/*  2 kpi PROJETADO ANUAL*/
	//app.getObject('bbdcb72c-4759-42b9-837e-b0d8ec32ff5f').then(function (dados_proj) {
	app.getObject('haFuU').then(function (dados_proj) {
		//console.log("Projecao", dados_proj);
		$('#KPI08_PRJ_DM').html(dados_proj.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
		$('#KPI08_PRJ_PJ1').html(dados_proj.layout.qHyperCube.qDataPages[0].qMatrix[0][1].qText);

		$('#KPI08_PRJ_T1').html(dados_proj.layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
		$('#KPI08_PRJ_T2').html(dados_proj.layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);
	});

	/*------------------------------------------------------------------------------------------------------ */




	/* app.getObject('GRAF01_P1', 'ba88d7b2-9aa9-48ce-9a02-7179a68206c0'); app.getObject('graf_1','npnDEVU');  */
	app.getObject('mnKZfY').then(function (dadosLinha) {
		//console.log(dadosLinha);
		grafico_linha(dadosLinha, 'graf_1');
	});

	/* Gráfico de demanda ano anterior*/
	app.getObject('VztSpN').then(function (dados) {
		//console.log(dados);
		grafico_radar(dados, 'graf_2');
	});


	/* trazer os dados do qlik  PARA O TOP10*/

	let paginaAtual = 0;
	const linhasPorPagina = 10;

	let modelTabela = null;
	let totalPaginas = 0;


	app.getObject("JrGMEM").then(function (model) {

		console.log("MODEL OK:", model);

		modelTabela = model;

		model.getLayout().then(function (layout) {

			const totalLinhas = layout.qHyperCube.qSize.qcy;
			totalPaginas = Math.ceil(totalLinhas / linhasPorPagina);

			//console.log("TOTAL LINHAS:", totalLinhas);
			//console.log("TOTAL PAGINAS:", totalPaginas);

			carregarPagina(0);
		});

	});

	function carregarPagina(pagina) {

		paginaAtual = pagina;

		const requestPage = [{
			qTop: paginaAtual * linhasPorPagina,
			qLeft: 0,
			qWidth: 7, // ou número de colunas
			qHeight: linhasPorPagina
		}];

		console.log("Buscando página:", paginaAtual);

		modelTabela
			.getHyperCubeData("/qHyperCubeDef", requestPage)
			.then(function (dataPages) {

				//	console.log(
				//		"LINHAS RECEBIDAS:",
				//		dataPages[0].qMatrix.length
				//	);

				// 👇 NÃO chama getLayout aqui
				graficoDemandaTop({
					layout: {
						qHyperCube: {
							qDataPages: dataPages
						}
					}
				});

			});
	}

	window.proximaPagina = function () {

		//console.log("NEXT");

		if (paginaAtual < totalPaginas - 1) {
			carregarPagina(paginaAtual + 1);
		}
	};

	window.paginaAnterior = function () {

		//console.log("PREV");

		if (paginaAtual > 0) {
			carregarPagina(paginaAtual - 1);
		}
	};

/*************************pagina top10 menos */

let paginaAtualMenos = 0;
	const linhasPorPaginaMenos = 10;

	let modelTabelaMenos = null;
	let totalPaginasMenos = 0;


	app.getObject("wsjjwDY").then(function (dadosTopRmtcMenos) {

		console.log("MODEL OK:", dadosTopRmtcMenos);

		modelTabelaMenos = dadosTopRmtcMenos;

		dadosTopRmtcMenos.getLayout().then(function (layout) {

			const totalLinhasMenos = layout.qHyperCube.qSize.qcy;
			totalPaginasMenos = Math.ceil(totalLinhasMenos / linhasPorPaginaMenos);

			//console.log("TOTAL LINHAS:", totalLinhas);
			//console.log("TOTAL PAGINAS:", totalPaginas);

			carregarPaginaMenos(0);
		});

	});

	function carregarPaginaMenos(paginaMenos) {

		paginaAtualMenos = paginaMenos;

		const requestPage = [{
			qTop: paginaAtualMenos * linhasPorPaginaMenos,
			qLeft: 0,
			qWidth: 7, // ou número de colunas
			qHeight: linhasPorPaginaMenos
		}];

		console.log("Buscando página:", paginaAtualMenos);

		modelTabelaMenos
			.getHyperCubeData("/qHyperCubeDef", requestPage)
			.then(function (dataPages) {

				//	console.log(
				//		"LINHAS RECEBIDAS:",
				//		dataPages[0].qMatrix.length
				//	);

				// 👇 NÃO chama getLayout aqui
				graficoDemandaTopMenos({
					layout: {
						qHyperCube: {
							qDataPages: dataPages
						}
					}
				});

			});
	}

	window.proximaPaginaMenos = function () {

		//console.log("NEXT");

		if (paginaAtualMenos < totalPaginasMenos - 1) {
			carregarPaginaMenos(paginaAtualMenos + 1);
		}
	};

	window.paginaAnteriorMenos = function () {

		//console.log("PREV");

		if (paginaAtualMenos > 0) {
			carregarPaginaMenos(paginaAtualMenos - 1);
		}
	};

/****************************************************/


	//TOP20 MAIS RMTC
	app.getObject("JrGMEM").then(function (dadosTopRmtc) {
		console.log(dadosTopRmtc);
		dadosTopRmtc.getLayout().then(function (layout) {
			graficoDemandaTop({
				layout: layout
			});

		});
	});

	//TOP20 MENOS RMTC
	app.getObject("wsjjwDY").then(function (dadosTopRmtcMenos) {
		//console.log(dadosTopRmtc2);
		dadosTopRmtcMenos.getLayout().then(function (layout) {
			graficoDemandaTopMenos({
				layout: layout
			});

		});
	});

	app.getObject("udDYP").then(function (dadosBaseDem) {
		dadosBaseDem.getLayout().then(function (layout) {
			baseDemandaDiaria({
				layout: layout
			});

		});
	});

	//FIM DA FUNCAO CARREGAR


	/* } */


	/* 	//Expandir graficos
		$('.expandir').click(function () {
			$(this).next('div').toggleClass("expandir_ativo");
			//$(this).parent().toggleClass("expandir_ativo");
			qlik.resize();
		}); */

	//Grafico de Linha
	//Grafico de RADAR
	/* Gráfico de demanda ano anterior exportar os dados */
	app.getObject('VztSpN').then(function (dados) {
		$('#grafico_radar_exp').click(function () {
			var qlik_table = qlik.table(dados);
			qlik_table.exportData({ filename: "BASE_GRAF_RADAR.xlx", download: true })
		});
		//grafico_radar(dados, 'graf_2');
	});

	app.getObject('mnKZfY').then(function (dadosLinha) {
		$('#grafico_linha_exp').click(function () {
			var qlik_table = qlik.table(dadosLinha);
			qlik_table.exportData({ filename: "BASE_.xlx", download: true })
		});
		grafico_linha(dadosLinha, 'graf_1');
	});


	//exportando
	//Grafico de TOps rmtc
	app.getObject("JrGMEM").then(function (dadosTopRmtc) {
		$('#tabela_topmais_rmtc').click(function () {
			var qlik_table = qlik.table(dadosTopRmtc);
			qlik_table.exportData({ filename: "DADOS_TP05MAIS_RMTC.xlx", download: true })
		});
	});


	/* graf_externos();
		*/
	//create cube and lists
	app.createList({
		qDef: { qFieldDefs: ["DTSERVICO"] },
		qInitialDataFetch: [{ qTop: 0, qHeight: 10, qWidth: 1 }]
	}, function (reply) {

	});


	$(document).ready(function () {

		$(document).on("click", "#btnEnviar", function () {

			var dataHTML = $("#dataSelecionada").val();

			//console.log("Data HTML:", dataHTML);

			// data no formato Qlik (ex: 25/02/2026)
			var dataQlik = formatarDataQlik(dataHTML);

			//console.log("Data Qlik:", dataQlik);

			// ===== CALCULAR -8 DIAS =====
			var dataMenos8 = subtrairDias(dataHTML, 7);
			var dataQlikMenos8 = formatarDataQlik(dataMenos8);

			//console.log("Data -8 dias:", dataQlikMenos8);

			// envia para variáveis
			app.variable.setStringValue("vDataSelecionada", dataQlik);
			app.variable.setStringValue("vDataFormatada8", dataQlikMenos8);
			app.variable.setStringValue("vDataFormatada1", dataQlik);

			// aplica seleção
			app.field("DTSERVICO").selectMatch(dataQlik);

		});

	});


	// função para subtrair dias
	function subtrairDias(dataString, dias) {

		// dataHTML vem como yyyy-mm-dd
		var data = new Date(dataString);

		data.setDate(data.getDate() - dias);

		// retorna novamente yyyy-mm-dd
		return data.toISOString().split('T')[0];
	}


	function formatarDataQlik(dataISO) {

		var partes = dataISO.split("-");

		return partes[2] + "/" + partes[1] + "/" + partes[0];
	}


	// fim dos codigo data selecionada
	app.getList("CurrentSelections", function (reply) {
		//console.log(reply.qSelectionObject.qSelections);
	}); 

});