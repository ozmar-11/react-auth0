import React, {Component} from 'react';

class Profile extends Component {
    state = {
        profile: null,
        error: ''
    };

    componentDidMount() {
        this.loadUserProfile();
    }

    isAdmin(roles) {
        return roles.includes('admin');
    }

    loadUserProfile() {
        this.props.auth.getProfile( (profile, error) => {
            const roles = !error ? profile[`${process.env.REACT_APP_URL}/roles`] : [];
            this.setState({profile, error});
            if(this.isAdmin(roles))
                console.log(roles);
        });
    }

    render() {
        const {profile} =  this.state;

        if(!profile) return null;

        return (
            <>
                <h1>Profile</h1>
                <p>{profile.nickname}</p>
                <img
                    style={{maxWidth: 50, maxHeight: 50}}
                    src={profile.picture}
                    alt='Profile pic'
                />
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            </>
        );
    }
}

export default Profile;
