export class RecipeCard {
    constructor(infosObject) {
        try {
            if (!infosObject) {
                console.error(new Error('Recipe Card: infosObject is corompted'));
                return
            }
            this._name = infosObject.name;
            this._time = infosObject.time;
            this._description = infosObject.description;

            this._ingredients = infosObject.ingredients;
        }
        catch (exception) {

        }
    }

    _createIngredientsList() {
        let finalStringElements = '';

        this._ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;
            if (
                ingredient.hasOwnProperty('quantity')
                && ingredient.hasOwnProperty('unit')
            ) {
                const ingredientQuantity = ingredient.quantity;
                const ingredientUnit = ingredient.unit;

                finalStringElements += `
                    <li>
                        <span>${ingredientName}: </span>
                        <span>${ingredientQuantity} ${ingredientUnit}</span>
                    </li>
                `;
            } else if (ingredient.hasOwnProperty('quantity')) {
                const ingredientQuantity = ingredient.quantity;

                finalStringElements += `
                    <li>
                        <span>${ingredientName}: </span>
                        <span>${ingredientQuantity}</span>
                    </li>
                `;
            } else {
                finalStringElements += `
                    <li>
                        <span>${ingredientName}: </span>
                    </li>
                `;
            }
        });
        return finalStringElements;
    }

    create() {
        const cardContainer = document.createElement('article');
        cardContainer.className = 'recipe-card';
        cardContainer.innerHTML = `
            <header class="image-wrapper">

            </header>

            <main class="details">
                <div class="header">
                    <h2 class="title">${this._name}</h2>
                    <span class="time-wrapper">
                        <img src="assets/img/icons/recipeTime.svg" alt="Temps de préparation">
                        <time>${this._time} min</time>
                    </span>
                </div>

                <div class="text">
                    <ul class="ingredients">
                        ${this._createIngredientsList()}
                    </ul>

                    <p class="instructions">
                        ${this._description}
                    </p>
                </div>
            </main>
        `;

        return cardContainer;
    }
}