import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUtensilSpoon, faBars, faBook, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

/* This component is displayed always on the top of the screen
* It shows the header menu, with the App name, and the toggle menu button. The user can click it to unfold the menu
* and navigate through the app by clicking the links.*/
export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="header-view">
                    <span className="h-left" ></span>
                    <span className="h-title"><b className="title-bold">Nutri</b>meal</span>
                    <button className="navbar-toggler h-toggle collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon className="navbar-toggler-icon my-toggler" icon={faBars}/>
                    </button>
                </div>

                <div className="color-bar"></div>

                <div className="col-sm-3 text-center header-navbar" id="dropdown">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <nav className="nav navbar-nav h-links">
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/'><FontAwesomeIcon icon={faHome} className="home-link" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/create'><FontAwesomeIcon icon={ faUtensilSpoon } className="create-link" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/recipes'><FontAwesomeIcon icon={faBook} className="recipes-link" ></FontAwesomeIcon></NavLink>
                            </span>
                            <span className="header-link" data-toggle="collapse"
                                  data-target="#navbarToggleExternalContent">
                                <NavLink to='/help'><FontAwesomeIcon icon={faQuestionCircle} className="help-link" ></FontAwesomeIcon></NavLink>
                            </span>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}