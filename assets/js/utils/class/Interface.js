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
    createElementsList(listData, listCategory) {
        // On veut créer des éléments DOM, utilisable dans d'autres fonctions
        // On possède actuellement dans dropdownListData, toutes les données concernant les recettes pour pouvoir génerer les éléments de lists dans un object avec les noms de propriètes
        return listData.map( data => {
            return this.createItemListElement(data, listCategory);
        });
    },
    createItemListElement(data, itemType) {
        const itemElement = document.createElement('li');
        itemElement.dataset.item_type = itemType;
        itemElement.innerHTML = data;

        return itemElement;
    },
    createDropdownListsElements(dropdownListData) {
        const ingredientElements = this.createElementsList(dropdownListData.ingredients, 'ingredient');
        const equipmentElements = this.createElementsList(dropdownListData.equipments, 'equipment');
        const ustensilElements = this.createElementsList(dropdownListData.ustensils, 'ustensil');

        return {
            ingredientElements,
            equipmentElements,
            ustensilElements,
        }
    },
    clearDropdownLists() {
        Elements.ingredientsList.innerHTML = "";
        Elements.equipmentsList.innerHTML = "";
        Elements.ustensilsList.innerHTML = "";
    }
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

    static displayDropdownLists(allListsData) {
        InternalFunctions.clearDropdownLists();
        const allElementsObjects = InternalFunctions.createDropdownListsElements(allListsData);

        allElementsObjects.ingredientElements.forEach( elementItem => {
            Elements.ingredientsList.appendChild(elementItem);
        });

        allElementsObjects.equipmentElements.forEach( elementItem => {
            Elements.equipmentsList.appendChild(elementItem);
        });

        allElementsObjects.ustensilElements.forEach( elementItem => {
            Elements.ustensilsList.appendChild(elementItem);
        });
    }
}