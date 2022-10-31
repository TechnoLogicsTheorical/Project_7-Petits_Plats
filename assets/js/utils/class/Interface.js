import * as Elements from "../constElements.js";

import { Recipe } from "../class/Recipe.js";

const InternalFunctions = {
    createCards(datas) {
        datas.forEach( recipeData => {
            const cardModel = new Recipe(recipeData);
            const cardElement = cardModel.createCard();
            this.displayCardRecipe(cardElement);
        });
    },
    displayCardRecipe(cardElement) {
        Elements.recipeContainer.appendChild(cardElement);
    },
    clearRecipeContainer() {
        Elements.recipeContainer.innerHTML = '';
    },
}

export class Interface {

    static init(data) {
        // Créer les cartes contenant les informations de recherche ...
        InternalFunctions.createCards(data);
    }

    static displayNewRecipes(dataProviding) {
        InternalFunctions.clearRecipeContainer();
        InternalFunctions.createCards(dataProviding);
    }

    static showNotFindRecipe() {
        Elements.recipeContainer.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    }

    static displayDefaultRecipes(dataProviding) {
        InternalFunctions.clearRecipeContainer();
        InternalFunctions.createCards(dataProviding);
    }
}