import { EVENTS } from "../misc/eventsCallback.js";
import { DOM_ELEMENTS } from "../misc/constElements.js";
import { Data } from "../managers/Data.js";

/**
 * Composant d'interfaçage permettant de créer un tag affichage avec un contrôle de suppression
 */
export class Tag {
    /**
     * @param {string} value Valeur du filtre cliqué par l'utilisateur
     * @param {string} type Chaine de caractère qui est utilisé pour ajouter la classe CSS
     */
    constructor(value, type) {
        this._container = DOM_ELEMENTS.Containers.actives_filters;
        this._type = type;
        this._textValue = value;
        this.constructedElement = null;

        this._alreadyExist = Data.currentTags[(this._type+'s')].includes(this._textValue.toLowerCase());
    }

    /**
     * Fonction de création de l'élément HTML
     */
    create() {
        if (this._alreadyExist) {
            return;
        }
        const tagElementContainer = document.createElement('div');
        tagElementContainer.className = 'filter-element ' + this._type;

        const textContentValue = document.createElement('span');
        textContentValue.className = 'title';
        textContentValue.textContent = this._textValue;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerHTML = `<img src="assets/img/icons/crossAround.svg" alt="Supprimer l'élément">`;
        this._addDeleteButton(deleteButton);

        tagElementContainer.appendChild(textContentValue);
        tagElementContainer.appendChild(deleteButton);

        this.constructedElement = tagElementContainer;

        this._container.ariaHidden = 'false';
        this._container.appendChild(this.constructedElement);
    }

    /**
     * Fonction qui ajoute le comportement de suppression de l'élément HTML
     * @param {HTMLButtonElement} buttonElement Element de bouton
     * @private
     */
    _addDeleteButton(buttonElement) {
        buttonElement.addEventListener('click', EVENTS.Tags.delete);
    }

    /**
     * Ajoute au gestionnaire de donnée, une entrée texte pour définir qu'elle est existante
     */
    addDataTag() {
        if (this._alreadyExist) {
            return;
        }
        switch (this._type) {
            case 'ingredient':
                Data.currentTags.ingredients.push(this._textValue.toLowerCase());
                break;
            case 'equipment':
                Data.currentTags.equipments.push(this._textValue.toLowerCase());
                break;
            case 'ustensil':
                Data.currentTags.ustensils.push(this._textValue.toLowerCase());
                break;
            default:
                return new Error('Cannot corresponding type to add a tag to list Array');
        }
    }

    /**
     * Supprime un filtre existant dans le gestionnaire de tag existant
     * @param {string} type Catégorie du filtre stockée
     * @param {string} textValue Valeur à supprimer
     */
    static removeDataTag(type, textValue) {
        switch (type) {
            case 'ingredient':
                Data.currentTags.ingredients = Data.currentTags.ingredients.filter( arrayValue => {
                    return arrayValue !== textValue;
                });
                break;
            case 'equipment':
                Data.currentTags.equipments = Data.currentTags.equipments.filter( arrayValue => {
                    return arrayValue !== textValue;
                });
                break;
            case 'ustensil':
                Data.currentTags.equipments = Data.currentTags.ustensils.filter( arrayValue => {
                    return arrayValue !== textValue;
                });
                break;
            default:
                console.error('Cannot corresponding type to remove a tag to list Array');
        }
    }
}