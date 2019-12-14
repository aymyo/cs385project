import React from 'react';
import home1 from "../../images/home1.png";
import home2 from "../../images/home2.png";
import create1 from "../../images/create1.png";
import create2 from "../../images/create2.png";
import view1 from "../../images/view1.png";
import view2 from "../../images/view2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensilSpoon } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'

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
                    <p>Know the nutritional properties of ingredients just by typing in the search
                        bar of the homepage:</p>
                    <div className="img-container">
                        <img className="image" src={home1} alt="ingred 1"></img>
                        <img className="image" src={home2} alt="ingred 2"></img>
                    </div>
                </div>
                <div className="createRecipe">
                    <br/><h5><b>2. Write your recipe!</b></h5>
                    <p>Create your own recipes clicking on <FontAwesomeIcon icon={faUtensilSpoon}/> in the menu.
                        <br/><br/>You can add the title, instructions, and ingredients (searching in the searchbar and
                        clicking on them). The nutrition of the recipe will be automatically calculated while you
                        add/remove the ingredients.</p>
                    <div className="img-container">
                        <img className="image" src={create1} alt="create 1"></img>
                        <img className="image" src={create2} alt="create 2"></img>
                    </div>
                </div>
                <div className="listRecipes">
                    <br/><h5><b>3. Look at your list of recipes!</b></h5>
                    <p>You can look at the list of recipes you or other user have created by clicking
                        <FontAwesomeIcon icon={faBook} /> in the menu. <br/><br/>
                        You will see the the recipes listed and their nutritional properties. If you click
                        on one of them, you'll have access to see all the details. You can also delete the recipe if
                        you think is incorrect.</p>
                    <div className="img-container">
                        <img className="image" src={view1} alt="view 1"></img>
                        <img className="image" src={view2} alt="view 2"></img>
                    </div>
                </div>
            </div>
        );
    }
}