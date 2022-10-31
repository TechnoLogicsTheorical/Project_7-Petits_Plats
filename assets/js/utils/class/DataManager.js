import {recipes} from "../../data/recipes.js";
import {Interface} from "../class/Interface.js";

const InternalFunctions = {
    getFilteredRecipes(checkValue) {
        return recipes.filter(currentRecipe => {
            return (
                currentRecipe.name.toLowerCase().includes(checkValue)
                || currentRecipe.description.toLowerCase().includes(checkValue)
                || currentRecipe.ingredients.some((ingredient) => {
                    ingredient.ingredient.toLowerCase().includes(checkValue)
                })
            )
        });
    },
    getUniqueData(dataIncoming) {
        return [...new Set(dataIncoming)];
    },
    getAllDataTags(recipes) {
        const ingredientsData = recipes.flatMap( currentRecipe => {
            return currentRecipe.ingredients.map( currentIngredient => {
                return currentIngredient.ingredient
            });
        });
        const equipmentsData = recipes.map( currentRecipe => {
            return currentRecipe.appliance
        });
        const ustensilsData = recipes.flatMap( currentRecipe => {
            return currentRecipe.ustensils
        });

        const ingredientsUniquesValues = this.getUniqueData(ingredientsData);
        const equipmentsUniquesValues = this.getUniqueData(equipmentsData);
        const ustensilsUniquesValues = this.getUniqueData(ustensilsData);

        return {
            ingredients: ingredientsUniquesValues,
            equipments: equipmentsUniquesValues,
            ustensils: ustensilsUniquesValues
        }
    },
}

export class Data {

    static getAllRecipes() {
        return recipes;
    }

    static submitedDataInputSearchBarValue(dataInputValue) {
        const typedUserSearch = dataInputValue.toLowerCase();
        // Procéder à la recherche de la valeur envoyé par l'utilisateur
        const resultFirstSearch = InternalFunctions.getFilteredRecipes(typedUserSearch);

        // Avec cette première recherche, l'utilisateur peut décider de s'arreter la ou procéder à une recherche plus approfondie par rapport aux tag ...
        // Pour cela, il est nécessaire d'abord de réafficher dans le conteneur de recette de l'interface les resultats trouvées

        if ( resultFirstSearch.length > 0 ) {
            const dropdownListData = InternalFunctions.getAllDataTags(resultFirstSearch);
            Interface.displayDropdownLists(dropdownListData);
            Interface.displayNewRecipes(resultFirstSearch);
        } else {
            Interface.showNotFindRecipe();
        }

        // Par la suite, il faut afficher les tags dans les composants de l'interface à savoir les DropDown Buttons

    }
}