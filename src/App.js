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
        <div className="content">  
        <div className="row">
            <div className="column-small" id="leftblock">
              <Menu />
            </div>
            <div className="column-medium" id="mainblock">
              <Model modelname="client" />
            </div>
            <div className="column-small" id="rightblock">
              This is the right block.
            </div>
        </div>
        </div>
    </div>
    
  );
};


export default App;
