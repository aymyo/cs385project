import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="header-view">
                    <button className="navbar-toggler h-toggle" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon my-toggler"></span>
                    </button>
                    <span className="h-title"><b>Nutri</b>meal</span>
                    <FontAwesomeIcon icon={faUser} className="h-user" ></FontAwesomeIcon>
                </div>

                <div className="col-sm-3 text-center header-navbar" id="dropdown">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <nav className="nav navbar-nav h-links">
                            <span className="header-link">
                                <NavLink to='/'>Home</NavLink>
                            </span>
                            <span className="header-link">
                                <NavLink to='/create'>Create recipe</NavLink>
                            </span>
                            <span className="header-link">
                                <NavLink to='/recipes'>My recipes</NavLink>
                            </span>
                            <span className="header-link">
                                <NavLink to='/help'>Help</NavLink>
                            </span>
                        </nav>
                    </div>
                </div>

            </header>
        );
    }
}