import React from 'react';
import SearchBar from '../searchBar'

export default class Homepage extends React.Component {
    state = {

    }

    render() {
        return (
                <div className="view home">
                    <h3 className="title"><b className="bold">Search</b> for <br/>ingredients</h3>
                    <SearchBar/>
                </div>
        );
    }
}