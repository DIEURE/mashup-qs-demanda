function grafico_linha(dadosLinha, div_exibicao1) {

	am4core.ready(function () {

		am4core.useTheme(am4themes_animated);

		// =========================
		// CREATE CHART
		// =========================
		var chart = am4core.create(div_exibicao1, am4charts.XYChart);

		var dados3 = [];
		for (var c = 0; c < dadosLinha.layout.qHyperCube.qDataPages[0].qMatrix.length; c++) {
			//console.log(dados3);
			dados3[c] = {
				"diaLabel": dadosLinha.layout.qHyperCube.qDataPages[0].qMatrix[c][0].qText,
				"dataTexto": dadosLinha.layout.qHyperCube.qDataPages[0].qMatrix[c][1].qText,
				"real": dadosLinha.layout.qHyperCube.qDataPages[0].qMatrix[c][2].qText,
				"previsao": dadosLinha.layout.qHyperCube.qDataPages[0].qMatrix[c][3].qText
			};
		}

		chart.data = dados3;


		// ===============================
		// GERAR ID AUTOMATICAMENTE
		// ===============================
		chart.data.forEach(function (item, index) {
			item._id = index; // ID interno único
		});


		// =========================
		// EIXO X – CATEGORIA + LABEL
		// =========================
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "_id";
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.renderer.minGridDistance = 30;

		// 🔑 Força o texto visível repetido
		categoryAxis.renderer.labels.template.adapter.add("text", function (text, target) {
			if (
				target.dataItem &&
				target.dataItem.dataContext &&
				target.dataItem.dataContext.diaLabel
			) {
				return target.dataItem.dataContext.diaLabel;
			}
			return text;
		});

		categoryAxis.cursorTooltipEnabled = false;
		// =========================
		// EIXO Y – OCULTO
		// =========================
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.ticks.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		// =========================
		// LINHA REAL
		// =========================
		var seriesReal = chart.series.push(new am4charts.LineSeries());
		seriesReal.name = "Realizado";
		seriesReal.dataFields.valueY = "real";
		seriesReal.dataFields.categoryX = "_id";
		seriesReal.strokeWidth = 3;
		seriesReal.stroke = am4core.color("#cf8701");
		seriesReal.tensionX = 0.8;

		seriesReal.tooltip.getFillFromObject = false;
		seriesReal.tooltip.background.fill = am4core.color('#cf8701')
		seriesReal.tooltipText =
			"[bold]{diaLabel}[/]\nData: {dataTexto}\nRealizado: {valueY}";

		/* var bulletReal = seriesReal.bullets.push(new am4charts.CircleBullet());
		bulletReal.circle.fill = am4core.color("#ff4800");
		bulletReal.circle.stroke = am4core.color("#ff4800"); */


		// =========================
		// LINHA PREVISÃO
		// =========================
		var seriesPrev = chart.series.push(new am4charts.LineSeries());
		seriesPrev.name = "Previsto";
		seriesPrev.dataFields.valueY = "previsao";
		seriesPrev.dataFields.categoryX = "_id";
		seriesPrev.strokeWidth = 3;
		seriesPrev.stroke = am4core.color("#0004ff");
		seriesPrev.strokeDasharray = "5 3";
		seriesPrev.tensionX = 0.8;

		//series.tooltip.disabled = false;
		seriesPrev.tooltip.getFillFromObject = false;
		seriesPrev.tooltip.background.fill = am4core.color('#143ae6')
		seriesPrev.tooltipText =
			"[bold]{diaLabel}[/]\nData: {dataTexto}\nPrevisto: {valueY}";

		/* var bulletPrev = seriesPrev.bullets.push(new am4charts.CircleBullet());
		bulletPrev.circle.fill = am4core.color("#6100fd");
		bulletPrev.circle.stroke = am4core.color("#6100fd"); */


		// =========================
		// LEGENDA
		// =========================
		chart.legend = new am4charts.Legend();
		chart.legend.position = "inferior";

		// =========================
		// CURSOR
		// =========================
		chart.cursor = new am4charts.XYCursor();
		// 2. Desabilitar as linhas que cruzam o gráfico (X e Y)
		chart.cursor.lineY.disabled = true; //Linha vertical
		chart.cursor.lineX.disabled = true; // Linha horizontal


		/* chart.cursor.xAxis.tooltip.disabled = true;
		chart.cursor.yAxis.tooltip.disabled = true; */
	});

}
 