import { Data } from "../utils/managers/Data.js";

import { EVENTS } from "../utils/misc/eventsCallback.js";
import { DOM_ELEMENTS } from "../utils/misc/constElements.js";
import { RecipeCard } from "../utils/components/RecipeCard.js";

/**
 * @class Interface
 * @classdesc Librairie de fonction permettant de gérer l'affichage des éléments d'interface
 * @hideconstructor
 */
export class Interface {

    static #initAllRecipesCard() {
        const defaultRecipes = Data.getPartialObjectForRecipes();
        this.displayRecipes(defaultRecipes);
    }

    static #initAllDropdownList() {
        const defaultRecipes = Data.getAllRecipes();
        this.displayDropdown(defaultRecipes);
    }

    static #initFormsCancel() {
        DOM_ELEMENTS.Forms.all.forEach( form => {
            form.addEventListener('submit', EVENTS.Forms.cancelFormAction);
        });
    }

    static #initInputSearch() {
        DOM_ELEMENTS.Forms.recipe.addEventListener('keyup', EVENTS.Inputs.attachEventSearch)
    }

    static initAll() {
        Interface.defaultDisplay();
        Interface.#initFormsCancel();
        Interface.#initInputSearch();
    }
    
    static defaultDisplay() {
        Interface.#initAllRecipesCard();
        Interface.#initAllDropdownList();
    }

    /**
     * Afficher les cartes de recettes dans le conteneur qui lui est assignée dans le HTML
     * @param {Array<Recipe>} recipes Tableau de recettes
     */
    static displayRecipes(recipes) {
        const CONTAINER = DOM_ELEMENTS.Containers.recipes;
        // Clear all recipes
        CONTAINER.innerHTML = '';

        recipes.forEach( recipesInfos => {
            const cardModel = new RecipeCard(recipesInfos);
            const resultedCard = cardModel.create();
            CONTAINER.appendChild(resultedCard);
        });
    }

    /**
     * Affiche les éléments de listes cliquables dans les buttons Dropdowns
     * @param {Array<Recipe>} recipes Tableau de recettes
     */
    static displayDropdown(recipes) {
        const objectLists = Data.getObjectInformationsForDataTags(recipes);

        Data.dropdownLists.ingredients.createList(objectLists.ingredientsTextTags);
        Data.dropdownLists.equipments.createList(objectLists.equipmentsTextTags);
        Data.dropdownLists.ustensils.createList(objectLists.ustensilsTextTags);
    }

    /**
     * Appel les fonctions statiques permettent de recharger les résultats du tableau de recettes trouvées
     * @param {Array<Recipe>} recipes Tableau de recettes
     */
    static refreshInterface(recipes) {
        this.displayRecipes(recipes);
        this.displayDropdown(recipes);
    }

    /**
     * Affiche le message d'erreur pour signaler qui il n'y a aucune recherche correspondence.
     */
    static noRecipesCorresponding() {
        const CONTAINER = DOM_ELEMENTS.Containers.recipes;
        CONTAINER.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    }
}