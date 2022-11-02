import * as Elements from "../constElements.js";

import { Recipe } from "../class/Recipe.js";
import { Data } from "../class/DataManager.js";
import { EventManager } from "../class/EventManager.js";

const InternalFunctions = {
    CardView: {
        createCards(recipesData) {
            recipesData.forEach( recipeData => {
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
    },
    DropdownListsView: {
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
            EventManager.attachItemListEventToAddTag(itemElement);

            return itemElement;
        },
        createDropdownListsElements(formattedObjectLists) {
            const ingredientElements = this.createElementsList(formattedObjectLists.ingredients, 'ingredient');
            const equipmentElements = this.createElementsList(formattedObjectLists.equipments, 'equipment');
            const ustensilElements = this.createElementsList(formattedObjectLists.ustensils, 'ustensil');

            Data.allListsElements = {
                ingredientElements,
                equipmentElements,
                ustensilElements,
            }

            return Data.allListsElements;
        },
        clearDropdownLists() {
            Elements.ingredientsList.innerHTML = "";
            Elements.equipmentsList.innerHTML = "";
            Elements.ustensilsList.innerHTML = "";
        },
    },
    TagView: {
        createTagElement(textValue, stringClassName) {
            const tagElementContainer = document.createElement('div');
            tagElementContainer.className = 'filter-element ' + stringClassName;

            const textContentValue = document.createElement('span');
            textContentValue.className = 'title';
            textContentValue.textContent = textValue;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.innerHTML = `<img src="assets/img/icons/crossAround.svg" alt="Supprimer l'élément">`;

            tagElementContainer.appendChild(textContentValue);
            tagElementContainer.appendChild(deleteButton);

            return tagElementContainer;
        },
    }
}

export class Interface {

    static init() {
        this.displayDefaultRecipes();
    }

    static displayNewRecipes(filteredRecipes) {
        InternalFunctions.CardView.clearRecipeContainer();
        InternalFunctions.CardView.createCards(filteredRecipes);

        const allDropdownList = Data.getAllListsDropdownData(filteredRecipes);
        this.displayNewDropdownLists(allDropdownList);
    }

    static showNotFindRecipe() {
        Elements.recipeContainer.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
        InternalFunctions.DropdownListsView.clearDropdownLists();
    }

    static displayDefaultRecipes() {
        InternalFunctions.CardView.clearRecipeContainer();

        const defaultRecipes = Data.getAllRecipes();
        InternalFunctions.CardView.createCards(defaultRecipes);

        this.displayDefaultDropdownList();
    }

    static displayDefaultDropdownList() {
        const defaultRecipes = Data.getAllRecipes();
        const allDropdownList = Data.getAllListsDropdownData(defaultRecipes);
        this.displayNewDropdownLists(allDropdownList);
    }

    static displayNewDropdownLists(completedSeparatedListInObject) {
        InternalFunctions.DropdownListsView.clearDropdownLists();
        const allElementsObjects = InternalFunctions.DropdownListsView.createDropdownListsElements(completedSeparatedListInObject);

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

    static showDropdownListButton(currentElement) {
        let boolStringNotVisible = currentElement.ariaHidden;

        if (boolStringNotVisible === 'true') {
            currentElement.ariaHidden = 'false';
        }
    }

    static refreshDropdownList(currentList, newDataListElements) {
        if (currentList === Elements.ingredientsList) {
            Elements.ingredientsList.innerHTML = '';

            newDataListElements.forEach( itemElement => {
                Elements.ingredientsList.appendChild(itemElement);
            });
        } else if (currentList === Elements.equipmentsList) {
            Elements.equipmentsList.innerHTML = '';

            newDataListElements.forEach( itemElement => {
                Elements.equipmentsList.appendChild(itemElement);
            });
        } else if (currentList === Elements.ustensilsList) {
            Elements.ustensilsList.innerHTML = '';

            newDataListElements.forEach( itemElement => {
                Elements.ustensilsList.appendChild(itemElement);
            });
        }
    }

    static showNotFindElement(currentList) {
        currentList.innerHTML = 'Aucun éléments ne correspond à la recherche !';
    }

    static showTagContainer() {
        const tagContainer = Elements.filterContainer;
        let stringBoolNotVisible = tagContainer.ariaHidden;

        if (stringBoolNotVisible === 'true') {
            Elements.filterContainer.ariaHidden = 'false';
        }
    }

    static displayNewTag(textValue, typeItemElement) {
        const tagElement = InternalFunctions.TagView.createTagElement(textValue, typeItemElement);

        Interface.showTagContainer();
        Elements.filterContainer.appendChild(tagElement);
    }
}