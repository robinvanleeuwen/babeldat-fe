import './App.css';
import 'fontsource-roboto';
import * as React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Menu from './components/Menu.js';
import Model from './components/Models.js';

function App(props) {

  
  return (
    <div id="root" className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login<small>(Access without token only)</small>
          </NavLink>
          <NavLink activeClassName="active" to="/menu">
            Menu<small>(Access with token only)</small>
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <PublicRoute exact path="/" component={Home} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/model/:modelname" component={Model} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
    
  );
};


export default App;
