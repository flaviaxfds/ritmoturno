document.addEventListener("DOMContentLoaded", function() {
    const inputProducao = document.getElementById("input-producao");
    const producaoBruta = document.getElementById("producao-bruta");
    const producaoBaseSeca = document.getElementById("producao-base-seca");
    const meta = document.getElementById("meta");
    const ritmo = document.getElementById("ritmo");
    const producaoEstimada = document.getElementById("producao-estimada");

    const turnoInicio = new Date();
    turnoInicio.setHours(19, 0, 0, 0);  // 19:00h

    const turnoFim = new Date();
    turnoFim.setHours(6, 59, 0, 0);  // 06:59h do dia seguinte

    let producaoAtual = 0;

    // Função para calcular a produção estimada
    function calcularProducaoEstimada() {
        const horaAtual = new Date();
        const tempoRestante = (turnoFim - horaAtual) / (1000 * 60 * 60); // Tempo restante em horas

        const ritmoDeProducao = (producaoAtual / (horaAtual - turnoInicio) * (1000 * 60 * 60)); // Ritmo por hora

        const producaoFinal = ritmoDeProducao * tempoRestante; // Produção estimada até o fim do turno
        const producaoTotal = producaoFinal + producaoAtual;

        producaoEstimada.textContent = producaoTotal.toFixed(2) + " toneladas";
        
        // Ajustar a largura do elemento de acordo com a produção estimada
        const maxProdução = 3000; // Ajuste conforme necessário (exemplo: meta de produção)
        const porcentagem = (producaoTotal / maxProdução) * 100;

        // Atualizar a largura
        producaoEstimada.style.width = `${Math.min(porcentagem, 100)}%`; // Garante que não ultrapasse 100%
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

    // Atualizando a produção estimada a cada segundo
    setInterval(calcularProducaoEstimada, 1000);
// Função para atualizar a data e hora
function atualizarDataHora() {
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour12: false });

    document.getElementById("data-hora").textContent = `${dataFormatada} ${horaFormatada}`;
}

// Atualizar imediatamente e a cada segundo
atualizarDataHora();
setInterval(atualizarDataHora, 1000);

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

