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
        else Interface.displayDefaultRecipes(Data.getAllRecipes());
    });
}

export class EventManager {

    static init() {
       preventDefaultForms();
       attachInputSearchBar();
    }
}