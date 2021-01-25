
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MyContainer from './container/MyContainer';
import List from './list/List';
import { BrowserRouter, Switch, Route } from 'react-router-dom' ;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={MyContainer} />
      <Route path="/users" component={List} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

