import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../../images/brokenphone.png';

export default class errorView extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="view 404-page">
                <h3 className="title">404 Not found</h3>
                <h5>Uh Oh...! Sorry, the page you were looking for doesn't exist.</h5>
                <br/><p>You might have typed in the wrong address or the page has moved. In the meantime, try again or
                    return to the homepage :)</p>
                <br/>
                <img className="image" src={image}></img>

                <div className="menuError">
                    <span className="header-link">
                        <NavLink to='/'>Home</NavLink>
                    </span>
                </div>


            </div>
        );
    }
}