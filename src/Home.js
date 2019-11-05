import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                {this.renderProfileOrLoginButton()}
            </div>
        );
    }

    renderProfileOrLoginButton = () => {
        const {isAuthenticated, login} = this.props.auth;
        let link;
        if(isAuthenticated()) {
            link = <Link to='/profile'>View profile</Link>;
        } else {
            link = <button onClick={login}>Log In</button>;
        }
        return link;
    };
}

export default Home;
