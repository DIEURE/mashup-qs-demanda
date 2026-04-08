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


	let bloqueiaDmenos1 = false;
	let campoData = app.field("DTSERVICO");
	let inicializado = false;
	let limpouFiltro = false;
	let atualizandoViaQlik = false;

	//get objects -- inserted here --
	app.getObject('CurrentSelections', 'CurrentSelections');

	// function graf_externos() {  

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

		//console.log("MODEL OK:", model);

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

		//console.log("Buscando página:", paginaAtual);

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

		//console.log("MODEL OK:", dadosTopRmtcMenos);

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

		//console.log("Buscando página:", paginaAtualMenos);

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
		//	console.log(dadosTopRmtc);
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

	app.getObject("KXRmDsa").then(function (obj) {
		let dataMax = obj.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;

		if (!dataMax) return;
		let texto = formatarDataQlikTexto(dataMax);

		// 🔥 Divide dd/mm/aaaa
		let partes = dataMax.split('/');

		let dia = partes[0];
		let mes = partes[1];
		let ano = partes[2];

		// 🔥 Converte para formato ISO
		let dataISOs = `${ano}-${mes}-${dia}`;

		document.getElementById("dataSelecionada").value = dataISOs;

		document.getElementById("dataAtual").innerText = texto;
	});

	//Carregando a tabela de linhas do qlik
	/* app.getObject("NufxYq").then(function (objLinha) {
		let matrix_linha = objLinha.layout.qHyperCube.qDataPages[0].qMatrix;
		
		for(let c=0; c < matrix_linha.length; c++){
			const linha = matrix_linha[c][0].qText;
			console.log(linha);
		}
	}); */

	function esperarElemento(id, callback) {
		const el = document.getElementById(id);

		if (el) {
			callback(el);
		} else {
			setTimeout(() => esperarElemento(id, callback), 300);
		}
	}

	esperarElemento("lista-linhas", function (select) {

		console.log("✅ Select encontrado:", select);

		select.innerHTML = '<option value="">Carregando...</option>';

		app.createList({
			qDef: {
				qFieldDefs: ["LINHA"]
			},
			qInitialDataFetch: [{
				qTop: 0,
				qLeft: 0,
				qWidth: 1,
				qHeight: 1000
			}]
		}, function (reply) {

			console.log("📥 Dados chegaram");

			const matrix = reply.qListObject.qDataPages[0].qMatrix;

			select.innerHTML = '<option value="">Selecione uma linha...</option>';

			matrix.forEach(row => {
				const valor = row[0].qText;

				const option = document.createElement("option");
				option.value = valor;
				option.text = valor;

				select.appendChild(option);
			});
		});
	});


	const select = document.getElementById("lista-linhas");

select.addEventListener("change", function () {

    const linha = this.value;

    const app = qlik.currApp();

    // 🔥 pega a data atual do input (já controlado no seu código)
    const dataISO = document.getElementById("dataSelecionada").value;

    let dataQlik = null;

    if (dataISO) {
        let partes = dataISO.split("-");
        dataQlik = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    // 🔄 limpa se não tiver nada
    if (!linha) {
        app.field("LINHA").clear();
        return;
    }

    // 🔥 APLICA OS DOIS FILTROS
    app.field("LINHA").selectMatch(linha, false);

    if (dataQlik) {
        app.field("DTSERVICO").selectMatch(dataQlik, false);
    }

});

	//create cube and lists
	app.createList({
		qDef: { qFieldDefs: ["DTSERVICO"] },
		qInitialDataFetch: [{ qTop: 0, qHeight: 10, qWidth: 1 }]
	}, function (reply) {
	});


	// ================= CONTROLE DE DATA =================
	// 🔥 BOTÃO LIMPAR
	$("#botaoLimpar").click(function () {

		limpouFiltro = true;

		// 1. Limpa seleções
		app.clearAll().then(function () {

			// 2. Busca a última data do Qlik
			app.getObject("KXRmDsa").then(function (obj) {

				let dataMax = obj.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;

				if (!dataMax) return;

				// 3. Seleciona no campo
				campoData.selectMatch(dataMax);

				// 4. Atualiza input (dd/mm/yyyy → yyyy-MM-dd)
				let partes = dataMax.split('/');
				let dataISO = `${partes[2]}-${partes[1]}-${partes[0]}`;

				atualizandoViaQlik = true;
				document.getElementById("dataSelecionada").value = dataISO;
				atualizandoViaQlik = false;

				// 5. Atualiza variáveis (se usar)
				let dataMenos7 = subtrairDias(dataISO, 7);
				let dataQlikMenos7 = formatarDataQlik(dataMenos7);

				app.variable.setStringValue("vDataSelecionada", dataMax);
				app.variable.setStringValue("vDataFormatada8", dataQlikMenos7);
				app.variable.setStringValue("vDataFormatada1", dataMax);


				app.getAppLayout().then(function () {
					app.field("DTSERVICO").clear();
				});


			});




		});



	});

	// 🔥 FUNÇÕES
	function getDmenos1ISO() {
		let hoje = new Date();
		hoje.setDate(hoje.getDate() - 1);

		let ano = hoje.getFullYear();
		let mes = String(hoje.getMonth() + 1).padStart(2, '0');
		let dia = String(hoje.getDate()).padStart(2, '0');

		return `${ano}-${mes}-${dia}`;
	}

	function formatarDataQlik(dataISO) {
		let partes = dataISO.split("-");
		return `${partes[2]}/${partes[1]}/${partes[0]}`;
	}

	function subtrairDias(dataString, dias) {
		let data = new Date(dataString);
		data.setDate(data.getDate() - dias);
		return data.toISOString().split('T')[0];
	}

	$(document).on("change", "#dataSelecionada", function () {

		if (atualizandoViaQlik) return;

		let dataISO = $(this).val();
		if (!dataISO) return;

		let dataQlik = formatarDataQlik(dataISO);

		campoData.selectMatch(dataQlik);

		let dataMenos8 = subtrairDias(dataISO, 7);
		let dataQlikMenos8 = formatarDataQlik(dataMenos8);

		app.variable.setStringValue("vDataSelecionada", dataQlik);
		app.variable.setStringValue("vDataFormatada8", dataQlikMenos8);
		app.variable.setStringValue("vDataFormatada1", dataQlik);
	});

	app.getList("CurrentSelections", function (reply) {

		let selecoes = reply.qSelectionObject.qSelections;

		selecoes.forEach(function (sel) {

			if (sel.qField === "DTSERVICO") {

				let dataQlik = sel.qSelected;

				console.log(dataQlik);

				if (!dataQlik) return;

				// 🔥 converte dd/mm/yyyy → yyyy-MM-dd
				let partes = dataQlik.split("/");
				let dataISO = `${partes[2]}-${partes[1]}-${partes[0]}`;

				// 🔥 atualiza o input
				document.getElementById("dataSelecionada").value = dataISO;
				console.log("Valor input:", document.getElementById("dataSelecionada").value);
				/* $(document).ready(function () {

					setTimeout(() => {
						mostrarDataSelecionada();
					}, 300);

				}); */

			}

		});

	});



	function mostrarDataSelecionada() {

		let valor = document.getElementById("dataSelecionada").value;

		if (!valor) {
			document.getElementById("data").innerText = "";
			return;
		}

		// yyyy-MM-dd → Date
		let partes = valor.split("-");
		let data = new Date(partes[0], partes[1] - 1, partes[2]);

		const diasSemana = [
			"Domingo", "Segunda-feira", "Terça-feira",
			"Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
		];

		let dia = String(data.getDate()).padStart(2, '0');
		let mes = String(data.getMonth() + 1).padStart(2, '0');
		let ano = data.getFullYear();

		let diaSemana = diasSemana[data.getDay()];

		let dataFormatada = `${diaSemana}, ${dia}/${mes}/${ano}`;

		document.getElementById("data").innerText = dataFormatada;

	}


});
