import React from 'react';
import './styling/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/views/homepage';
import Header from './components/header';
import myrecipesView from './components/views/myrecipesView';

function App() {
  return (
      <BrowserRouter>
          <Header/>
        <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/recipes" component={myrecipesView}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
