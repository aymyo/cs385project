import React from 'react';
import { NavLink } from 'react-router-dom';

export default class recipeView extends React.Component {
    state = {}

    render() {
        const params = this.props.match;
        return (
            <div className="view view-recipe">
                <h3 className="title">View recipe {params.recipeID}</h3>
            </div>
        );
    }

}