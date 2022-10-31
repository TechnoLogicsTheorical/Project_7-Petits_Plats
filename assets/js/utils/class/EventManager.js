import * as Elements from "../constElements.js";

import { Data } from "../class/DataManager.js";
import { Interface } from "../class/Interface.js";

function preventDefaultForms() {
    Elements.allForms.forEach( form => {
        form.addEventListener('submit', (e) => e.preventDefault());
    });
}

function attachInputSearchBar() {
    Elements.recipeSearchBar.addEventListener('input', (e) => {
        const typedUserValue = e.target.value;
        if ( typedUserValue.length >= 3 ) Data.submitedDataInputSearchBarValue(typedUserValue);
        else Interface.displayDefaultRecipes();
    });
}

function attachDropdownArrowIconClicked() {
    Elements.allDropdownButtons.forEach( button => {
        button.addEventListener('click', (e)=> {
            const clickedListElement = event.target.offsetParent.nextElementSibling;
            let boolStringNotVisible = clickedListElement.ariaHidden;

            if (boolStringNotVisible === 'true') {
                clickedListElement.ariaHidden = 'false';
            }
            else if (boolStringNotVisible === 'false') {
                clickedListElement.ariaHidden = 'true';
            }
        });
    });
}

function attachDropdownInputSearch() {
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
            let boolStringNotVisible = currentList.ariaHidden;

            if (boolStringNotVisible === 'true') {
                currentList.ariaHidden = 'false';
            }


        });
    });
}

export class EventManager {

    static init() {
       preventDefaultForms();
       attachInputSearchBar();
       attachDropdownArrowIconClicked();
       attachDropdownInputSearch();
    }
}

