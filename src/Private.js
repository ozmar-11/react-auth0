import React, {Component} from 'react';

class Private extends Component {
    state = {
        message: ''
    };

    componentDidMount() {
        const { getAccessToken } = this.props.auth;
        fetch('/private', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then( response => {
            if(response.ok) return response.json();
            throw new Error('Network response was not ok');
        }).
        then(response => this.setState({message: response.message})).
        catch(response => this.setState({message: response.message}));
    }

    render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}

export default Private;
