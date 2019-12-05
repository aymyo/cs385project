import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return (
            <div>
            <header className="provisional-header">Header
                <span className="header-link">
                    <NavLink to='/'>Home</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/recipes'>My recipes</NavLink>
                </span>
            </header>
            <header className="header">
                <nav className="navbar navbar-light bg-light">
                    <div className="col-sm-3 text-center" id="dropdown">
                        <div className="pos-f-t">
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse" id="navbarToggleExternalContent">
                                <div className="bg-light p-4 text-black">
                                    <ul className="nav navbar-nav">
                                        <li className="active">
                                            <span className="header-link">
                                                <NavLink to='/'>Home</NavLink>
                                            </span></li>
                                        <li>Add a recipe</li>
                                        <li>
                                            <span className="header-link">
                                                <NavLink to='/recipes'>My recipes</NavLink>
                                            </span>
                                        </li>
                                        <li>Help</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center" id="appName">
                        <h3><b>Nutri</b>meal</h3>
                    </div>
                    <div className="col-sm-3 text-center">
                        <span className="glyphicon glyphicon-user">   Login(?)</span>
                    </div>

                </nav>

            </header>
            </div>
        );
    }
}