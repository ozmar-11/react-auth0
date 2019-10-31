import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './Profile';
import Nav from './Nav';
import Home from "./Home";
import Auth from "./Auth/Auth";
import Callback from "./Callback";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render () {
    return <>
      <Nav/>
      <div className="body">
        <Route path="/" exact
               render={ props => <Home auth={this.auth} {...props} /> }
        />
        <Route path="/profile" component={Profile}/>
        <Route path="/callback"
               render={ props => <Callback auth={this.auth} {...props} /> }
        />
      </div>
    </>;
  }
}

export default App;
