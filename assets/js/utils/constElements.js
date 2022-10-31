// All Container
const recipeContainer = document.querySelector('#RECIPES');
const filterContainer = document.querySelector('#ACTIVE_FILTERS');

// All Form Inputs
const allForms = document.querySelectorAll('form')
const recipeSearchBar = document.querySelector('#recipesSearch');

    // Form Inputs Addictive Search
const ingredientsInput = document.querySelector('#ingredientsSearch input');
const equipmentsInput = document.querySelector('#equipmentsSearch input');
const ustensilsInput = document.querySelector('#ustensilsSearch input');

// All Dropdown Lists
const ingredientsList = document.querySelector('#ingredientsList');
const equipmentsList = document.querySelector('#equipmentsList');
const ustensilsList = document.querySelector('#ustensilsList');

// All Dropdown Icon Buttons
const allDropdownButtons = document.querySelectorAll('.arrow-icon');

export {
    recipeContainer,
    filterContainer,

    recipeSearchBar,
    allForms,

    ingredientsInput,
    equipmentsInput,
    ustensilsInput,

    ingredientsList,
    equipmentsList,
    ustensilsList,

    allDropdownButtons,
};
