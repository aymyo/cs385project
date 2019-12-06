import React from 'react';
import SearchBar from '../searchBar'
import { NavLink } from 'react-router-dom';
import db from '../../db';

export default class recipeCreate extends React.Component {
    state = {
        recipeTitle: '',
        recipeInstructions: '',
        recipeIngredients: [],
        recipeLabels: [],
    }

    //change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        console.log(db);
        console.log(db.recipes);

    }

    saveRecipe = () => {
        let newRecipe = {
            id: '3',
            title: this.state.recipeTitle,
            instructions: this.state.recipeInstructions,
            ingredients: this.state.recipeIngredients,
            labels: this.state.recipeLabels,
        }
        console.log(newRecipe);
    }

    addIngredient = (ingredient) => {
        console.log(ingredient);
        let newIngredientlist = this.state.recipeIngredients.concat(ingredient);

        this.setState({
            recipeIngredients: newIngredientlist,
        });
    }

     delIngredient = (labelDeleted) => {
        let newIngredientlist;

        newIngredientlist = this.state.recipeIngredients.filter((value, index, arr) => {
            return value.label !== labelDeleted;
        });

        this.setState({
            recipeIngredients: newIngredientlist,
        });
    }

    render() {
        return (
            <div className="view create-recipe">
                <h3 className="title" >Create recipe</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Picture</label>
                        <input type="file" className="form-control" id="recipeTitle" placeholder="Upload you pic"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Recipe title:</label>
                        <input type="text" className="form-control" id="recipeTitle" placeholder="Write the title"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSteps">Steps:</label>
                        <textarea type="text" className="form-control" id="recipeInstructions" placeholder="Write the steps"/>
                    </div>
                    <div id="ingredients">
                        <p>Ingredients:</p>
                        <ul>
                            {this.state.recipeIngredients.map((obj,index) => {
                                return (
                                    <li key={"food"+index} >
                                       - {obj.label} ({obj.qty}g) <span className="delete" onClick={() => this.delIngredient(obj.label)}>X</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div id="search_bar_ingredients">
                        <SearchBar insideRecipe={true} callback={this.addIngredient}/>
                    </div>
                    <button className="btn btn-primary mb-2 btn-save" onClick={this.saveRecipe}>Save</button>
                </form>
            </div>
        );
    }
}