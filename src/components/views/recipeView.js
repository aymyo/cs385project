import React from 'react';
import { NavLink } from 'react-router-dom';

export default class recipeView extends React.Component {
    state = {}

    render() {
        const params = this.props.match;
        return (
            <div className="view view-recipe">
                <h3 className="title">View recipe {params.recipeID}</h3>
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
        );
    }

}