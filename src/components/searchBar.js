import React from 'react';
import SearchResult from './searchResult'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {round} from '../util';


export default class searchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            results: '',
            qtyGrams: 100,
        }
    }

    //Change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    keyPressed = async (event) => {
        //Whenever the 'Search Icon' is pressed
        if (event.type === "click" || event.key === "Enter") {
            //We fetch the API for our search term
            const response = await fetch('https://api.edamam.com/api/food-database/parser?ingr='
                +this.state.searchTerm+'&app_id=a7df48c7&app_key=e9b8a833a9a9bf49ea1981cea8918ab7')
            const jsonresult = await response.json();
            console.log(jsonresult);
            //We update the state
            this.setState({
                results: jsonresult,
            })
        }
    }

    render() {
        return (
            <div className="search-container">
            <div className="search-bar">
                <input placeholder="Search..." className="search-input" id="searchTerm"
                   onKeyPress={this.keyPressed} onChange={this.handleChange}/>
                <input className="qty-input" id="qtyGrams" type="number" step="10" min="0" placeholder="100"
                       onChange={this.handleChange}></input>
                <span className="qty-label">g</span>
                <FontAwesomeIcon icon={faSearch} className="search-click" onClick={this.keyPressed}></FontAwesomeIcon>
            </div>
            <div className="search-results">
                {this.state.results.hints && this.state.results.hints!=="" ?
                    this.state.results.hints.map((obj,index) => {
                        //Checking that all the nutrients have values
                        if( (!Object.is(undefined,obj.food.nutrients.CHOCDF)) &&
                            (!Object.is(undefined,obj.food.nutrients.ENERC_KCAL)) &&
                            (!Object.is(undefined,obj.food.nutrients.FAT)) &&
                            (!Object.is(undefined,obj.food.nutrients.PROCNT)) ){
                            return (
                                <SearchResult
                                    id={"foodRes"+index}
                                    key={"foodRes"+index}
                                    index={index}
                                    label={obj.food.label}
                                    cal={round(obj.food.nutrients.ENERC_KCAL*(this.state.qtyGrams/100), 2)}
                                    fat={round(obj.food.nutrients.FAT*(this.state.qtyGrams/100), 2)}
                                    carbs={round(obj.food.nutrients.CHOCDF*(this.state.qtyGrams/100), 2)}
                                    pro={round(obj.food.nutrients.PROCNT*(this.state.qtyGrams/100), 2)}
                                    qty={this.state.qtyGrams}
                                    callback={this.props.callback}
                                />
                            );
                        }else {
                            return null;
                        }

                    }) :
                    (
                        <div>

                        </div>
                    )
                }
                {
                (this.state.results.hints && this.state.results.hints.length <= 0) ?
                    (
                        <div>
                            No results
                        </div>
                    ) : null
                }
                </div>
            </div>
        );
    }
}