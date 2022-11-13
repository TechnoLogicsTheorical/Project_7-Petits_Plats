import { EVENTS } from "../misc/eventsCallback.js";

class DropdownItemElement {
    constructor(text, type) {
        this._displayText = text;
        this._typeElement = type;
    }

    _attachEventClick(itemElement) {
        itemElement.addEventListener('click', EVENTS.DropdownLists.clickWithTagItem);
    }

    createItem() {
        const itemElement = document.createElement('li');
        itemElement.textContent = this._displayText;
        itemElement.dataset.item_type = this._typeElement;

        this._attachEventClick(itemElement);
        return itemElement;
    }
}

export class DropdownList {
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
    _add(createdElement) {
        this._DomElement.appendChild(createdElement);
    }

    _clearList() {
        this._DomElement.innerHTML = '';
    }

    _addButtonEvent() {
        const iconSpanButton = this._DomElement.previousElementSibling.firstElementChild;
        iconSpanButton.addEventListener('click', EVENTS.DropdownLists.toggleListMenu)
    }

    _initEvent() {
        this._addButtonEvent();
    }

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