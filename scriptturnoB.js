document.addEventListener("DOMContentLoaded", function () {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta"); // TBU
    const producaoBaseSeca = document.getElementById("producao-base-seca"); // TBS
    const metaFaltanteBruta = document.getElementById("meta-faltante-bruta"); // TBU restante
    const metaFaltanteBaseSeca = document.getElementById("meta-faltante-base-seca"); // TBS restante
    const ritmo = document.getElementById("producao-estimada");

    // Meta de produção
    const META_BRUTA = 22500; // Meta em toneladas brutas

    // Função para calcular a produção estimada
    function calcularProducaoEstimada() {
        const agora = new Date();
        const producaoAtual = parseFloat(inputProducao.value) || 0;

        // Definir início e fim do turno
        const inicioTurno = new Date(agora);
        inicioTurno.setHours(19, 15, 0, 0); // 19:15h de hoje

        const fimTurno = new Date(agora);
        if (agora.getHours() < 7) {
            fimTurno.setDate(fimTurno.getDate());
        } else {
            fimTurno.setDate(fimTurno.getDate() + 1);
        }
        fimTurno.setHours(6, 59, 0, 0); // 06:59h

        // Calcular tempo decorrido desde 19:15h
        let tempoDecorrido = (agora - inicioTurno) / (1000 * 60 * 60); // Em horas
        if (tempoDecorrido < 0) {
            tempoDecorrido += 24; // Ajuste se a hora atual for antes das 19:15h
        }

        // Calcular tempo restante até 06:59h
        let tempoRestante = (fimTurno - agora) / (1000 * 60 * 60); // Em horas
        tempoRestante -= 1.25; // Remover pausas (1h refeição + 15min pausa)

        if (tempoDecorrido > 0) {
            // Ritmo de produção por hora
            const ritmoAtual = producaoAtual / tempoDecorrido;

            // Produção estimada final
            const producaoEstimada = producaoAtual + (ritmoAtual * tempoRestante);

            // Exibir resultado
            ritmo.textContent = `${producaoEstimada.toFixed(2)} toneladas`;
        } else {
            ritmo.textContent = "Aguardando início do turno...";
        }

        // Cálculo da tonelada faltante para a meta (TBU e TBS)
        const faltanteBruta = Math.max(META_BRUTA - producaoAtual, 0); // Para TBU
        const faltanteBaseSeca = Math.max((META_BRUTA * 0.97) - (producaoAtual * 0.97), 0); // Para TBS

        // Atualiza as metas faltantes
        metaFaltanteBruta.textContent = `${faltanteBruta.toFixed(2)} toneladas`;
        metaFaltanteBaseSeca.textContent = `${faltanteBaseSeca.toFixed(2)} toneladas`;
    }

    // Atualiza a cada vez que um novo valor é inserido
    inputProducao.addEventListener("input", function () {
        const producaoAtual = parseFloat(inputProducao.value) || 0;

        // Atualiza Produção Atual (TBU)
        producaoBruta.textContent = `${producaoAtual.toFixed(2)} toneladas`;

        // Atualiza Produção Atual (TBS) com multiplicação por 0.97
        const baseSeca = producaoAtual * 0.97;
        producaoBaseSeca.textContent = `${baseSeca.toFixed(2)} toneladas`;

        // Chama a função para calcular a produção estimada e as metas faltantes
        calcularProducaoEstimada();
    });

    // Chama a função ao carregar a página para garantir que os valores iniciais sejam mostrados corretamente
    calcularProducaoEstimada();
});
