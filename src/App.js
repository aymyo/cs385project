import React from 'react';
import './styling/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/views/homepage';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Homepage} exact />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
