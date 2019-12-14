import React from 'react';
import SearchBar from '../searchBar'

/* This component is our homepage
* The user can use the SearchBar to look for ingredients and their nutrition*/
export default class Homepage extends React.Component {
    state = {

    }

    render() {
        return (
                <div className="view home">
                    <h3 className="title"><b className="bold">Search</b> for </h3>
                    <h3 className="title line2">ingredients</h3>
                    <SearchBar callback={() => console.log("click")} color={"blue"}/>
                </div>
        );
    }
}