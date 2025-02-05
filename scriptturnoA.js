document.addEventListener("DOMContentLoaded", function() {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta");
    const producaoBaseSeca = document.getElementById("producao-base-seca");
    const meta = document.getElementById("meta");
    const ritmo = document.getElementById("ritmo");
    const producaoEstimada = document.getElementById("producao-estimada");
    const dataHoraElement = document.getElementById("data-hora");

    const turnoInicio = new Date();
    turnoInicio.setHours(7, 1, 0, 0);  // 07:01h

    const turnoFim = new Date();
    turnoFim.setHours(18, 59, 0, 0);  // 18:59h

    let producaoAtual = 0;

    // Função para calcular a produção estimada
    function calcularProducaoEstimada() {
        const horaAtual = new Date();
        const tempoRestante = (turnoFim - horaAtual) / (1000 * 60 * 60); // Tempo restante em horas

        const ritmoDeProducao = (producaoAtual / (horaAtual - turnoInicio) * (1000 * 60 * 60)); // Ritmo por hora

        const producaoFinal = ritmoDeProducao * tempoRestante; // Produção estimada até o fim do turno
        producaoEstimada.textContent = (producaoFinal + producaoAtual).toFixed(2) + " toneladas";
    }

    // Função para atualizar produção e base seca
    inputProducao.addEventListener("input", function() {
        const valor = parseFloat(inputProducao.value) || 0;
        producaoAtual = valor;

        const baseSeca = valor * 0.97;
        producaoBruta.textContent = valor.toFixed(2);
        producaoBaseSeca.textContent = baseSeca.toFixed(2);

        ritmo.textContent = ((valor / (new Date() - turnoInicio) * (1000 * 60 * 60)) || 0).toFixed(2) + " toneladas/hora";

        calcularProducaoEstimada();
    });

    // Função para exibir data e hora atual no formato abreviado com segundos
    function exibirDataHora() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
        const ano = dataAtual.getFullYear();
        const horas = String(dataAtual.getHours()).padStart(2, '0');
        const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
        const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
        
        const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
        dataHoraElement.textContent = dataFormatada;
    }

    // Atualizando a produção estimada a cada segundo
    setInterval(calcularProducaoEstimada, 1000);

    // Atualizando a data e hora atual a cada segundo (incluindo os segundos)
    setInterval(exibirDataHora, 1000);
});
document.addEventListener("DOMContentLoaded", function() {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta");
    const producaoBaseSeca = document.getElementById("producao-base-seca");
    const producaoEstimada = document.getElementById("producao-estimada");
    const metaFaltanteBruta = document.getElementById("meta-faltante-bruta");
    const metaFaltanteBaseSeca = document.getElementById("meta-faltante-base-seca");

    const META_BRUTA = 22500;

    inputProducao.addEventListener("input", function() {
        let producaoAtual = parseFloat(inputProducao.value) || 0;
        let baseSeca = producaoAtual * 0.97; // Conversão para base seca

        producaoBruta.textContent = producaoAtual.toFixed(2) + " toneladas";
        producaoBaseSeca.textContent = baseSeca.toFixed(2) + " toneladas";

        // Cálculo da tonelada faltante para a meta
        let faltanteBruta = Math.max(META_BRUTA - producaoAtual, 0);
        let faltanteBaseSeca = Math.max((META_BRUTA * 0.97) - baseSeca, 0);

        metaFaltanteBruta.textContent = faltanteBruta.toFixed(2) + " toneladas";
        metaFaltanteBaseSeca.textContent = faltanteBaseSeca.toFixed(2) + " toneladas";
    });
});




