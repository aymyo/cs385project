import React from 'react';

export default class helpView extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view help">
                <h3 className="title">Help</h3>
                <div className="propertiesIngredients">
                    <br/><h5>1. Know the properties of ingredients!</h5>
                    <p>You will be able to know the nutritional properties of the ingredients only typing in the search
                        bar of the homepage: (screenshot of the homepage)</p>
                </div>
                <div className="createRecipe">
                    <br/><h5>2. Make your own list of recipes!</h5>
                    <p>You will be able to create your own recipes just going to the "Create recipe" page and filling
                        all the fields. You can add a title, ingredients (searching for them in the searchbar and
                        clicking on them), steps and a picture of your recipe to make it personlaised (clicking on the
                        "browser" button and finding the picture which fits best with your recipe).
                        (Screenshot of the Create recipe page)</p>
                </div>
                <div className="listRecipes">
                    <br/><h5>3. Look at your list of recipes!</h5>
                    <p>You can look at the list of recipes you have created on "My recipes" page. You will see the title
                        and a part of each recipe, which is all the nutritional properties of the recipe. If you click
                        on the title of the recipe, you have access to see all the details of it. You can also edit
                        or delete them.
                        (Screenshots of My recipes page and RecipeView)</p>
                </div>
            </div>
        );
    }
}