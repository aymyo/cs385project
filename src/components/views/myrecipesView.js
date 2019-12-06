import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default class recipesView extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view myrecipes">
                <h3 className="title">My recipes</h3>

                <div className="search-results">

                    <div className="recipe-preview">
                        <div className="recipe-pic">
                            <img className="image" src={'../../public/spaghetti.jpg'}></img>
                            <FontAwesomeIcon icon={faCamera} className="icon"></FontAwesomeIcon>
                        </div>


                        <div className="api-item">
                            <h3 className="food-title">Spaghetti{this.props.label} <b className="food-qty">(200{this.props.qty} g)</b></h3>
                            <div className="food-info" id={"foodNutr"+this.props.index}>
                                <div className="info-line">
                                    <p className="info-item"><b className="nutrient-name">Calories</b>1204 {this.props.cal}kcal</p>
                                    <p className="info-item"><b className="nutrient-name">Fat</b> 213{this.props.fat}g</p>
                                </div>
                                <div className="info-line">
                                    <p className="info-item"><b className="nutrient-name">Carbs</b> 123{this.props.carbs}g</p>
                                    <p className="info-item"><b className="nutrient-name">Protein</b> 123{this.props.pro}g</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="recipe-preview">
                        <div className="recipe-pic">
                            <img className="image" src={'../../public/spaghetti.jpg'}></img>
                            <FontAwesomeIcon icon={faCamera} className="icon"></FontAwesomeIcon>
                        </div>


                        <div className="api-item">
                            <h3 className="food-title">Spaghetti{this.props.label} <b className="food-qty">(200{this.props.qty} g)</b></h3>
                            <div className="food-info" id={"foodNutr"+this.props.index}>
                                <div className="info-line">
                                    <p className="info-item"><b className="nutrient-name">Calories</b>1204 {this.props.cal}kcal</p>
                                    <p className="info-item"><b className="nutrient-name">Fat</b> 213{this.props.fat}g</p>
                                </div>
                                <div className="info-line">
                                    <p className="info-item"><b className="nutrient-name">Carbs</b> 123{this.props.carbs}g</p>
                                    <p className="info-item"><b className="nutrient-name">Protein</b> 123{this.props.pro}g</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}