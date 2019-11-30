import React from 'react';
import './styling/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/views/homepage';
import Header from './components/header';
import myrecipesView from './components/views/myrecipesView';
import help from './components/views/helpView';

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Switch>
              <Route path="/" component={Homepage} exact />
              <Route path="/recipes" component={myrecipesView}/>
              <Route path="/help" component={help}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
