// --- Tradução simulada da API ---
const translations = {
    'Chicken': 'Frango',
    'Curry': 'Caril',
    'Soup': 'Sopa',
    'Tuna': 'Atum',
    'Beef': 'Carne',
    'Seafood': 'Frutos do Mar',
    'Salmon': 'Salmão',
    'Pizza': 'Pizza',
    'Burger': 'Hambúrguer',
    'Pasta': 'Massa',
    'Pork': 'Porco'
};

function translateText(text) {
    if (!text) return '';
    let translated = text;
    for (const key in translations) {
        translated = translated.replace(new RegExp(key, 'gi'), translations[key]);
    }
    return translated;
}

// ---------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipes-container');
    const searchInput = document.getElementById('search-input');
    
    // Armazena o temporizador para a função de debounce
    let debounceTimer;

    // Função principal para buscar e exibir as receitas
    async function fetchRecipes(query = '') {
        recipesContainer.innerHTML = '<p class="loading-message">Carregando receitas...</p>';
        
        // A API TheMealDB precisa que o termo de busca seja em inglês
        const translatedQuery = Object.keys(translations).find(key => 
            translations[key].toLowerCase() === query.toLowerCase()
        ) || query;

        let meals = [];

        try {
            if (translatedQuery) {
                // Busca por termo de pesquisa
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${translatedQuery}`);
                const data = await response.json();
                meals = data.meals;
            } else {
                // Carrega uma variedade de pratos aleatórios para a página inicial
                const initialLetters = ['a', 'b', 'c', 'd', 'e'];
                const fetchPromises = initialLetters.map(letter => 
                    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                );
                
                const responses = await Promise.all(fetchPromises);
                const results = await Promise.all(responses.map(res => res.json()));

                // Combina os resultados, garantindo que não haja duplicatas
                const combinedMeals = new Map();
                results.forEach(result => {
                    if (result.meals) {
                        result.meals.forEach(meal => {
                            if (!combinedMeals.has(meal.idMeal)) {
                                combinedMeals.set(meal.idMeal, meal);
                            }
                        });
                    }
                });
                meals = Array.from(combinedMeals.values());
            }

            displayRecipes(meals, query);

        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
            recipesContainer.innerHTML = '<p class="error-message">Não foi possível carregar as receitas. Verifique sua conexão.</p>';
        }
    }

    // Função para exibir os resultados
    function displayRecipes(recipes, query) {
        recipesContainer.innerHTML = ''; // Limpa os resultados anteriores
        
        if (!recipes || recipes.length === 0) {
            recipesContainer.innerHTML = `<p class="info-message">Nenhuma receita encontrada para "${query}". Tente outro termo!</p>`;
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            
            const translatedTitle = translateText(recipe.strMeal);

            recipeCard.innerHTML = `
                <a href="recipe-detail.html?id=${recipe.idMeal}">
                    <img src="${recipe.strMealThumb}" alt="${translatedTitle}">
                    <div class="recipe-card-content">
                        <h3>${translatedTitle}</h3>
                    </div>
                </a>
            `;
            recipesContainer.appendChild(recipeCard);
        });
    }

    // --- Lógica de Busca Instantânea ---
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const query = searchInput.value.trim();
        
        debounceTimer = setTimeout(() => {
            fetchRecipes(query);
        }, 300); // Espera 300ms depois que o usuário para de digitar para pesquisar
    });

    // Carrega as receitas iniciais ao carregar a página
    fetchRecipes();
});