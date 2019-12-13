import React from 'react';
import SearchBar from '../searchBar'
import firebase from "firebase";
import {round} from '../../util';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

/* This component is displayed whenever the user goes to the path "/create"
* It shows a form where you can add the recipe title and instructions, and a SearchBar for searching for ingredients-
* Whenever you click and ingredient it gets added to the list and it calculates the total nutrition of the recipe*/
export default class recipeCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: '',
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

    //Change the state when the content changed in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        //We get all the recipes of the database to get the last ID used
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

            //Check for the last ID used
            let lastID
            if(!recipeList[recipeList.length-1]){
                lastID = 0;
            }else{
                lastID = recipeList[recipeList.length-1].id;
            }

            // call the method to update state in App.js component.
            if(this._isMounted) {
                this.setState({
                    lastID: lastID,
                });
            }
        }); // end of the on method
    }

    /* This function saves the recipe into the database and redirects the user to the recipeView */
     saveRecipe = async () => {

         //First we check that the user has inputed all the
         //requiered inputs and that there's at least 1 ingredient added
        if( (this.state.recipeTitle !== '') &&
            (this.state.recipeInstructions !== '') &&
            (this.state.recipeIngredients.length > 0)){

                //We add the new recipe into the database
                await firebase.database().ref('recipes/' + (this.state.lastID + 1)).set({
                    id: (this.state.lastID + 1),
                    title: this.state.recipeTitle,
                    instructions: this.state.recipeInstructions,
                    ingredients: this.state.recipeIngredients,
                    nutrition: this.state.recipeNutrition,
                    labels: this.state.recipeLabels,
                }).then(r => {
                    this.setState({
                        error: '',
                    });
                    console.log("Recipe created");
                    let url= "/recipe/"+(this.state.lastID);
                    this.props.history.push(url);
                }
                );
        }else{
            // If the user didnt fill the inputs or didnt add an ingredient, it will show an alert
            console.log("Error");
            this.setState({
                error: "Required inputs are empty",
            });
        }
    }

    //Adds a new ingredient to the list
    addIngredient = (ingredient) => {
        console.log(ingredient);
        //Add the ingredient to the list
        let newIngredientlist = this.state.recipeIngredients.concat(ingredient);

        //Recalculates nutrition of the recipeList
        let recipeNutrition = newIngredientlist.reduce((acc,cv)=> {
            return acc ={
                cal: acc.cal + cv.cal,
                carbs: acc.carbs + cv.carbs,
                fat: acc.fat + cv.fat,
                pro: acc.pro + cv.pro,
                qty: (+acc.qty) + (+cv.qty),
            };
        });

        //We round the numbers
        recipeNutrition = {
            cal: round(recipeNutrition.cal,2),
            carbs: round(recipeNutrition.carbs,2),
            fat: round(recipeNutrition.fat,2),
            pro: round(recipeNutrition.pro,2),
            qty: round(recipeNutrition.qty,2),
        }

        console.log(recipeNutrition);
        //We update the state
        this.setState({
            recipeIngredients: newIngredientlist,
            recipeNutrition: recipeNutrition,
        });
    }

    //Deletes an ingredient from the list
     delIngredient = (labelDeleted) => {
        let newIngredientlist;

        //Takes out of the array the item with the same label
        newIngredientlist = this.state.recipeIngredients.filter((value, index, arr) => {
            return value.label !== labelDeleted;
        });
        let recipeNutrition;

         //Recalculates nutrition of the recipeList
         if(newIngredientlist.length > 0){
              recipeNutrition = newIngredientlist.reduce((acc,cv)=> {
                 return acc ={
                     cal: acc.cal + cv.cal,
                     carbs: acc.carbs + cv.carbs,
                     fat: acc.fat + cv.fat,
                     pro: acc.pro + cv.pro,
                     qty: (+acc.qty) + (+cv.qty),
                 };

             });
             recipeNutrition = {
                 cal: round(recipeNutrition.cal,2),
                 carbs: round(recipeNutrition.carbs,2),
                 fat: round(recipeNutrition.fat,2),
                 pro: round(recipeNutrition.pro,2),
                 qty: round(recipeNutrition.qty,2),
             }
         } else { //If there's only 1 item and we remove it, nutrition sets to 0
             recipeNutrition = 0;
         }

         console.log(recipeNutrition);
         //We update the list of ingredients and the nutrition
         this.setState({
             recipeIngredients: newIngredientlist,
             recipeNutrition:recipeNutrition,
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
                        <label htmlFor="recipeTitle">Recipe name:</label>
                        <input required type="text" className="form-control shadow-none" id="recipeTitle"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipeInstructions">Instructions:</label>
                        <textarea required type="text" className="form-control shadow-none" id="recipeInstructions"
                                  onChange={this.handleChange}/>
                    </div>
                    <div id="ingredients">
                        <label>Ingredients:</label>
                        <ul>
                            {this.state.recipeIngredients.map((obj,index) => {
                                return (
                                    <li key={"food"+index} className="ingredient">
                                       - {obj.label} ({obj.qty}g)
                                        <FontAwesomeIcon
                                            className="delete"
                                            onClick={() => this.delIngredient(obj.label)}
                                            icon={faTimes}
                                        >
                                        </FontAwesomeIcon>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="api-item nutrition" >
                        <h3 className="food-title">Nutrition <b className="food-qty">({this.state.recipeNutrition.qty} g)</b></h3>
                        <div className="food-info" id={"foodNutr"+this.props.index}>
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Calories</b>{this.state.recipeNutrition.cal}kcal</p>
                                <p className="info-item"><b className="nutrient-name">Fat</b>{this.state.recipeNutrition.fat}g</p>
                            </div>
                            <div className="info-line">
                                <p className="info-item"><b className="nutrient-name">Carbs</b>{this.state.recipeNutrition.carbs}g</p>
                                <p className="info-item"><b className="nutrient-name">Protein</b>{this.state.recipeNutrition.pro}g</p>
                            </div>
                        </div>
                    </div>
                    <div id="search_bar_ingredients">
                        <SearchBar insideRecipe={true} callback={this.addIngredient}/>
                    </div>

                    {Object.is('',this.state.error) ? (
                        <span className="btn btn-save" onClick={this.saveRecipe}>Save</span>
                    ): (
                        <span className="btn btn-save error" onClick={this.saveRecipe}>Save</span>
                    )}
                </form>
            </div>
        );
    }
}