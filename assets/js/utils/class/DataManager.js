import { recipes } from "../../data/recipes.js";
import { Interface } from "../class/Interface.js";

const InternalFunctions = {
    getFilteredRecipes(checkValue) {
        const filteredRecipes = recipes.filter(currentRecipe => {
            return (
                currentRecipe.name.toLowerCase().includes(checkValue)
                || currentRecipe.description.toLowerCase().includes(checkValue)
                || currentRecipe.ingredients.some((ingredient) => {
                    ingredient.ingredient.toLowerCase().includes(checkValue)
                })
            )
        });
        if (filteredRecipes.length === 0) return null;
        else return filteredRecipes;
    },
    getUniqueData(dataIncoming) {
        return [...new Set(dataIncoming)];
    },
    getAllDataTags(rawRecipesObjects) {
        const ingredientsData = rawRecipesObjects.flatMap( currentRecipe => {
            return currentRecipe.ingredients.map( currentIngredient => {
                return currentIngredient.ingredient
            });
        });
        const equipmentsData = rawRecipesObjects.map( currentRecipe => {
            return currentRecipe.appliance
        });
        const ustensilsData = rawRecipesObjects.flatMap( currentRecipe => {
            return currentRecipe.ustensils
        });

        const ingredientsUniquesValues = this.getUniqueData(ingredientsData);
        const equipmentsUniquesValues = this.getUniqueData(equipmentsData);
        const ustensilsUniquesValues = this.getUniqueData(ustensilsData);

        Data.allListsData = {
            ingredients: ingredientsUniquesValues,
            equipments: equipmentsUniquesValues,
            ustensils: ustensilsUniquesValues
        }

        return Data.allListsData;
    },
}


export class Data {
    static mainResultRecipes = null;
    static allListsElements = null;
    static getAllRecipes() {
        return recipes;
    }

    static getAllListsDropdownData(recipesObjects) {
        return InternalFunctions.getAllDataTags(recipesObjects);
    }

    static submittedDataInputSearchBarValue(dataInputValue) {
        const typedUserSearch = dataInputValue.toLowerCase();
        // Procéder à la recherche de la valeur envoyé par l'utilisateur
        this.mainResultRecipes = InternalFunctions.getFilteredRecipes(typedUserSearch);

        // Avec cette première recherche, l'utilisateur peut décider de s'arreter la ou procéder à une recherche plus approfondie par rapport aux tags ...
        // Pour cela, il est nécessaire d'abord de réafficher dans le conteneur de recette de l'interface les resultats trouvées

        if ( this.mainResultRecipes ) {
            const dropdownListData = InternalFunctions.getAllDataTags(this.mainResultRecipes);
            Interface.displayNewDropdownLists(dropdownListData);
            Interface.displayNewRecipes(this.mainResultRecipes);
        } else {
            Interface.showNotFindRecipe();
        }

        // Par la suite, il faut afficher les tags dans les composants de l'interface à savoir les DropDown Buttons

    }
}