import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            results: '',
            qtyGrams: 100,
        }
    }

    //change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    keyPressed = async (event) => {
        if (event.key === "Enter") {

            let urlFood=encodeURI(this.state.searchTerm);
            //making a hard coded post request for an apple
            const response = await fetch('https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=a7df48c7&app_key=e9b8a833a9a9bf49ea1981cea8918ab7')
            const jsonresult = await response.json();
            console.log(jsonresult);
        }
    }

    render() {
        return (
                <div className="view home">
                    <h1>IM BRID!!!!!</h1>
                    <input placeholder="Search..." className="search-input" id="searchTerm"
                           onKeyPress={this.keyPressed} onChange={this.handleChange}/>
                </div>
        );
    }
}