import React from 'react';
import SearchBar from '../searchBar'
import { NavLink } from 'react-router-dom';
import firebase from "firebase";
import fbconfig from "../../firebase";

export default class recipeCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recipeTitle: '',
            recipeInstructions: '',
            recipeIngredients: [],
            recipeLabels: [],
            recipeNutrition: {
                cal: '',
                carbs: '',
                fat: '',
                pro: '',
                qty: '',
            }
        }
    }

    //change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        let ref = firebase.database().ref('recipes').orderByChild('id');
        ref.on('value', (snapshot) => {
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

            // call the method to update state in App.js component.
            this.setState({
                lastID: recipeList[recipeList.length-1].id,
            });
        }); // end of the on method
    }

    saveRecipe = () => {
        firebase.database().ref('recipes/' + (this.state.lastID + 1)).set({
            id: (this.state.lastID + 1),
            title: this.state.recipeTitle,
            instructions: this.state.recipeInstructions,
            ingredients: this.state.recipeIngredients,
            labels: this.state.recipeLabels,
        }).then(r => console.log("YES"));

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
                    {/*
                    <div className="form-group">
                        <label htmlFor="inputTitle">Picture</label>
                        <input type="file" className="form-control" id="recipeTitle" placeholder="Upload you pic"
                               onChange={this.handleChange}/>
                    </div>
                     */}
                    <div className="form-group">
                        <label htmlFor="inputTitle">Recipe title:</label>
                        <input required type="text" className="form-control" id="recipeTitle" placeholder="Write the title"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSteps">Steps:</label>
                        <textarea required type="text" className="form-control" id="recipeInstructions" placeholder="Write the steps"/>
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