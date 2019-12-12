import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUtensilSpoon } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="header-view">
                    <span className="h-left" ></span>
                    <span className="h-title"><b>Nutri</b>meal</span>
                    <button className="navbar-toggler h-toggle" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon my-toggler"></span>
                    </button>
                </div>

                <div className="col-sm-3 text-center header-navbar" id="dropdown">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <nav className="nav navbar-nav h-links">
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/'><FontAwesomeIcon icon={faHome} className="h-user" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/create'><FontAwesomeIcon icon={ faUtensilSpoon } className="h-user" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/recipes'><FontAwesomeIcon icon={faBook} className="h-user" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/help'><FontAwesomeIcon icon={faQuestionCircle} className="h-user" ></FontAwesomeIcon></NavLink>
                            </span>

                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}