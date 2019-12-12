import React from 'react';
import './styling/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/views/homepage';
import Header from './components/header';
import myrecipesView from './components/views/myrecipesView';
import recipeView from './components/views/recipeView';
import help from './components/views/helpView';
import recipeCreate from "./components/views/recipeCreate";
import error from "./components/views/errorView";
import firebase from "firebase";
import fbconfig from "./firebase";
import ingredientView from "./components/views/ingredientView";

class App extends React.Component {
    constructor(props) {
        super();
        firebase.initializeApp(fbconfig);
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/" component={Homepage} exact />
                    <Route path="/recipes" component={myrecipesView}/>
                    <Route path="/recipe/:recipeID" component={recipeView}/>
                    <Route path="/ingredient/:ingrID" component={ingredientView}/>
                    <Route path="/create" component={recipeCreate}/>
                    <Route path="/help" component={help}/>
                    <Route path="/404error" component={error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
