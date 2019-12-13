import React from 'react';
import SearchBar from '../searchBar'
import firebase from "firebase";
import {round} from '../../util';

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

            //Check for the last ID used
            let lastID
            if(!recipeList[recipeList.length-1]){
                lastID = 0;
            }else{
                lastID = recipeList[recipeList.length-1].id;
            }
            // call the method to update state in App.js component.
            this.setState({
                lastID: lastID,
            });
        }); // end of the on method
    }

     saveRecipe = async () => {
        if( (this.state.recipeTitle !== '') &&
            (this.state.recipeInstructions !== '') &&
            (this.state.recipeIngredients !== [])){
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
            console.log("Error");
            this.setState({
                error: "Required inputs are empty",
            });

        }
    }

    //Adds a new ingredient to the list
    addIngredient = (ingredient) => {
        console.log(ingredient);
        let newIngredientlist = this.state.recipeIngredients.concat(ingredient);

        //Recalculates nutrition of the recipe
        let recipeNutrition = newIngredientlist.reduce((acc,cv)=> {
            return acc ={
                cal: acc.cal + cv.cal,
                carbs: acc.carbs + cv.carbs,
                fat: acc.fat + cv.fat,
                pro: acc.pro + cv.pro,
                qty: acc.qty + cv.qty,
            };

        })

        recipeNutrition = {
            cal: round(recipeNutrition.cal,2),
            carbs: round(recipeNutrition.carbs,2),
            fat: round(recipeNutrition.fat,2),
            pro: round(recipeNutrition.pro,2),
            qty: round(recipeNutrition.qty,2),
        }

        console.log(recipeNutrition);
        this.setState({
            recipeIngredients: newIngredientlist,
            recipeNutrition: recipeNutrition,
        });
    }

     delIngredient = (labelDeleted) => {
        let newIngredientlist;

        //Takes out of the array the item with the same label
        newIngredientlist = this.state.recipeIngredients.filter((value, index, arr) => {
            return value.label !== labelDeleted;
        });
        let recipeNutrition;

         //Recalculates nutrition of the recipe
         if(newIngredientlist.length > 1){
              recipeNutrition = newIngredientlist.reduce((acc,cv)=> {
                 return acc ={
                     cal: acc.cal + cv.cal,
                     carbs: acc.carbs + cv.carbs,
                     fat: acc.fat + cv.fat,
                     pro: acc.pro + cv.pro,
                     qty: (+acc.qty) + (+cv.qty),
                 };

             });
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
                                    <li key={"food"+index} >
                                       - {obj.label} ({obj.qty}g) <span className="delete" onClick={() => this.delIngredient(obj.label)}>X</span>
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