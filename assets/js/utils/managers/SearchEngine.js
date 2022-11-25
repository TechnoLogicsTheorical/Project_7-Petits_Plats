import { Data } from "../managers/Data.js";
import { Interface } from "../Interface.js";

/**
 * Objet static s'occupant du stockage des resultats de recherche
 */
export class Results {
    /**
     * Données de recherche stockées
     * @type {{principal: null, second: null}}
     * @private
     */
    static _data = {
        principal: null,
        second: null,
    }

    /**
     * Fonction renvoyant les résultats de recherche d'un axe de recherche
     * @param type {string} Chaine de caractère ciblant le quelle des axes de recherche
     * @returns {Error|null} Le tableau de recettes
     */
    static get(type) {
        switch (type) {
            case 'principal':
                return this._data.principal;
                break;
            case 'second':
                return this._data.second;
                break;
            default:
                return new Error('Nonce type called by ' + type);
        }
    }

    /**
     * Fonction qui permet de stocker le résultat d'un axe de recherche
     * @param type {string} Chaine de caractère ciblant le quelle des axes de recherche
     * @param result {[({})]} Tableau de recettes trouvées
     */
    static store(type, result) {
        switch (type) {
            case 'principal':
                this._data.principal = result;
                break;
            case 'second':
                this._data.second = result;
                break;
            default:
                return console.error('The type data is not good...');
        }
    }

    /**
     * Efface les données de recherche stockées
     */
    static clearAll() {
        this._data.principal = null;
        this._data.second = null;
    }
}

export class SearchEngine {

    static proceedPrincipalSearch(typedUserValue) {
        const filteredRecipes = Data.getFilteredRecipes(typedUserValue);

        if (filteredRecipes != null) {
            Results.store('principal', filteredRecipes);
            Interface.refreshInterface(filteredRecipes);
            this.proceedSecondSearch();
        } else {
            Interface.noRecipesCorresponding();
        }
    }

    static proceedSecondSearch() {
        // On vérifie d'abord si un des tags sont existant dans les tableaux de stockages
        const haveTags = Data.checkIfTagsExists();
        const haveMainSearchResults = Results.get('principal');
        const haveSecondSearchResults = Results.get('second');

        if ( !haveTags ) {
            // Si y a pas de tags on arrete des maintenant pour eviter d'executer les autres processus
            console.log('Aucun tag à rechercher !')
            return;
        }

        if ( haveMainSearchResults ) {
            if ( haveSecondSearchResults !== null ) {
                const gettingFilteringByExistResults = Data.getSpecialFilteredRecipes(haveSecondSearchResults);
                Interface.refreshInterface(gettingFilteringByExistResults);
                Results.store('second', gettingFilteringByExistResults);
                return;
            }

            const currentRecipes = Results.get('second') || Data.getAllRecipes();
            const newFilteredRecipes = Data.getSpecialFilteredRecipes(currentRecipes);
            Interface.refreshInterface(newFilteredRecipes);
            Results.store('second', newFilteredRecipes);
            return;
        } else if ( haveTags ) {
            const currentRecipes = Results.get('second') || Data.getAllRecipes();
            const newFilteredRecipes = Data.getSpecialFilteredRecipes(currentRecipes);
            Interface.refreshInterface(newFilteredRecipes);
            Results.store('second', newFilteredRecipes);
            return;
        }
    }

    static refreshAfterRemoved() {
        Results.store('second', null);
        const currentRecipes = Results.get('principal');

        if ( (currentRecipes != null) && (Data.checkIfTagsExists() === false) ) {
            Interface.refreshInterface(currentRecipes);
            return;
        }

        if (Data.checkIfTagsExists()) {
            this.proceedSecondSearch();
            return;
        }
        Interface.defaultDisplay();
    }
}