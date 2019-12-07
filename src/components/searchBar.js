import React from 'react';
import SearchResult from './searchResult'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


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

    //Rounds a number to only "exp" decimals : https://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
    round = (value, exp) => {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    keyPressed = async (event) => {
        if (event.type === "click") {

            let urlFood=encodeURI(this.state.searchTerm);
            //making a hard coded post request for an apple
            const response = await fetch('https://api.edamam.com/api/food-database/parser?ingr='
                +this.state.searchTerm+'&app_id=a7df48c7&app_key=e9b8a833a9a9bf49ea1981cea8918ab7')
            const jsonresult = await response.json();
            console.log(jsonresult);
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
                        return (
                            <SearchResult
                                id={"foodRes"+index}
                                key={"foodRes"+index}
                                draggable="true"
                                index={index}
                                label={obj.food.label}
                                cal={this.round(obj.food.nutrients.ENERC_KCAL*(this.state.qtyGrams/100), 2)}
                                fat={this.round(obj.food.nutrients.FAT*(this.state.qtyGrams/100), 2)}
                                carbs={this.round(obj.food.nutrients.CHOCDF*(this.state.qtyGrams/100), 2)}
                                pro={this.round(obj.food.nutrients.PROCNT*(this.state.qtyGrams/100), 2)}
                                qty={this.state.qtyGrams}
                                callback={this.props.callback}
                            />
                        );
                    }) :
                    (
                        <div>
                            Search something! (we could add an ilustration)
                        </div>
                    )
                }
                {
                (this.state.results.hints && this.state.results.hints.length <= 0) ?
                    (
                        <div>
                            No results (we could add an ilustration)
                        </div>
                    ) : null
                }
                </div>
            </div>
        );
    }
}