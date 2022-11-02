import * as Elements from "../constElements.js";

import { Data } from "../class/DataManager.js";
import { Interface } from "../class/Interface.js";


const InternalFunctions = {
    attachDropdownInputSearch() {
        const inputAddictiveSearch = [
            Elements.ingredientsInput,
            Elements.equipmentsInput,
            Elements.ustensilsInput,
        ];

        inputAddictiveSearch.forEach( input => {
            input.addEventListener('keyup', (e) => {
                const inputElement = e.target;
                const typedUserValue = inputElement.value;
                // Récuperer la liste des élements actuelle dans la liste
                // Ouvrir la liste si elle n'est pas ouverte ...
                const currentList = inputElement.offsetParent.nextElementSibling;

                if (typedUserValue.length > 0 ) {
                    Interface.showDropdownListButton(currentList);
                    // Filtrer les résultats
                    let filteredListElements = [];

                    if (currentList === Elements.ingredientsList) {
                        filteredListElements = Data.allListsElements.ingredientElements.filter(listElement => {
                            return (
                                listElement.textContent
                                    .toLowerCase()
                                    .includes(typedUserValue.toLowerCase())
                            )
                        });
                    } else if (currentList === Elements.equipmentsList) {
                        filteredListElements = Data.allListsElements.equipmentElements.filter(listElement => {
                            return (
                                listElement.textContent
                                    .toLowerCase()
                                    .includes(typedUserValue.toLowerCase())
                            )
                        });
                    } else if (currentList === Elements.ustensilsList) {
                        filteredListElements = Data.allListsElements.ustensilElements.filter(listElement => {
                            return (
                                listElement.textContent
                                    .toLowerCase()
                                    .includes(typedUserValue.toLowerCase())
                            )
                        });
                    }

                    if ( filteredListElements.length === 0) {
                        Interface.showNotFindElement(currentList);
                    }
                    else Interface.refreshDropdownList(currentList, filteredListElements);
                }
                if (e.key === 'Backspace') {
                    inputElement.value = '';
                    if (Data.resultRecipesWithSearchBar != null) {
                        console.log(Data.resultRecipesWithSearchBar)
                        Interface.displayNewDropdownLists(Data.resultRecipesWithSearchBar);
                    }
                    Interface.displayDefaultDropdownList();
                }
            });
        });
    },
    attachDropdownArrowIconClicked() {
        Elements.allDropdownButtons.forEach( button => {
            button.addEventListener('click', (e)=> {
                const clickedListElement = e.target.offsetParent.nextElementSibling;
                let boolStringNotVisible = clickedListElement.ariaHidden;

                if (boolStringNotVisible === 'true') {
                    clickedListElement.ariaHidden = 'false';
                }
                else if (boolStringNotVisible === 'false') {
                    clickedListElement.ariaHidden = 'true';
                }
            });
        });
    },
    attachInputSearchBar() {
        Elements.recipeSearchBar.addEventListener('input', (e) => {
            const typedUserValue = e.target.value;
            if ( typedUserValue.length >= 3 ) Data.submittedDataInputSearchBarValue(typedUserValue);
            else Interface.displayDefaultRecipes();
        });
    },
    preventDefaultForms() {
        Elements.allForms.forEach( form => {
            form.addEventListener('submit', (e) => e.preventDefault());
        });
    },
}

//TODO: Créer un event lorsque un éléménts de la liste est clickée

export class EventManager {

    static init() {
        InternalFunctions.preventDefaultForms();
        InternalFunctions.attachInputSearchBar();
        InternalFunctions.attachDropdownArrowIconClicked();
        InternalFunctions.attachDropdownInputSearch();
    }

    static attachItemListEventToAddTag(itemListElement) {
        itemListElement.addEventListener('click', (e) => {
            const clickedElement = e.target;
            const textValue = clickedElement.textContent;
            const typeItemElement = clickedElement.dataset.item_type;

            Data.addTagToList(textValue, typeItemElement);
        });
    }

    static attachRemoveTagToList(deleteButtonElement) {
        deleteButtonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const clickedElement = e.target;
            const tagElement = clickedElement.parentElement.parentElement;
            const tagElementValue = tagElement.textContent;
            const typeElement = tagElement.classList[1];

            Interface.removeTagElement(tagElement);
            Data.removeTagToList(tagElementValue, typeElement)
        });
    }
}

