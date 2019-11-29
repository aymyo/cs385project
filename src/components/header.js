import React from 'react';
//import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div>This is the HEADER</div>

                <div className="col-sm-2" id="dropdown">
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active">Home</li>
                            <li>Create a recipe</li>
                            <li>View your recipes</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-8" id="appName">
                    <h1>Hello</h1>
                </div>
                <div className="col-sm-2">
                    <h1>Bye</h1>
                </div>

            </header>
        );
    }
}