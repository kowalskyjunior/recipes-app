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
    const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

    async function fetchRecipes() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            displayRecipes(data.meals);
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
            recipesContainer.innerHTML = '<p class="error-message">Não foi possível carregar as receitas. Tente novamente mais tarde.</p>';
        }
    }

    function displayRecipes(recipes) {
        if (!recipes || recipes.length === 0) {
            recipesContainer.innerHTML = '<p class="info-message">Nenhuma receita encontrada. Tente outra busca!</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            
            // Traduzindo o nome da receita
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

    fetchRecipes();
});