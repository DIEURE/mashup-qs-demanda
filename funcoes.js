
/* function exibirDataCompleta() {

	let valor = document.getElementById("dataSelecionada").value;
	let data;

	if (!valor) {
		data = new Date();
	} else {
		data = new Date(valor);
	}

	data.setDate(data.getDate());

	const diasSemana = [
		"Domingo", "Segunda-feira", "Terça-feira",
		"Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
	];

	// 4. Formatar a data (dd/mm/aaaa)
	let dia = String(data.getDate()).padStart(2, '0');
	let mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
	let ano = data.getFullYear();

	// 5. Pegar o nome do dia da semana
	let diaSemanaNome = diasSemana[data.getDay()];

	// 6. Montar a string final
	let dataFormatada = `${diaSemanaNome}, ${dia}/${mes}/${ano}`;

	// 7. Colocar no HTML usando document.getElementById
	document.getElementById("data").innerText = dataFormatada;
	document.getElementById("dataSelecionada")
		.addEventListener("change", mostrarDataSelecionada);
} */
 

function baseDemandaDiaria(dadosBaseDem) {

	//console.log("dados base calendar" + dadosBaseDem);

	const matrix = dadosBaseDem.layout.qHyperCube.qDataPages[0].qMatrix;


	let dadosBase = {};

	matrix.forEach(function (row) {

		let DATA = row[0].qText;
		let DEMANDA = row[1].qText;
		let PROJECAO = row[2].qText;

		if (!dadosBase[DATA]) {
			dadosBase[DATA] = [];
		}

		dadosBase[DATA].push({
			tipo: "demanda",
			valor: DEMANDA
		});

		dadosBase[DATA].push({
			tipo: "projecao",
			valor: PROJECAO
		});

	});



	//Calendario
	const calendarDays = document.getElementById('calendarDays');
	const monthYear = document.getElementById('monthYear');
	const prevMonthBtn = document.getElementById('prevMonth');
	const nextMonthBtn = document.getElementById('nextMonth');

	let currentDate = new Date();

	let dadosBasez = {
		'01/02/2026': '485.658',
		'02/02/2026': '125.458'
	}



	// Dados fictícios (pode vir de um banco de dados)
	events = dadosBase;

	//console.log(dadosBase);
	function renderCalendar() {
		calendarDays.innerHTML = '';
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		// Atualiza o topo
		const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
		monthYear.textContent = `${monthNames[month]} ${year}`;

		// Primeiro dia do mês (0-6)
		const firstDayIndex = new Date(year, month, 1).getDay();
		// Último dia do mês
		const lastDay = new Date(year, month + 1, 0).getDate();

		//Verificar a maior demanda do mes
		let maiorDemandaMes = 0;
		let maiorDemandaAnterior = 0;

		Object.keys(events).forEach(function (data) {

			let partes = data.split('/');
			let dia = parseInt(partes[0]);
			let mes = parseInt(partes[1]) - 1;
			let ano = parseInt(partes[2]);

			let dataEvento = new Date(ano, mes, dia);

			let demandaDia = 0;

			events[data].forEach(function (e) {
				if (e.tipo === "demanda") {
					demandaDia = parseValor(e.valor);
				}
			});

			// mesma lógica do mês atual
			if (dataEvento.getMonth() === month && dataEvento.getFullYear() === year) {

				if (demandaDia > maiorDemandaMes) {
					maiorDemandaMes = demandaDia;
				}

			}

			// meses anteriores
			if (dataEvento < new Date(year, month, 1)) {

				if (demandaDia > maiorDemandaAnterior) {
					maiorDemandaAnterior = demandaDia;
				}

			}

		});
		//fim do calculo da maior demanda do mes atual e anterior

		// Dias em branco antes do primeiro dia
		for (let i = 0; i < firstDayIndex; i++) {
			const div = document.createElement('div');
			div.classList.add('day', 'empty');
			calendarDays.appendChild(div);
		}

		// Gerar dias
		for (let i = 1; i <= lastDay; i++) {
			const div = document.createElement('div');
			div.classList.add('day');

			// Adiciona número do dia
			div.innerHTML = `<span class="day-number">${i}</span>`;

			// Verifica se é hoje
			const today = new Date();
			if (i === today.getDate() - 1 && month === today.getMonth() && year === today.getFullYear()) {
				div.classList.add('today');
			}

			// --- INSERIR DADOS AQUI ---
			// Exemplo: formatar data como YYYY-MM-DD
			//const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
			const dateStr = `${String(i).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;



			if (events[dateStr]) {

				let demandaDia = 0;
				let projecaoDia = 0;

				events[dateStr].forEach(function (evento) {

					if (evento.tipo === "demanda") {
						demandaDia = parseValor(evento.valor);
					}

					if (evento.tipo === "projecao") {
						projecaoDia = parseValor(evento.valor);
					}

				});

				events[dateStr].forEach(function (evento) {

					const eventDiv = document.createElement('div');
					eventDiv.classList.add('event');

					if (evento.tipo === "demanda") {

						eventDiv.textContent = "Dem: " + evento.valor;

						// Se demanda > projeção → verde
						if (demandaDia > projecaoDia) {
							eventDiv.classList.add('demanda-verde');
						} else {
							eventDiv.classList.add('demanda');
						}

						// Se for a maior demanda do mês
						if (demandaDia === maiorDemandaMes) {
							div.classList.add('maior-demanda-mes');
						}

						if (demandaDia === maiorDemandaAnterior) {
							div.classList.add('maior-demanda-anterior');
						}

					}

					if (evento.tipo === "projecao") {
						eventDiv.classList.add('projecao');
						eventDiv.textContent = "Proj: " + evento.valor;
					}

					div.appendChild(eventDiv);

				});

			}


			calendarDays.appendChild(div);
		}
	}

	// Navegação
	prevMonthBtn.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		renderCalendar();
	});

	nextMonthBtn.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		renderCalendar();
	});

	renderCalendar();
}
//Fim Calendario

function parseValor(v) {
	return parseFloat(v.replace(/\./g, '').replace(',', '.')) || 0;
}
function formatarNumero(valor) {
	return Number(
		String(valor).replace('.', '').replace(',', '.')
	).toLocaleString('pt-BR');
}

/*============================================================FIM DO CALENDARIO========================================================= */

function graficoDemandaTop(dadosTopRmtc) {
	console.log(dadosTopRmtc);

	if (!dadosTopRmtc?.layout?.qHyperCube?.qDataPages?.length) {
		console.warn("Dados ainda não carregados");
		return;
	}

	const matrix = dadosTopRmtc.layout.qHyperCube.qDataPages[0].qMatrix;

	let titulo1 = dadosTopRmtc.layout.title || "TOP 10+ [RMTC]";
	document.getElementById("titulo1").innerText = titulo1;

	let html = "";
	const tbody = document.querySelector("#tblDemanda1 tbody");

	if (!tbody) {
		console.error("tbody não encontrado!");
		return;
	}

	for (let c = 0; c < matrix.length; c++) {

		const linha = matrix[c][0].qText;

		const demandaAtual = matrix[c][1].qNum;
		const demandaAnterior = matrix[c][2].qNum;

		const demandaAtualText = matrix[c][1].qText;
		const demandaAnteriorText = matrix[c][2].qText;

		const variacao = matrix[c][3]?.qText || "0%";

		let icone = "";
		let cor = "";

		let variacaoFormatada = variacao.includes('%')
			? variacao
			: variacao + '%';

		if (demandaAtual < demandaAnterior) {
			icone = '<i class="fas fa-arrow-down"></i>';
			cor = "text-danger";
		} else {
			icone = '<i class="fas fa-arrow-up"></i>';
			cor = "text-success";
		}

		html += `
		<tr style="font-size:10px">
			<td>${linha}</td>
			<td>${parseValor(demandaAtualText)}</td>
			<td>${parseValor(demandaAnteriorText)}</td>
			<td class="${cor}">
		      ${variacaoFormatada} ${icone}
	        </td>
		</tr>`;
	}

	tbody.innerHTML = html;

	setTimeout(function () {
		$(window).trigger('resize');
	}, 100);
}
/****************************************************************T O P  M E N O S **********************************************************/
function graficoDemandaTopMenos(dadosTopRmtcMenos) {
	console.log(dadosTopRmtcMenos);

	if (!dadosTopRmtcMenos?.layout?.qHyperCube?.qDataPages?.length) {
		console.warn("Dados ainda não carregados");
		return;
	}

	const matrix = dadosTopRmtcMenos.layout.qHyperCube.qDataPages[0].qMatrix;

	let titulo1Menos = dadosTopRmtcMenos.layout.title || "TOP 10- [RMTC]";
	document.getElementById("titulo1Menos").innerText = titulo1Menos;

	let html = "";
	const tbody = document.querySelector("#tblDemanda1Menos tbody");

	if (!tbody) {
		console.error("tbody não encontrado!");
		return;
	}

	for (let c = 0; c < matrix.length; c++) {

		const linha = matrix[c][0].qText;

		const demandaAtualMenos = matrix[c][1].qNum;
		const demandaAnteriorMenos = matrix[c][2].qNum;

		const demandaAtualMenosText = matrix[c][1].qText;
		const demandaAnteriorMenosText = matrix[c][2].qText;

		const variacao = matrix[c][3]?.qText || "0%";

		let icone = "";
		let cor = "";

		let variacaoFormatada = variacao.includes('%')
			? variacao
			: variacao + '%';

		if (demandaAtualMenos < demandaAnteriorMenos) {
			icone = '<i class="fas fa-arrow-down"></i>';
			cor = "text-danger";
		} else {
			icone = '<i class="fas fa-arrow-up"></i>';
			cor = "text-success";
		}

		html += `
		<tr style="font-size:10px">
			<td>${linha}</td>
			<td>${parseValor(demandaAtualMenosText)}</td>
			<td>${parseValor(demandaAnteriorMenosText)}</td>
			<td class="${cor}">
		      ${variacaoFormatada} ${icone}
	        </td>
		</tr>`;
	}

	tbody.innerHTML = html;

	setTimeout(function () {
		$(window).trigger('resize');
	}, 100);
}

function formatarDataQlikTexto(dataMax) {

	let partes = dataMax.split("/");
	let data = new Date(partes[2], partes[1] - 1, partes[0]);

	const diasSemana = [
		"Domingo", "Segunda-feira", "Terça-feira",
		"Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
	];

	let dia = String(data.getDate()).padStart(2, '0');
	let mes = String(data.getMonth() + 1).padStart(2, '0');
	let ano = data.getFullYear();

	let diaSemana = diasSemana[data.getDay()];

	return `${diaSemana}, ${dia}/${mes}/${ano}`;
}

/********************************************************************F I M *****************************************************************/