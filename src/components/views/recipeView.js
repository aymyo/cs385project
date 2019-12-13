import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from "firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

/* This component is displayed whenever the user clicks in a recipe
* It calls the firebase database and retrieves the information of that recipe*/
export default class recipeView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            is_loaded: false, //This variable changes when we get the info from the db
            message: 'Loading',
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        console.log(this.props.match.params.recipeID);
        if(this.props.match.params.recipeID === "deleted"){
            if(this._isMounted) {
                this.setState({
                        is_loaded: false,
                        message: "Deleting...",
                    }
                )
            }

            let url= "/recipes";
            this.props.history.push(url);
        }else {
            let path= "recipes/" + (this.props.match.params.recipeID);
            let ref = firebase.database().ref(path);
            ref.on('value', (snapshot) => {
                let recipeData = snapshot.val();

                console.log(recipeData);

                if(Object.is(recipeData,null)){
                    let url= "/404";
                    this.props.history.push(url);
                }else if(this._isMounted) {
                    this.setState({
                        recipe: recipeData,
                        is_loaded: true,
                    });
                }
            }); // end of the on method
        }
    }

    deleteRecipe = async () => {

        let path= "recipes/" + (this.props.match.params.recipeID);
        firebase.database().ref(path).remove();

        console.log("Recipe deleted");

        this.setState({
                is_loaded: false,
                message: "Deleted",
            }
        )

        let url= "/recipe/deleted";
        this.props.history.push(url);

    }

    render() {
        if(this.state.is_loaded === true){
            return (
                <div className="view view-recipe">
                    <NavLink to='/recipes' className="header-left">
                        <FontAwesomeIcon icon={faChevronLeft} className="h-left" ></FontAwesomeIcon>
                    </NavLink>

                    <h3 className="title">
                         {this.state.recipe.title}
                    </h3>

                    <div className="picture">

                    </div>

                    <p>Ingredients:</p>
                    <ul>
                        {this.state.recipe.ingredients.map((ingr,index) => {
                            return (
                                <li key={ingr.label+index}>- {ingr.label} ({ingr.qty} g)</li>
                            );
                        })
                        }
                    </ul>

                    <p>Instructions:</p>
                    <div className="instructions">
                        {this.state.recipe.instructions}
                    </div>

                    <div className="api-item nutrition">
                        <h3 className="food-title">Nutrition <b className="food-qty">({this.state.recipe.nutrition.qty} g)</b></h3>
                        <div className="food-info">
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Calories</b>
                                    {this.state.recipe.nutrition.cal}kcal</p>
                                <p className="info-item"><b className="nutrient-name">Fat</b>
                                    {this.state.recipe.nutrition.fat}g</p>
                            </div>
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Carbs</b>
                                    {this.state.recipe.nutrition.carbs}g</p>
                                <p className="info-item"><b className="nutrient-name">Protein</b>
                                    {this.state.recipe.nutrition.pro}g</p>
                            </div>
                        </div>
                    </div>

                    <span className="btn btn-delete" onClick={this.deleteRecipe}>Delete</span>
                </div>
            );
        }else {
            return(
                <div className="view view-recipe">
                    <NavLink to='/recipes' className="header-left">
                        <FontAwesomeIcon icon={faChevronLeft} className="h-left" ></FontAwesomeIcon>
                    </NavLink>

                    <h3 className="title">{this.state.message}</h3>

                    <div className="picture">

                    </div>

                    <p>Ingredients:</p>
                    <ul>
                        <li>- {this.state.message} (100g)</li>
                        <li>- {this.state.message} (100g)</li>
                        <li>- {this.state.message} (100g)</li>
                    </ul>

                    <p>Instructions:</p>
                    <div className="instructions">
                        1. {this.state.message}<br/>
                        2. {this.state.message}<br/>
                        3. {this.state.message}...<br/>
                    </div>

                    <div className="api-item nutrition">
                        <h3 className="food-title">Nutrition <b className="food-qty">(100 g)</b></h3>
                        <div className="food-info">
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Calories</b>
                                    0 kcal</p>
                                <p className="info-item"><b className="nutrient-name">Fat</b>
                                     0 g</p>
                            </div>
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Carbs</b>
                                    0 g</p>
                                <p className="info-item"><b className="nutrient-name">Protein</b>
                                    0 g</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

    }

}