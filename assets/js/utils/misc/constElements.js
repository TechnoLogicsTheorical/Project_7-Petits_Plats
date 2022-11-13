export const DOM_ELEMENTS = {
    // All Containers
    Containers: {
        recipes: document.querySelector('#RECIPES'),
        actives_filters: document.querySelector('#ACTIVE_FILTERS'),
    },

    Forms: {
        all: document.querySelectorAll('form'),
        recipe: document.querySelector('#recipesSearch'),
    },

    // Form Inputs Addictive Search
    Inputs: {
        mainBar: document.querySelector('#recipesSearch'),
        ingredient: document.querySelector('#ingredientsSearch input'),
        equipment: document.querySelector('#equipmentsSearch input'),
        ustensil: document.querySelector('#ustensilsSearch input'),
    },

    DropdownLists: {
        ingredient: document.querySelector('#ingredientsList'),
        equipment: document.querySelector('#equipmentsList'),
        ustensil: document.querySelector('#ustensilsList'),
    },

    Buttons: {
        all_dropdowns: document.querySelectorAll('.arrow-icon'),
    }
}