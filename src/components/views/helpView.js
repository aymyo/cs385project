import React from 'react';
import homeimg from "../../images/homepage.JPG";
import homeimg1 from "../../images/homepage1.JPG";
import create1 from "../../images/createRecView.JPG";
import create2 from "../../images/createRecView1.JPG";

/* This component is displayed whenever the user goes to the path /help
* It shows information on how to use the App*/
export default class helpView extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view help">
                <h3 className="title">Help</h3>
                <div className="propertiesIngredients">
                    <br/><h5><b>1. Know the properties of ingredients!</b></h5>
                    <p>You will be able to know the nutritional properties of the ingredients only typing in the search
                        bar of the homepage:</p>
                    <div className="img-container">
                        <img className="image" src={homeimg1} alt="ingred image 1"></img>
                        <img className="image" src={homeimg} alt="ingred image 2"></img>
                    </div>
                </div>
                <div className="createRecipe">
                    <br/><h5><b>2. Write your recipe!</b></h5>
                    <p>You will be able to create your own recipes just going to the "Create recipe" page and filling
                        all the fields. You can add a title, ingredients (searching for them in the searchbar and
                        clicking on them), steps and a picture of your recipe to make it personlaised (clicking on the
                        "browser" button and finding the picture which fits best with your recipe).</p>
                    <div className="img-container">
                        <img className="image" src={create1} alt="create image 1"></img>
                        <img className="image" src={create2} alt="create image 2"></img>
                    </div>
                </div>
                <div className="listRecipes">
                    <br/><h5><b>3. Look at your list of recipes!</b></h5>
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