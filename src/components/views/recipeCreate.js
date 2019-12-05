import React from 'react';
import SearchBar from '../searchBar'
import { NavLink } from 'react-router-dom';

export default class recipeCreate extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view create-recipe">
                <h3><br/><b>Create recipe</b></h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Recipe title:</label>
                        <input type="text" className="form-control" id="inputTitle" placeholder="Write the title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSteps">Steps:</label>
                        <textarea type="text" className="form-control" id="inputSteps" placeholder="Write the steps"/>
                    </div>
                    <div id="ingredients">
                        <h7>Ingredients:</h7>
                        <br/>
                    </div>
                    <div id="search_bar_ingredients">
                        <SearchBar/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Save</button>
                </form>
            </div>
        );
    }
}