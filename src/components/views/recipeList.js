import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import image from '../../images/recipe.svg';
import firebase from "firebase";

/* This component is displayed whenever the user goes to the path "/recipes"
* It shows the list of recipes stored in the database. Whenever the user clicks on one, it redirects to the
* recipeView of that recipe.*/
export default class recipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeList: [],
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        // We call the database for the list of recipes
        let ref = firebase.database().ref('recipes').orderByChild('id');
        ref.on('value', async (snapshot) => {
            let recipeData = snapshot.val();
            // This array will store the objects we download from the firebase db.
            let recipeList = [];
            for (let r in recipeData)
            {
                // create a JSON object version of our object.
                let currObj =  {
                    id: recipeData[r].id,
                    title: recipeData[r].title,
                    intructions: recipeData[r].instructions,
                    ingredients: recipeData[r].ingredients,
                    labels: recipeData[r].labels,
                    nutrition: recipeData[r].nutrition,
                    };
                // add it to our newStateMessages array.
                recipeList.push(currObj);
            } // end for loop

            console.log(recipeList);
            // call the method to update state in App.js component.
            if(this._isMounted) {
                await this.setState({
                    recipeList: recipeList,
                    loaded: true,
                });
                console.log(recipeList);
            }
        }); // end of the on method
    }

    // Redirects to the recipeView of the recipe clicked
    handleClick(recipe_id){
        console.log(recipe_id);
        let url= "/recipe/"+recipe_id;
        this.props.history.push(url);
    }

    render() {
        // We have a "temporal" view until the database retrieves the info.
        if (this.state.loaded === true) {
            return (
                <div className="view recipe-list">
                    <h3 className="title">My recipes</h3>

                    <div className="search-results">
                        {this.state.recipeList.map((recipe) => {
                            return (
                                <div className="recipe-preview" onClick={() => this.handleClick(recipe.id)}
                                     key={"recipeList:" + recipe.id}>
                                    <div className="recipe-pic">
                                        <img className="image" src={image} alt="Recipe pic"></img>
                                        <FontAwesomeIcon icon={faCamera} className="icon"></FontAwesomeIcon>
                                    </div>

                                    <div className="api-item">
                                        <h3 className="food-title">{recipe.title} {/*<b className="food-qty">(200{this.props.qty} g)</b>*/}</h3>

                                        <div className="food-info">
                                            <div className="info-line">
                                                <p className="info-item"><b className="nutrient-name">Calories</b>
                                                    {recipe.nutrition ? recipe.nutrition.cal : ''}kcal</p>
                                                <p className="info-item"><b className="nutrient-name">Fat</b>
                                                    {recipe.nutrition ? recipe.nutrition.fat : ''}g</p>
                                            </div>
                                            <div className="info-line">
                                                <p className="info-item"><b className="nutrient-name">Carbs</b>
                                                    {recipe.nutrition ? recipe.nutrition.carbs : ''}g</p>
                                                <p className="info-item"><b className="nutrient-name">Protein</b>
                                                    {recipe.nutrition ? recipe.nutrition.pro : ''}g</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="icon-recognition">Icon designed by
                        <a href="https://www.flaticon.es/autores/freepik" title="Freepik">Freepik</a>
                        from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a>
                    </div>
                </div>


            );
        }else {
            return (
                <div className="view myrecipes">
                    <h3 className="title">My recipes</h3>

                    <div className="search-results">
                        <div className="recipe-preview" >
                            <div className="recipe-pic">
                                <FontAwesomeIcon icon={faCamera} className="icon"></FontAwesomeIcon>
                            </div>

                            <div className="api-item">
                                <h3 className="food-title">Loading {/*<b className="food-qty">(200{this.props.qty} g)</b>*/}</h3>

                                <div className="food-info">
                                    <div className="info-line">
                                        <p className="info-item"><b className="nutrient-name">Calories</b>
                                            Loading kcal</p>
                                        <p className="info-item"><b className="nutrient-name">Fat</b>
                                            Loading g</p>
                                    </div>
                                    <div className="info-line">
                                        <p className="info-item"><b className="nutrient-name">Carbs</b>
                                            Loading g</p>
                                        <p className="info-item"><b className="nutrient-name">Protein</b>
                                            Loading g</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}