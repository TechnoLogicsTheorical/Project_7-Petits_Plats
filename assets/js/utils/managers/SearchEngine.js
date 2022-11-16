import { Data } from "../managers/Data.js";
import { Interface } from "../Interface.js";

export class Results {
    static data = {
        principal: null,
        second: null,
    }

    static get(type) {
        switch (type) {
            case 'principal':
                return this.data.principal;
                break;
            case 'second':
                return this.data.second;
                break;
            default:
                return new Error('Nonce type called by ' + type);
        }
    }

    static emit(type, result) {
        switch (type) {
            case 'principal':
                this.data.principal = result;
                break;
            case 'second':
                this.data.second = result;
                break;
            default:
                return new Error('The type data is not good...');
        }
    }

    static clearAll() {
        this.data.principal = null;
        this.data.second = null;
    }
}

export class SearchEngine {

    static proceedPrincipalSearch(typedUserValue) {
        // console.log("J'entre dans la fonction proceed Principal")
        const filteredRecipes = Data.getFilteredRecipes(typedUserValue);

        if (filteredRecipes != null) {
            // console.log('La recherche donne d\'avoir des recettes filtrées alors on sauvegarde dans le resultat')
            Results.emit('principal', filteredRecipes);
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
                Results.emit('second', gettingFilteringByExistResults);
                return;
            }

            const currentRecipes = Results.get('second') || Data.getAllRecipes();
            const newFilteredRecipes = Data.getSpecialFilteredRecipes(currentRecipes);
            Interface.refreshInterface(newFilteredRecipes);
            Results.emit('second', newFilteredRecipes);
            return;
        } else if ( haveTags ) {
            const currentRecipes = Results.get('second') || Data.getAllRecipes();
            const newFilteredRecipes = Data.getSpecialFilteredRecipes(currentRecipes);
            Interface.refreshInterface(newFilteredRecipes);
            Results.emit('second', newFilteredRecipes);
            return;
        }
    }

    static refreshAfterRemoved() {
        Results.emit('second', null);
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