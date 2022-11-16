import { DOM_ELEMENTS } from "../misc/constElements.js";
import { Tag } from "../components/Tag.js";
import { Results, SearchEngine } from "../managers/SearchEngine.js";
import { Interface } from "../Interface.js";

export const EVENTS = {
    DropdownLists: {
        clickWithTagItem(event) {
            const element = event.target;

            const textValue = element.textContent;
            const typeItemList = element.dataset.item_type;

            const tagModel = new Tag(textValue, typeItemList);
            tagModel.create();
            tagModel.addDataTag();

            SearchEngine.proceedSecondSearch();
        },
        toggleListMenu(event) {
            const currentIconButton = event.target;
            const currentListMenu = event.target.parentElement.nextElementSibling;

            // Changing state Aria-hidden Menu
            if (currentListMenu.ariaHidden === 'true') {
                currentListMenu.ariaHidden = 'false';
                currentIconButton.classList.add('rotate');
            } else {
                currentListMenu.ariaHidden = 'true';
                currentIconButton.classList.remove('rotate');
            }
        }
    },
    Tags: {
        delete(event) {
            const buttonElement = event.target;
            const element = buttonElement.parentElement.parentElement;

            const typeElement = element.classList[1];
            const textValue = element.textContent.toLowerCase();

            DOM_ELEMENTS.Containers.actives_filters.removeChild(element);
            // TODO: Coder la suppression dans le tableau Data.currentTags puis réflecter la recherche selon les tags ...
            Tag.removeDataTag(typeElement, textValue);
            SearchEngine.refreshAfterRemoved();
        },
    },
    Forms: {
        cancelFormAction(event) {
            event.preventDefault();
        }
    },
    Inputs: {
        attachEventSearch(event) {
            const typedUserValue = event.target.value.toLowerCase();
            if ( typedUserValue.length >= 3 ) {
                SearchEngine.proceedPrincipalSearch(typedUserValue);
                return;
            }
            Interface.defaultDisplay();
            Results.clearAll();
        }
    }
}