import React from 'react';
import './styling/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/views/homepage';
import Header from './components/header';
import recipeList from './components/views/recipeList';
import recipeView from './components/views/recipeView';
import help from './components/views/helpView';
import recipeCreate from "./components/views/recipeCreate";
import error from "./components/views/errorView";
import firebase from "firebase/app";
import fbconfig from "./firebase";
//import ingredientView from "./components/views/ingredientView";

class App extends React.Component {
    constructor(props) {
        super(props);

        //Initializes the database
        firebase.initializeApp(fbconfig);
    }

    render() {
        //Routing for all the pages of our App
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/" component={Homepage} exact />
                    <Route path="/recipes" component={recipeList}/>
                    <Route path="/recipe/:recipeID" component={recipeView}/>
                    {/*<Route path="/ingredient/:ingrID" component={ingredientView}/>*/}
                    <Route path="/create" component={recipeCreate}/>
                    <Route path="/help" component={help}/>
                    <Route component={error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
