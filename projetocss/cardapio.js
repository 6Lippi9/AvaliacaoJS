
const nomeDoRestaurante = "5Estrelas";

const API_URL =
    `https://tech4produtos.fly.dev/produtos/restaurante=${encodeURIComponent(nomeDoRestaurante)}`;

async function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");

    if (!lista) {
        console.error("Elemento lista-produtos não encontrado.");
        return;
    }

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API.");
        }

        const dados = await resposta.json();

        // Aceita uma lista direta ou uma lista dentro de "data"
        const listaProdutos = Array.isArray(dados)
            ? dados
            : Array.isArray(dados.data)
                ? dados.data
                : [];

        lista.replaceChildren();

        if (listaProdutos.length === 0) {
            lista.textContent = "Nenhum produto encontrado.";
            return;
        }

        listaProdutos.forEach((produto) => {
            // Identifica o produto pelo ID retornado pela API
            const id = produto.id ?? produto._id;

            const card = document.createElement("div");
            card.className = "card";

            const imagem = document.createElement("img");
            imagem.src = produto.imagem || "";
            imagem.alt = produto.nome || "Prato";

            imagem.onerror = function () {
                this.style.display = "none";
            };

            const informacoes = document.createElement("div");
            informacoes.className = "card-info";

            const nome = document.createElement("h3");
            nome.textContent = produto.nome || produto.produto || "Produto";

            const descricao = document.createElement("p");
            descricao.textContent = produto.descricao || "Sem descrição.";

            const tipo = document.createElement("p");
            tipo.textContent = produto.produto || "";

            informacoes.append(nome, descricao, tipo);
            card.append(imagem, informacoes);

            // Cria o link para os detalhes do produto
            if (id !== undefined && id !== null) {
                const link = document.createElement("a");
                link.href = `detalhes.html?id=${encodeURIComponent(id)}`;
                link.className = "card-link";
                link.appendChild(card);

                lista.appendChild(link);
            } else {
                // Exibe o card mesmo se a API não retornar um ID
                lista.appendChild(card);
                console.warn("Produto sem ID:", produto);
            }
        });

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        lista.textContent =
            "Não foi possível carregar o cardápio. Tente novamente.";
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
