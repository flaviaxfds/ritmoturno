document.addEventListener("DOMContentLoaded", function() {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta");
    const producaoBaseSeca = document.getElementById("producao-base-seca");
    const ritmo = document.getElementById("ritmo");
    const metaFaltanteBruta = document.getElementById("meta-faltante-bruta");
    const metaFaltanteBaseSeca = document.getElementById("meta-faltante-base-seca");

    const META_BRUTA = 22500; // Meta total do turno (tbu)
    let producaoAtual = 0; // Variável para armazenar a produção atual

    // Função para calcular o ritmo e a produção estimada
    function calcularRitmoEProjecao() {
        const agora = new Date();
        
        // Definir o início e fim do turno considerando a transição de dia (19:15h - 06:59h)
        let turnoInicio, turnoFim;
        if (agora.getHours() >= 0 && agora.getHours() < 7) {
            // Se estamos entre 00h e 06:59h, o turno atual deve ser o do dia anterior (19:15h - 23:59h)
            turnoInicio = new Date(agora);
            turnoInicio.setDate(turnoInicio.getDate() - 1); // Ajusta para o dia anterior
            turnoInicio.setHours(19, 15, 0, 0); // 19:15h do dia anterior
            turnoFim = new Date(agora);
            turnoFim.setHours(6, 59, 0, 0); // 06:59h do mesmo dia
        } else {
            // Se estamos entre 19:15h e 23:59h
            turnoInicio = new Date(agora);
            turnoInicio.setHours(19, 15, 0, 0); // 19:15h do dia atual
            turnoFim = new Date(agora);
            turnoFim.setDate(turnoFim.getDate() + 1); // Ajusta para o próximo dia
            turnoFim.setHours(6, 59, 0, 0); // 06:59h do dia seguinte
        }

        // Total de pausas (1h30min = 1.5 horas)
        const tempoPausas = 1.5;

        // Calcular o tempo trabalhado até agora (em horas)
        let tempoTrabalhado = (agora - turnoInicio) / (1000 * 60 * 60);  // Tempo em horas
        tempoTrabalhado -= tempoPausas;  // Subtrair o tempo de pausas

        // Garantir que o tempo trabalhado seja maior que 0
        if (tempoTrabalhado <= 0) {
            ritmo.textContent = "0 toneladas/hora";
            return;
        }

        // Calcular o ritmo de produção (toneladas por hora)
        let ritmoPorHora = producaoAtual / tempoTrabalhado;

        // Calcular o tempo restante no turno
        let tempoRestante = (turnoFim - agora) / (1000 * 60 * 60);  // Tempo restante em horas
        tempoRestante -= tempoPausas;  // Subtrair o tempo de pausas restantes

        if (tempoRestante <= 0) {
            tempoRestante = 0;
        }

        // Calcular a produção estimada até o final do turno
        let producaoEstimadaFinal = producaoAtual + (ritmoPorHora * tempoRestante);

        // Atualizar o HTML com as informações calculadas
        ritmo.textContent = ritmoPorHora.toFixed(2) + " toneladas/hora";
        metaFaltanteBruta.textContent = (META_BRUTA - producaoEstimadaFinal).toFixed(2);
        metaFaltanteBaseSeca.textContent = ((META_BRUTA - producaoEstimadaFinal) * 0.97).toFixed(2);
    }

    // Atualizar os valores de produção e base seca ao digitar
    inputProducao.addEventListener("input", function() {
        producaoAtual = parseFloat(inputProducao.value) || 0;

        // Atualizar produção bruta e base seca
        producaoBruta.textContent = producaoAtual.toFixed(2);
        producaoBaseSeca.textContent = (producaoAtual * 0.97).toFixed(2);

        // Calcular ritmo e produção estimada
        calcularRitmoEProjecao();
    });
});