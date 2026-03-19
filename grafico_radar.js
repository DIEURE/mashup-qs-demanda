/* Funcao para pegar os dados do qliksense*/
function grafico_radar(dados, div_exibicao) {

	am4core.ready(function () {

		// Tema
		//am4core.color('#C6C6C6');

		// Criação do gráfico
		var chart = am4core.create(div_exibicao, am4charts.RadarChart);


		var dados2 = [];
		for (var c = 0; c < dados.layout.qHyperCube.qDataPages[0].qMatrix.length; c++) {
			  
			dados2[c] = {
				"CAL_DIA_SEMANA": dados.layout.qHyperCube.qDataPages[0].qMatrix[c][0].qText,
				"DATA": dados.layout.qHyperCube.qDataPages[0].qMatrix[c][1].qText,
				"DEMANDA": dados.layout.qHyperCube.qDataPages[0].qMatrix[c][2].qText,
				"CORES": dados.layout.qHyperCube.qDataPages[0].qMatrix[c][4].qText
			};
		}

		chart.data = dados2;

		// ===============================
		// GERAR ID AUTOMATICAMENTE
		// ===============================
		chart.data.forEach(function (item, index) {
			item._id = index; // ID interno único
		});

		// Raio interno
		chart.innerRadius = am4core.percent(40);

		// ===============================
		// CATEGORY AXIS (usa ID)
		// ===============================
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "_id";

		categoryAxis.cursorTooltipEnabled = false;
		categoryAxis.tooltip.disabled = true;

		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.labels.template.location = 0.5;
		categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

		// 🔑 nunca ocultar labels
		categoryAxis.renderer.minGridDistance = 1;
		categoryAxis.renderer.forceShowLabels = true;
		categoryAxis.renderer.labels.template.truncate = false;
		categoryAxis.renderer.labels.template.hideOversized = false;

		// mostrar o CAL_DIA_SEMANA repetido
		categoryAxis.renderer.labels.template.adapter.add("text", function (text, target) {
			if (target.dataItem && target.dataItem.dataContext) {
				return target.dataItem.dataContext.CAL_DIA_SEMANA;
			}
			return text;
		});

		// ajustes visuais
		categoryAxis.renderer.labels.template.fontSize = 11;
		categoryAxis.renderer.labels.template.radius = 15;

		// ===============================
		// VALUE AXIS
		// ===============================
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.extraMax = 0.1;
		valueAxis.renderer.grid.template.strokeOpacity = 0.08;


		// 🔑 remove os valores verticais (1000 / 2000 / 3000)
		valueAxis.renderer.labels.template.disabled = true;

		chart.seriesContainer.zIndex = -10;

		// ===============================
		// SÉRIE
		// ===============================
		var series = chart.series.push(new am4charts.RadarColumnSeries());
		series.dataFields.categoryX = "_id";
		series.dataFields.valueY = "DEMANDA";

		//series.tooltipText = "{valueY.value}";
		series.tooltipText = "{DATA}-{CAL_DIA_SEMANA}: {valueY}";
		series.columns.template.strokeOpacity = 0;
		series.columns.template.radarColumn.cornerRadius = 5;
		series.columns.template.radarColumn.innerCornerRadius = 0;

		series.columns.template.adapter.add("fill", function (fill, target) {
			var cor = target.dataItem?.dataContext?.CORES;
			return cor ? am4core.color(cor) : fill;
		});


		var labelBullet = series.bullets.push(new am4charts.LabelBullet());

		//formatar
		labelBullet.label.text = "{valueY.formatNumber('#,###.000')}";
		labelBullet.label.fontSize = 11;
		
		//labelBullet.label.fill = am4core.color("#ffffff");

		// posição do valor
		labelBullet.locationY = 0.3;
		labelBullet.label.horizontalCenter = "middle";
		labelBullet.label.verticalCenter = "middle";

		// evita corte
		labelBullet.label.hideOversized = false;
		labelBullet.label.truncate = false;

		// 🔥 COR DINÂMICA DO TEXTO
		labelBullet.label.adapter.add("fill", function (fill, target) {

			var corHex = target.dataItem?.dataContext?.CORES;

			if (!corHex) return am4core.color("#000000");

			var color = am4core.color(corHex);

			// cálculo de luminosidade (padrão W3C)
			var r = color.rgb.r;
			var g = color.rgb.g;
			var b = color.rgb.b;

			var luminosidade = (0.299 * r + 0.587 * g + 0.114 * b);

			// se for escuro → branco
			if (luminosidade < 128) {
				return am4core.color("#FFFFFF");
			}
			// se for claro → preto
			else {
				return am4core.color("#000000");
			}
		});

		// ===============================
		// CURSOR
		// ===============================
		chart.cursor = new am4charts.RadarCursor();
		chart.cursor.behavior = "none";
		chart.cursor.lineX.disabled = true;
		chart.cursor.lineY.disabled = true;

		// Desabilitar zoom
		chart.zoomOutButton.disabled = true;

	});
}