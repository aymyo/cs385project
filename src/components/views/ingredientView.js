/* NOT USED

import React from 'react';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";


export default class ingredientView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            is_loaded: false,   //This variable changes when we get the info from the db
        }
    }

    async componentDidMount() {

        let path= "recipes/" + (this.props.match.params.recipeID - 1);
        let ref = firebase.database().ref(path);
        await ref.on('value', (snapshot) => {
            let recipeData = snapshot.val();

            console.log(recipeData);

            this.setState({
                recipeList: recipeData,
                is_loaded: true,
            });
        }); // end of the on method

    }

    render() {
        if(this.state.is_loaded === true){
            return (
                <div className="view view-ingr">

                    <NavLink to='/' className="header-left">
                        <FontAwesomeIcon icon={faChevronLeft} className="h-left" ></FontAwesomeIcon>
                    </NavLink>

                    <h3 className="title">
                        {this.state.title}
                    </h3>

                    <div className="picture">

                    </div>

                    <div className="description">
                        <p>Description:</p>

                    </div>

                    <div className="api-item nutrition">
                        <h3 className="food-title">Nutrition <b className="food-qty">({this.state.recipe.qty} g)</b></h3>
                        <div className="food-info">
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Calories</b>
                                    {this.state.cal}kcal</p>
                                <p className="info-item"><b className="nutrient-name">Fat</b>
                                    {this.state.fat}g</p>
                            </div>
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Carbs</b>
                                    {this.state.carbs}g</p>
                                <p className="info-item"><b className="nutrient-name">Protein</b>
                                    {this.state.pro}g</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
            );
        }else {
            return(
                <div className="view view-recipe">
                    <h3 className="title">LOADING</h3>
                    <div className="ingredients">
                        Ingredients:<br/>
                        - Tomatoes<br/>
                        - ...<br/><br/>
                    </div>
                    <div className="steps">
                        Steps:<br/>
                        1. Cook the pasta<br/>
                        2. Add tomato sauce<br/><br/>
                    </div>
                    <div className="picture">
                        *picture*<br/><br/>
                    </div>
                    <div className="NutritionInfo">
                        Nutritional info of the whole recipe: <br/>
                        Carbs, Fat, Calories...<br/><br/>
                    </div>
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
            )
        }

    }

}
*/