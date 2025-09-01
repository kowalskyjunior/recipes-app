# Explorador de Receitas

Uma aplicação web simples e elegante para listar e visualizar receitas culinárias. Desenvolvida utilizando apenas **HTML**, **CSS** e **JavaScript**, a aplicação busca receitas de uma API externa e as exibe em uma interface limpa e moderna.

## Visão Geral do Projeto

O objetivo deste projeto é demonstrar o uso de tecnologias web essenciais para criar uma aplicação dinâmica e interativa sem a necessidade de frameworks ou bibliotecas complexas. O site consiste em duas páginas principais:

1.  **Tela Inicial:** Exibe uma grade de receitas em destaque com imagens e nomes, proporcionando uma navegação visualmente agradável.
2.  **Tela de Detalhes:** Apresenta todas as informações de uma receita selecionada, incluindo uma imagem em destaque, categoria, área, ingredientes em uma lista e o modo de preparo passo a passo.

A tradução de todo o conteúdo da API (nomes, ingredientes e instruções) é feita via um script JavaScript, garantindo que a aplicação seja totalmente em português.

---

## Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do projeto.
* **CSS3:** Estilização profissional e responsiva, com uso de Flexbox e Grid para o layout.
* **JavaScript (ES6):** Responsável por buscar os dados da API, manipular o DOM (Document Object Model) e gerenciar a navegação entre as páginas.
* **API:** A aplicação utiliza a API pública **TheMealDB** (https://www.themealdb.com/api.php) para obter os dados das receitas.

---

## Estrutura de Arquivos

A aplicação segue uma estrutura de pastas organizada para facilitar a manutenção e o entendimento do código.

/receitas-app/
|-- /css/
|   |-- style.css          (Folha de estilo principal)
|-- /js/
|   |-- main.js            (Lógica para a página inicial)
|   |-- recipe.js          (Lógica para a página de detalhes da receita)
|-- index.html             (Página inicial com a lista de receitas)
|-- recipe-detail.html     (Página para exibir os detalhes da receita)
|-- README.md              (Este arquivo)


---

## Como Usar

### Pré-requisitos

Você não precisa de nenhum software especial ou servidor para rodar este projeto. Basta um navegador web moderno (Google Chrome, Firefox, Safari, Edge, etc.).

### Instalação e Execução

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/kowalskyjunior/recipes-app](https://github.com/kowalskyjunior/recipes-app.git)
    ```
    *Se você não tem o Git, pode simplesmente baixar o arquivo ZIP do repositório.*

2.  **Abra os Arquivos:**
    * Navegue até a pasta `explorador-de-receitas`.
    * Abra o arquivo `index.html` diretamente no seu navegador.

A aplicação irá carregar automaticamente a lista de receitas na tela inicial. Ao clicar em uma receita, você será redirecionado para a página de detalhes, onde verá todas as informações.

---

## Funcionalidades Chave

* **Design Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela, desde desktops até smartphones.
* **Layout de Grade:** A tela inicial utiliza um layout de grade dinâmico para exibir os cartões de receita de forma organizada e atraente.
* **Carregamento de Dados Dinâmico:** As receitas são carregadas em tempo real da API, garantindo que o conteúdo esteja sempre atualizado.
* **Navegação entre Páginas:** A aplicação utiliza URLs com parâmetros (`?id=`) para identificar e carregar a receita correta na página de detalhes.
* **Tradução Integrada:** O conteúdo da API é traduzido do inglês para o português usando um script, proporcionando uma experiência de usuário totalmente em português.

---

## Autoria

* **Desenvolvido por: Kowalsky Junior** 

---

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
