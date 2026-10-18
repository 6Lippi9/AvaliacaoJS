
const API_URL = "https://tech4produtos.fly.dev/produtos";

async function carregarDetalhes() {
    const area = document.getElementById("detalhes-produto");

    // Obtém o ID do produto pela URL
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!area) {
        console.error("Elemento detalhes-produto não encontrado.");
        return;
    }

    if (!id) {
        area.textContent =
            "Nenhum produto selecionado. Volte ao cardápio e escolha um prato.";
        return;
    }

    try {
        // Consulta a API para buscar o produto pelo ID
        const resposta = await fetch(
            `${API_URL}/${encodeURIComponent(id)}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível encontrar esse produto.");
        }

        const dados = await resposta.json();

        // Aceita a resposta como objeto ou dentro da propriedade data
        const produto = dados.data ?? dados;

        area.replaceChildren();

        // Imagem do prato
        const imagem = document.createElement("img");
        imagem.src = produto.imagem || "";
        imagem.alt = produto.nome || "Imagem do prato";
        imagem.className = "imagem-detalhes";

        imagem.onerror = function () {
            this.style.display = "none";
        };

        // Nome do prato
        const nome = document.createElement("h2");
        nome.textContent = produto.nome || "Produto";

        // Restaurante
        const restaurante = document.createElement("p");
        restaurante.textContent =
            "Restaurante: " + (produto.restaurante || "5Estrelas");

        // Tipo de produto
        const tipo = document.createElement("p");
        tipo.textContent =
            "Produto: " + (produto.produto || "Não informado");

        // Descrição
        const descricao = document.createElement("p");
        descricao.textContent =
            produto.descricao || "Descrição não disponível.";

        // Adiciona as informações à página
        area.append(
            imagem,
            nome,
            restaurante,
            tipo,
            descricao
        );

    } catch (erro) {
        console.error("Erro ao carregar os detalhes:", erro);

        area.textContent =
            "Não foi possível carregar os detalhes do produto. Tente novamente.";
    }
}

document.addEventListener("DOMContentLoaded", carregarDetalhes);
