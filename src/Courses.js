import React, {Component} from 'react';

class Courses extends Component {
    state = {
        courses: []
    };

    componentDidMount() {
        const { getAccessToken } = this.props.auth;
        fetch('/courses', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then( response => {
            if(response.ok) return response.json();
            throw new Error('Network response was not ok');
        }).
        then(response => this.setState({courses: response.courses})).
        catch(response => this.setState({courses: [], message: response.message}));

        fetch('/admin', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then( response => {
            if(response.ok) return response.json();
            throw new Error('Network response was not ok');
        }).
        then(response => console.log(response)).
        catch(response => console.log(response));
    }

    render() {
        return (
            <ul>
                {this.state.courses.map(course => {
                    return <li key={course.id}>{course.title}</li>;
                })}
            </ul>
        );
    }
}

export default Courses;
