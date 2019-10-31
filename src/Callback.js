import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Callback extends Component {
    componentDidMount() {
        if(/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error('Inavlid callback URL.');
        }
    }

    render() {
        return (
            <h1>
                Loading...
            </h1>
        );
    }
}

Callback.propTypes = {};

export default Callback;
