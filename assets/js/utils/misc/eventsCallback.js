import { DOM_ELEMENTS } from '../misc/constElements.js';
import { Tag } from '../components/Tag.js';
import { Results, SearchEngine } from '../managers/SearchEngine.js';
import { Interface } from '../Interface.js';
import { Data } from '../managers/Data.js';

/**
 * Regroupe tous les événements de l'interface et des comportements nécessaires au bon déroulement des actions
 * @property {Object} EVENTS Collection de propriété
 * @property {Object} DropdownLists Collection de fonctions de rappel
 * @property {function} DropdownLists.clickWithTagItem Fonction de rappel pour l'ajout d'un filtre
 * @property {function} DropdownLists.toggleListMenu Fonction de rappel pour basculement de l'affichage du conteneur
 *
 * @property {Object} Tags Collection de propriété
 * @property {function} Tags.delete Fonction de rappel pour l'action de suppression d'un filtre
 *
 * @property {Object} Forms Collection de propriété
 * @property {function} Forms.cancelFormAction Fonction de rappel pour annuler le comportement par défaut des formulaires
 *
 * @property {Object} Inputs Collection de propriété
 * @property {function} Inputs.attachEventSearch Fonction de rappel pour récupérer la valeur du champ de saisie
 */
export const EVENTS = {
    DropdownLists: {
        /**
         * Fonction de rappel pour l'ajout d'un filtre
         * @param {UIEvent} event Evenement de l'élément
         */
        clickWithTagItem(event) {
            const element = event.target;

            const textValue = element.textContent;
            const typeItemList = element.dataset.item_type;

            const tagModel = new Tag(textValue, typeItemList);
            tagModel.create();
            tagModel.addDataTag();

            SearchEngine.proceedSecondSearch();
        },
        /**
         * Fonction de rappel pour basculement de l'affichage du conteneur
         * @param {UIEvent} event Evenement de l'élément
         */
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
        /**
         * Fonction de rappel pour l'action de suppression d'un filtre
         * @param {UIEvent} event Evenement de l'élément
         */
        delete(event) {
            const buttonElement = event.target;
            const element = buttonElement.parentElement.parentElement;

            const typeElement = element.classList[1];
            const textValue = element.textContent.toLowerCase();

            DOM_ELEMENTS.Containers.actives_filters.removeChild(element);
            Tag.removeDataTag(typeElement, textValue);
            SearchEngine.refreshAfterRemoved();
        },
    },
    Forms: {
        /**
         * Fonction de rappel pour annuler le comportement par défaut des formulaires
         * @param {UIEvent} event Evenement de l'élément
         */
        cancelFormAction(event) {
            event.preventDefault();
        }
    },
    Inputs: {
        /**
         * Fonction de rappel pour récupérer la valeur du champ de saisie
         * @param {KeyboardEvent} event Evenement de l'élément
         */
        attachEventSearch(event) {
            const typedUserValue = event.target.value.toLowerCase();
            if ( typedUserValue.length >= 3 ) {
                SearchEngine.proceedPrincipalSearch(typedUserValue);
                return;
            }
            Interface.defaultDisplay();
            Results.clearAll();
        },

        attachDropdownEventSearch(event, type) {
            const textValue = event.target.value;
            // Force to Open Menu
            const currentListMenu = event.target.parentElement.nextElementSibling;
            const currentIconButton = event.target;
            currentListMenu.ariaHidden = 'false';
            currentIconButton.classList.add('rotate');

            const htmlCollectionToArray = [...currentListMenu.children];

            //Si on efface pas la valeur
            if (event.key !== 'Backspace') {

                htmlCollectionToArray.forEach( listElement => {
                    const textElement = listElement.textContent.toLowerCase();
                    if (!textElement.includes(textValue.toLowerCase())) {
                        listElement.style.display = 'none';
                    }
                })
            } else {
                // Sinon on reset
                event.target.value = '';
                htmlCollectionToArray.forEach( listElement => {
                    const textElement = listElement.textContent.toLowerCase();
                    if (!textElement.includes(textValue.toLowerCase())) {
                        listElement.style.display = '';
                    }
                });
            }
        }
    }
};