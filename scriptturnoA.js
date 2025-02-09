document.addEventListener("DOMContentLoaded", function () {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta");
    const producaoBaseSeca = document.getElementById("producao-base-seca");
    const producaoEstimada = document.getElementById("producao-estimada");
    const metaFaltanteBruta = document.getElementById("meta-faltante-bruta");
    const metaFaltanteBaseSeca = document.getElementById("meta-faltante-base-seca");
    const dataHoraElement = document.getElementById("data-hora");

    const META_BRUTA = 22500; // Meta em toneladas brutas
    const turnoInicio = new Date();
    turnoInicio.setHours(7, 1, 0, 0); // Início do turno às 07:01h
    const turnoFim = new Date();
    turnoFim.setHours(18, 59, 0, 0); // Fim do turno às 18:59h

    let producaoAtual = 0; // Armazena a produção atual

    // Função para calcular o tempo decorrido, descontando pausas
    function calcularTempoDecorrido() {
        const horaAtual = new Date();
        let tempoDecorrido = (horaAtual - turnoInicio) / (1000 * 60 * 60); // Tempo em horas

        // Desconto de 1 hora de refeição (12:00h às 13:00h)
        if (horaAtual >= new Date().setHours(12, 0) && horaAtual < new Date().setHours(13, 0)) {
            tempoDecorrido -= 1;
        }

        // Desconto de 30 minutos de pausas
        tempoDecorrido -= 0.5;

        return tempoDecorrido;
    }

    // Função para calcular o tempo restante, descontando pausas
    function calcularTempoRestante() {
        const horaAtual = new Date();
        let tempoRestante = (turnoFim - horaAtual) / (1000 * 60 * 60); // Tempo em horas

        // Desconto de 1 hora de refeição (12:00h às 13:00h)
        if (horaAtual >= new Date().setHours(12, 0) && horaAtual < new Date().setHours(13, 0)) {
            tempoRestante -= 1;
        }

        // Desconto de 30 minutos de pausas
        tempoRestante -= 0.5;

        return tempoRestante;
    }

    // Função para calcular a produção estimada até o fim do turno
    function calcularProducaoEstimada() {
        const tempoDecorrido = calcularTempoDecorrido();
        const tempoRestante = calcularTempoRestante();

        if (tempoDecorrido <= 0) {
            producaoEstimada.textContent = "0 toneladas";
            return;
        }

        const ritmoDeProducao = producaoAtual / tempoDecorrido; // Ritmo em toneladas por hora
        const producaoFinal = ritmoDeProducao * tempoRestante; // Produção estimada
        producaoEstimada.textContent = (producaoFinal + producaoAtual).toFixed(2) + " toneladas";
    }

    // Função para atualizar a produção bruta, base seca e meta faltante
    inputProducao.addEventListener("input", function () {
        producaoAtual = parseFloat(inputProducao.value) || 0;

        // Atualiza produção bruta
        producaoBruta.textContent = producaoAtual.toFixed(2) + " toneladas";

        // Atualiza produção base seca (97% da produção bruta)
        const baseSeca = producaoAtual * 0.97;
        producaoBaseSeca.textContent = baseSeca.toFixed(2) + " toneladas";

        // Atualiza meta faltante (bruta e base seca)
        const faltanteBruta = Math.max(META_BRUTA - producaoAtual, 0);
        const faltanteBaseSeca = Math.max(META_BRUTA * 0.97 - baseSeca, 0);
        metaFaltanteBruta.textContent = faltanteBruta.toFixed(2) + " toneladas";
        metaFaltanteBaseSeca.textContent = faltanteBaseSeca.toFixed(2) + " toneladas";

        // Calcula a produção estimada
        calcularProducaoEstimada();
    });

    // Função para exibir a data e hora atual
    function exibirDataHora() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, "0");
        const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
        const ano = dataAtual.getFullYear();
        const horas = String(dataAtual.getHours()).padStart(2, "0");
        const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
        const segundos = String(dataAtual.getSeconds()).padStart(2, "0");

        const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
        dataHoraElement.textContent = dataFormatada;
    }

    // Atualiza a produção estimada a cada segundo
    setInterval(calcularProducaoEstimada, 1000);

    // Atualiza a data e hora a cada segundo
    setInterval(exibirDataHora, 1000);
});


