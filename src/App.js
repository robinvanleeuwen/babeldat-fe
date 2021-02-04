import React, { useReducer } from 'react';
import './App.css';
import 'fontsource-roboto';
import Menu from './components/Menu.js';
import Model from './components/Models.js';
import { getToken } from './utils/Common';
import Login from './components/Login';

export const AppContext = React.createContext();

const initialState = {
  modelname: "",
}

function reducer(state, action) {
  switch (action.type) {
      case "UPDATE_INPUT":
        return {
          modelname: action.data
        };
      default:
        return initialState;
  }
}


function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!getToken()) {
    return (
      <div>
        <Login />
      </div>
    )
  }

  return (
    <div id="root" className="App">
        <div className="content">  
        <div className="row">
          <AppContext.Provider value={{state, dispatch}}>
            <div className="column-small" id="leftblock">
              <Menu />
            </div>
            <div className="column-medium" id="mainblock">
              <Model modelname="client" />
            </div>
            <div className="column-small" id="rightblock">
              This is the right block.
            </div>
          </AppContext.Provider>
        </div>
        </div>
    </div>
    
  );
};


export default App;
