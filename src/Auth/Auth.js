import auth0 from 'auth0-js';

const REDIRECT_ON_LOGIN = 'redirect_on_login';

let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;

class Auth {
    constructor(history) {
        this.history = history;
        this.requestedScopes = 'openid profile email read:courses';
        this.auth0 = new auth0.WebAuth({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
            responseType: 'token id_token',
            scope: this.requestedScopes
        });
    }

    login = () => {
        localStorage.setItem(REDIRECT_ON_LOGIN, JSON.stringify(this.history.location));
        this.auth0.authorize();
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if(authResult && authResult.accessToken && authResult.idToken) {
                const redirectUrl = localStorage.getItem(REDIRECT_ON_LOGIN);
                this.setSession(authResult);
                const redirectLocation = redirectUrl === 'undefined' ? '/' : JSON.parse(redirectUrl);
                this.history.push(redirectLocation);
            } else if(err)  {
                this.history.push('/');
                alert(`Error ${err.error} check console`);
                console.log(err);
            }
            localStorage.removeItem(REDIRECT_ON_LOGIN);
        });
    };

    setSession = authResult => {
        _expiresAt = authResult.expiresIn * 100 + new Date().getTime();

        _scopes = authResult.scope || this.requestedScopes || '';

        _accessToken = authResult.accessToken;
        _idToken = authResult.idToken;
        this.scheduleTokenRenewal();
    };

    isAuthenticated() {
        return new Date().getTime() < _expiresAt;
    }

    logout = () => {
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: 'http://localhost:3000'
        });
    };

    getAccessToken = () => {
        if(!_accessToken) {
            throw new Error('No access token found.');
        }
        return _accessToken;
    };

    getProfile = cb => {
        if(this.userProfile) return cb(this.userProfile);
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            if(profile) this.userProfile = profile;
            cb(profile, err);
        });
    };

    userHasScopes(scopes) {
        const grantedScopes = (_scopes || '').split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }

    renewToken = (callback) => {
        this.auth0.checkSession({}, (err, result) => {
            if(err) {
                console.log(`Error ${err.error} - ${err.error_description}.`);
            } else {
                this.setSession(result);
            }
            if(callback) callback(err,result);
        });
    };

    scheduleTokenRenewal = () => {
        const delay = _expiresAt - Date.now();
        if(delay > 0) setTimeout(() => this.renewToken(), delay);
    };
}

export default Auth;
