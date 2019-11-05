import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        const {isAuthenticated, userHasScopes} = this.props.auth;
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/public">Public</Link></li>
                    { isAuthenticated() && <li><Link to="/private">Private</Link></li> }
                    { isAuthenticated() && userHasScopes(['read:courses']) && <li><Link to="/courses">Courses</Link></li> }
                    {this.renderLogInOrLogOutButton()}
                </ul>
            </nav>
        );
    }

    renderLogInOrLogOutButton = () => {
        const {isAuthenticated, login, logout} = this.props.auth;
        return(<li>
            <button onClick={isAuthenticated() ? logout : login}>
                {isAuthenticated() ? 'Log Out' : 'Log In'}
            </button>
        </li>);
    };
}

Nav.propTypes = {};

export default Nav;
