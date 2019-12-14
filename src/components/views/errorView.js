import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../../images/brokenphone.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

/* This page is displayed whenever the user goes to a path that does not exist
* It only shows the 404 message and a link to the homepage*/
export default class errorView extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view errorpage">
                <h3 className="title">404 Not found</h3>

                <p className="bold">Uh Oh...! Sorry, the page you were looking for doesn't exist.</p>

                <div className="img-container">
                    <img className="image" src={image} alt="error"></img>

                    <p>You might have typed in the wrong address or the page has moved. In the meantime, try again or
                        return to   <NavLink to='/'>
                            Homepage <FontAwesomeIcon icon={faHome} color="black"/>
                        </NavLink>
                    </p>
                </div>


            </div>
        );
    }
}