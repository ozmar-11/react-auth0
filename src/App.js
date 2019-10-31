import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './Profile';
import Nav from './Nav';
import Home from "./Home";

function App() {
  return <>
    <Nav/>
    <div className="body">
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile}/>
    </div>
  </>;
}

export default App;
