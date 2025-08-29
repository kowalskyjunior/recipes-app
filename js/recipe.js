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
    'Pork': 'Porco',
    'Rice': 'Arroz',
    'Garlic': 'Alho',
    'Salt': 'Sal',
    'Pepper': 'Pimenta',
    'Water': 'Água',
    'Sugar': 'Açúcar',
    'Lemon': 'Limão',
    'Oil': 'Óleo',
    'Fry': 'Frite',
    'Mix': 'Misture',
    'Cook': 'Cozinhe',
    'Bake': 'Asse',
    'minutes': 'minutos',
    'until': 'até que',
    'then': 'então',
    'serve': 'sirva',
    'Add': 'Adicione',
    'Stir': 'Mexa',
    'Heat': 'Aqueça',
    'Cut': 'Corte',
    'Chop': 'Pique',
    'slice': 'fatia',
    'boil': 'ferva',
    'and': 'e',
    'the': 'o',
    'a': 'um',
    'in': 'em',
    'to': 'para'
};

const fullInstructionTranslations = {
    'Heat a frying pan and add the oil. Add chopped onions and garlic and cook until soft.': 'Aqueça uma frigideira e adicione o óleo. Adicione a cebola e o alho picados e cozinhe até que fiquem macios.',
    'Add the chicken and fry until golden brown.': 'Adicione o frango e frite até dourar.',
    'Mix in the curry powder, coconut milk and chicken stock.': 'Misture o pó de caril, o leite de coco e o caldo de galinha.',
    'Bring to a boil then reduce heat and simmer for 20 minutes.': 'Leve para ferver, depois reduza o fogo e cozinhe por 20 minutos.',
    'Season with salt and pepper to taste and serve with rice.': 'Tempere com sal e pimenta a gosto e sirva com arroz.'
};

function translateText(text) {
    if (!text) return '';
    let translated = text;
    // Tradução de instruções completas
    if (fullInstructionTranslations[text]) {
        return fullInstructionTranslations[text];
    }
    // Tradução de palavras-chave
    for (const key in translations) {
        translated = translated.replace(new RegExp(`\\b${key}\\b`, 'gi'), translations[key]);
    }
    return translated;
}

// ---------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        document.getElementById('recipe-detail').innerHTML = '<p class="error-message">Receita não encontrada. Por favor, volte para a lista.</p>';
        document.getElementById('recipe-name').textContent = 'Receita Não Encontrada';
    }

    async function fetchRecipeDetails(id) {
        const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const recipe = data.meals[0];
            if (recipe) {
                displayRecipeDetails(recipe);
            } else {
                document.getElementById('recipe-detail').innerHTML = '<p class="error-message">Receita não encontrada. Por favor, volte para a lista.</p>';
                document.getElementById('recipe-name').textContent = 'Receita Não Encontrada';
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes da receita:', error);
            document.getElementById('recipe-detail').innerHTML = '<p class="error-message">Não foi possível carregar os detalhes da receita. Tente novamente mais tarde.</p>';
            document.getElementById('recipe-name').textContent = 'Erro de Carregamento';
        }
    }

    function displayRecipeDetails(recipe) {
        document.getElementById('recipe-name').textContent = translateText(recipe.strMeal);
        document.getElementById('recipe-image').src = recipe.strMealThumb;
        document.getElementById('recipe-image').alt = translateText(recipe.strMeal);
        document.getElementById('recipe-category').textContent = translateText(recipe.strCategory);
        document.getElementById('recipe-area').textContent = translateText(recipe.strArea);

        const instructionsText = recipe.strInstructions;
        const instructionsListContainer = document.querySelector('.recipe-instructions-block');

        if (instructionsText) {
            // Divide o texto em frases para uma tradução mais precisa
            const instructionsArray = instructionsText.split(/(?<=\.)\s+|-/).filter(step => step.trim() !== '');
            const ol = document.createElement('ol');
            ol.classList.add('instructions-list');

            instructionsArray.forEach(step => {
                const li = document.createElement('li');
                li.textContent = translateText(step.trim());
                ol.appendChild(li);
            });

            const existingInstructions = instructionsListContainer.querySelector('.instructions-text');
            if (existingInstructions) {
                existingInstructions.replaceWith(ol);
            } else {
                instructionsListContainer.appendChild(ol);
            }
        } else {
            document.getElementById('recipe-instructions-text').textContent = 'Instruções de preparo não disponíveis.';
        }

        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
                const li = document.createElement('li');
                // Traduzindo ingredientes e medidas
                const translatedIngredient = translateText(ingredient);
                const translatedMeasure = translateText(measure);
                li.textContent = `${translatedMeasure} ${translatedIngredient}`;
                ingredientsList.appendChild(li);
            }
        }
    }
});