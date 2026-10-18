
function iniciarContagemRegressiva() {
    const contador = document.getElementById("contador");

    // Verifica se o contador existe na página
    if (!contador) {
        return;
    }

    function atualizarContador() {
        const agora = new Date();

        // Define a próxima meia-noite no horário local
        const meiaNoite = new Date(agora);
        meiaNoite.setHours(24, 0, 0, 0);

        // Calcula o tempo restante em segundos
        const tempoRestante = Math.max(
            0,
            Math.floor((meiaNoite.getTime() - agora.getTime()) / 1000)
        );

        // Converte o tempo restante em horas, minutos e segundos
        const horas = Math.floor(tempoRestante / 3600);
        const minutos = Math.floor((tempoRestante % 3600) / 60);
        const segundos = tempoRestante % 60;

        // Formata os números com dois dígitos
        const formatar = (valor) => String(valor).padStart(2, "0");

        contador.textContent =
            `${formatar(horas)}:${formatar(minutos)}:${formatar(segundos)}`;

        // Para o contador quando chegar a zero
        if (tempoRestante === 0) {
            clearInterval(intervalo);
        }
    }

    // Atualiza imediatamente e depois a cada segundo
    atualizarContador();

    const intervalo = setInterval(atualizarContador, 1000);
}

// Inicia o contador quando a página estiver carregada
document.addEventListener(
    "DOMContentLoaded",
    iniciarContagemRegressiva
);
