/**
 * Regroupe toutes les constantes des éléments constituant la page au sein d'un même objet afin de facilité l'accès
 * @property {Object} Containers Contient toutes les constantes correspondant aux conteneurs d'éléments sous-jacents
 * @property {HTMLDivElement} Containers.recipes Element contenant toutes les cartes de recettes affichées
 * @property {HTMLDivElement} Containers.actives_filters Element contenant toutes les étiquettes de filtres


 * @property {Object} Forms Contient toutes les constantes correspondant aux formulaires de saisies
 * @property {HTMLCollection} Forms.all Correspondant à un tableau d'éléments HTML contenant tous les formulaires
 * @property {HTMLFormElement} Forms.recipe Formulaire de saisie ayant le champ permettant de récupérer la valeur de recherche principale


 * @property {Object} Inputs Contient toutes les constantes correspondant aux champs de saisie
 * @property {HTMLInputElement} Inputs.mainBar Element de champ de saisie de texte, utilisée pour récupérer la requête de recherche
 * @property {HTMLInputElement} Inputs.ingredient Element de champ de saisie pour rechercher un ingrédient
 * @property {HTMLInputElement} Inputs.equipment Element de champ de saisie pour rechercher un équipement
 * @property {HTMLInputElement} Inputs.ustensil Element de champ de saisie pour rechercher un ustensile


 * @property {Object} DropdownLists Contient toutes les constantes liées aux listes contenant toutes les options de filtre
 * @property {HTMLUListElement} DropdownLists.ingredient Element de conteneur de liste ingrédient
 * @property {HTMLUListElement} DropdownLists.equipment Element de conteneur de liste équipement
 * @property {HTMLUListElement} DropdownLists.ustensil Element de conteneur de liste ustensile


 * @property {Object} Buttons Contient tous les boutons de l'interface
 * @property {HTMLCollection} Buttons.all_dropdowns Tableau de tous les boutons d'ouverture de menu des filtres
 */
export const DOM_ELEMENTS = {
    Containers: {
        recipes: document.querySelector('#RECIPES'),
        actives_filters: document.querySelector('#ACTIVE_FILTERS'),
    },
    Forms: {
        all: document.querySelectorAll('form'),
        recipe: document.querySelector('#recipesSearch'),
    },
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
};