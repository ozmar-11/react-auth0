import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Profile from './Profile';
import Nav from './Nav';
import Home from "./Home";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    const {renewToken} = this.state.auth;
    renewToken(() =>
        this.setState({...this.state, renewToken: true})
    );
  }

  render () {
    const {auth, tokenRenewalComplete} = this.state;
    if(tokenRenewalComplete) return 'Loading...';

    return <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className="body">
        <Route path="/" exact
               render={ props => <Home auth={auth} {...props} /> } />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/callback" render={ props => <Callback auth={auth} {...props} /> } />
        <Route path="/public" component={Public} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
        />
      </div>
    </AuthContext.Provider>;
  }
}

export default App;
