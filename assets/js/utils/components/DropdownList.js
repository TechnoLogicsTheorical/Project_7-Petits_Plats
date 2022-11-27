import { EVENTS } from "../misc/eventsCallback.js";

/**
 * Composant d'interfaçage permettant de créer un élément de la liste pour le contenant
 */
class DropdownItemElement {
    /**
     * @param {string} text Valeur textuelle du filtre
     * @param {string} type Associé à la classe, il permet de retrouver la catégorie de l'élément dans le gestionnaire de filtre
     */
    constructor(text, type) {
        this._displayText = text;
        this._typeElement = type;
    }

    /**
     * Ajoute le comportement de l'action lorsque que le tag est cliqué
     * @param {HTMLLIElement} itemElement Element de liste
     * @private
     */
    _attachEventClick(itemElement) {
        itemElement.addEventListener('click', EVENTS.DropdownLists.clickWithTagItem);
    }

    /**
     * Créer un élément liste pour l'ajouter à son conteneur parent
     * @returns {HTMLLIElement} <li> Element
     */
    createItem() {
        const itemElement = document.createElement('li');
        itemElement.textContent = this._displayText;
        itemElement.dataset.item_type = this._typeElement;

        this._attachEventClick(itemElement);
        return itemElement;
    }
}

/**
 * Composant d'interfaçage permettant de gérer les conteneurs de liste des filtres disponible dans l'interface
 */
export class DropdownList {
    /**
     * @param {HTMLUListElement} DomElement Conteneur existant des éléments de liste
     * @param {string} type Catégorie du conteneur : ingredient, equipment, ustensil
     */
    constructor(DomElement, type) {
        try {
            if (!DomElement) {
                return console.error(new Error('Dropdown List: Element is not good'));
            }
            this._DomElement = DomElement;
            this._typeList = type;
            this.arrayListElements = [];
            this._initEvent();
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * Ajoute un élément de liste au conteneur de liste
     * @param {HTMLLIElement} createdElement Un élément de liste crée
     * @private
     */
    _add(createdElement) {
        this._DomElement.appendChild(createdElement);
    }

    /**
     * Efface le contenu courant dans le conteneur de la liste en vue de la réhydrater
     * @private
     */
    _clearList() {
        this._DomElement.innerHTML = '';
    }

    /**
     * Ajoute le comportement de basculement d'ouverture et de fermeture du menu
     * @private
     */
    _addButtonEvent() {
        const iconSpanButton = this._DomElement.previousElementSibling.firstElementChild;
        iconSpanButton.addEventListener('click', EVENTS.DropdownLists.toggleListMenu)
    }

    /**
     * Utilisée dès l'instanciation de la classe pour ajouter le comportement d'ouverture et fermeture de menu de filtre
     * @private
     */
    _initEvent() {
        this._addButtonEvent();
    }

    /**
     * Permet de créer, toutes les entrées disponibles pour la création de filtres cliquable
     * @param {Array<string>} arrayTextElements Toutes les éléments référencée par le biais des entrées disponibles par les objets de recettes
     */
    createList(arrayTextElements) {
        this._clearList();
        arrayTextElements.sort();
        arrayTextElements.forEach( textValue => {
            const itemModel = new DropdownItemElement(textValue, this._typeList);
            const resultedElement = itemModel.createItem();
            this._add(resultedElement);
        });
    }
}