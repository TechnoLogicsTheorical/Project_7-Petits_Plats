import {recipes} from "../../data/recipes.js";
import {Interface} from "../class/Interface.js";

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
    checkedIfTagsExists(value) {
        const ingredientsTags = Data.tagLists.ingredients.includes(value);
        const equipmentsTags = Data.tagLists.equipments.includes(value) ;
        const ustensilsTags = Data.tagLists.ustensils.includes(value);

        return (ingredientsTags || equipmentsTags || ustensilsTags);
    },
    getSpecialFilteredRecipes(textValue, typeItemElement) {
        let addictiveFiltered = null;
        const currentRecipes =
            Data.resultRecipesWithFilteredTags
            || Data.resultRecipesWithSearchBar
            || Data.getAllRecipes();

        if ( typeItemElement === 'ingredient') {
            addictiveFiltered = currentRecipes.filter( recipe => {
                return recipe.ingredients.some( ingredientValues => {
                    return ingredientValues.ingredient.toLowerCase().includes(textValue);
                });
            });
        } else if ( typeItemElement === 'equipment' ) {
            addictiveFiltered = currentRecipes.filter( recipe => {
                return recipe.appliance.toLowerCase().includes(textValue);
            });
        } else if ( typeItemElement === 'ustensil' ) {
            addictiveFiltered = currentRecipes.filter( recipe => {
                return recipe.ustensils.some( ustensilValue => {
                    return ustensilValue.toLowerCase().includes(textValue);
                });
            });
        }

        return addictiveFiltered;
    },
    makeAllFilter() {
        Data.resultRecipesWithFilteredTags = null;

        Data.tagLists.ingredients.forEach( ingredient => {
            Data.resultRecipesWithFilteredTags = InternalFunctions.getSpecialFilteredRecipes(ingredient.toLowerCase(), 'ingredient');
        });
        Data.tagLists.equipments.forEach( equipment => {
            Data.resultRecipesWithFilteredTags = InternalFunctions.getSpecialFilteredRecipes(equipment.toLowerCase(), 'equipment');
        });
        Data.tagLists.ustensils.forEach( ustensil => {
            Data.resultRecipesWithFilteredTags = InternalFunctions.getSpecialFilteredRecipes(ustensil.toLowerCase(), 'ustensil');
        });
    },
    noValuesInTags() {
        const ingredientsTags = Data.tagLists.ingredients.length === 0;
        const equipmentsTags = Data.tagLists.equipments.length === 0;
        const ustensilsTags = Data.tagLists.ustensils.length === 0;

        return (ingredientsTags && equipmentsTags && ustensilsTags);
    }
}


export class Data {
    static resultRecipesWithSearchBar = null;
    static resultRecipesWithFilteredTags = null;
    static allListsElements = null;
    static tagLists = {
        ingredients: [],
        equipments: [],
        ustensils: [],
    }

    static getAllRecipes() {
        return recipes;
    }

    static getAllListsDropdownData(recipesObjects) {
        return InternalFunctions.getAllDataTags(recipesObjects);
    }

    static submittedDataInputSearchBarValue(dataInputValue) {
        const typedUserSearch = dataInputValue.toLowerCase();
        // Procéder à la recherche de la valeur envoyé par l'utilisateur
        this.resultRecipesWithSearchBar = InternalFunctions.getFilteredRecipes(typedUserSearch);

        // Avec cette première recherche, l'utilisateur peut décider de s'arreter la ou procéder à une recherche plus approfondie par rapport aux tags ...
        // Pour cela, il est nécessaire d'abord de réafficher dans le conteneur de recette de l'interface les resultats trouvées

        if ( this.resultRecipesWithSearchBar ) {
            const dropdownListData = InternalFunctions.getAllDataTags(this.resultRecipesWithSearchBar);
            Interface.displayNewDropdownLists(dropdownListData);
            Interface.displayNewRecipes(this.resultRecipesWithSearchBar);
        } else {
            Interface.showNotFindRecipe();
        }

        //TODO: Par la suite, il faut afficher les tags dans les composants de l'interface à savoir les DropDown Buttons

    }

    static addTagToList(textValue, typeItemElement) {
        switch (typeItemElement) {
            case 'ingredient':
                if (InternalFunctions.checkedIfTagsExists(textValue)) {
                    break;
                }
                Interface.displayNewTag(textValue, typeItemElement);
                Data.tagLists.ingredients.push(textValue);
                Data.refreshSearchRecipes(textValue, typeItemElement);
                break;
            case 'equipment':
                if (InternalFunctions.checkedIfTagsExists(textValue)) {
                    return;
                }
                Interface.displayNewTag(textValue, typeItemElement);
                Data.tagLists.equipments.push(textValue);
                Data.refreshSearchRecipes(textValue, typeItemElement);
                break;
            case 'ustensil':
                if (InternalFunctions.checkedIfTagsExists(textValue)) {
                    return;
                }
                Interface.displayNewTag(textValue, typeItemElement);
                Data.tagLists.ustensils.push(textValue);
                Data.refreshSearchRecipes(textValue, typeItemElement);
                break;
        }
    }

    static refreshSearchRecipes(textValue, typeItemElement) {
        const tagValueToLower = textValue.toLowerCase();

        if (Data.resultRecipesWithSearchBar != null) {
            // Si le tableau contient de recette et que les tableaux, également de tagList on une entrée alors on recherche les recettes avec la recherche existante plus la reflitration des recettes avec les valeurs
            Data.resultRecipesWithFilteredTags = InternalFunctions.getSpecialFilteredRecipes(tagValueToLower, typeItemElement);
            Interface.displayNewRecipes(Data.resultRecipesWithFilteredTags);
        } else {
            Data.resultRecipesWithFilteredTags = InternalFunctions.getSpecialFilteredRecipes(tagValueToLower, typeItemElement);
            Interface.displayNewRecipes(Data.resultRecipesWithFilteredTags);
        }
    }

    static removeTagToList(textElementValue, typeElement) {

        switch (typeElement) {
            case 'ingredient':
                Data.tagLists.ingredients = Data.tagLists.ingredients.filter(ingredient => {
                    return ingredient !== textElementValue;
                });
                break;
            case 'equipement':
                Data.tagLists.equipments = Data.tagLists.equipments.filter(equipment => {
                    return equipment !== textElementValue;
                });
                break;
            case 'ustensil':
                Data.tagLists.ustensils = Data.tagLists.ustensils.filter(equipment => {
                    return equipment !== textElementValue;
                });
                break;
        }
        if (InternalFunctions.noValuesInTags()) {
            Data.resultRecipesWithFilteredTags = null
            Interface.displayDefaultRecipes();
        } else {
            Data.remakeAllSearch();
        }
    }

    static remakeAllSearch() {
        InternalFunctions.makeAllFilter();
        Interface.displayNewRecipes(Data.resultRecipesWithFilteredTags);
    }
}