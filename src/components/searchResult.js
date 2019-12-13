import React from 'react';

/* This component is displayed everytime the user search with the SearchBar
* It displays the results in a card styled like the nutrition in the foods. */
export default class SearchResult extends React.Component{

    //Whenever the user clicks on the label, it's added to the ingredient list of the recipe calling a callback function
    handleClick = (e) => {
        const foodObj = {
            label:this.props.label,
            cal:this.props.cal,
            fat:this.props.fat,
            pro:this.props.pro,
            carbs:this.props.carbs,
            qty: this.props.qty,
        };

        this.props.callback(foodObj);
    }


    render() {
        return(
            <div className="api-item"
                 id={this.props.id}
                 onClick={this.handleClick}
            >
                <h3 className="food-title">{this.props.label} <b className="food-qty">({this.props.qty} g)</b></h3>
                <div className="food-info" id={"foodNutr"+this.props.index}>
                    <div className="info-line">
                        <p className="info-item"><b className="nutrient-name">Calories</b>{this.props.cal}kcal</p>
                        <p className="info-item"><b className="nutrient-name">Fat</b>{this.props.fat}g</p>
                    </div>
                    <div className="info-line">
                        <p className="info-item"><b className="nutrient-name">Carbs</b>{this.props.carbs}g</p>
                        <p className="info-item"><b className="nutrient-name">Protein</b>{this.props.pro}g</p>
                    </div>
                </div>
            </div>
        )
    }

}

