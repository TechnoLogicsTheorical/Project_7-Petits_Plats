import * as Elements from "../constElements.js";

import { Recipe } from "../class/Recipe.js";
import { Data } from "../class/DataManager.js";

const InternalFunctions = {
    createCards(datas = Data.getAllRecipes()) {
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
        listData.sort();
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
    createDropdownListsElements(formattedObjectLists) {
        const ingredientElements = this.createElementsList(formattedObjectLists.ingredients, 'ingredient');
        const equipmentElements = this.createElementsList(formattedObjectLists.equipments, 'equipment');
        const ustensilElements = this.createElementsList(formattedObjectLists.ustensils, 'ustensil');

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
    },
}

export class Interface {

    static init(data) {
        InternalFunctions.createCards(data);
        // Lancer la création des dropdown listes par défault
        const allDropdownList = Data.getAllListsDropdownData(data);
        this.displayDropdownLists(allDropdownList);
    }

    static displayNewRecipes(dataProviding) {
        InternalFunctions.clearRecipeContainer();
        InternalFunctions.createCards(dataProviding);
        const allDropdownList = Data.getAllListsDropdownData(dataProviding);
        this.displayDropdownLists(allDropdownList);
    }

    static showNotFindRecipe() {
        Elements.recipeContainer.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
        InternalFunctions.clearDropdownLists();
    }

    static displayDefaultRecipes() {
        InternalFunctions.clearRecipeContainer();
        InternalFunctions.createCards();
        const allDropdownList = Data.getAllListsDropdownData();
        this.displayDropdownLists(allDropdownList);
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