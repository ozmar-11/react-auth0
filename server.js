const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt'); // Validate JWT and set req.user
const jwksRsa = require('jwks-rsa'); // Retrive RAS keys from a JSON Web Key set (JWKS) endpoint
const checkScope = require('express-jwt-authz'); // validate jwt scopes

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

const checkRole = (role) => {
    return function(request, result, next) {
        const assignedRoles = request.user[`${process.env.REACT_APP_URL}/roles`];
        if(Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
            return next();
        } else {
            return result.status(401).send('Insufficient role');
        }
    };
};

const app = express();

app.get('/public', function(request, response) {
    response.json({
        message: 'Hello from public API'
    });
});

app.get('/private', checkJwt, function(request, response) {
    response.json({
        message: 'Hello from private API'
    });
});

app.get('/courses', checkJwt, checkScope(['read:courses']), function(request, response) {
    response.json({
        courses: [
            {id: 1, title: 'Building apps with react redux'},
            {id: 2, title: 'Creating reusable react components'}
            ]
    });
});

app.get('/admin', checkJwt, checkRole('admin'), function(request, response) {
    response.json({
        message: 'Hello from admin API'
    });
});

app.listen(3001);
console.log(`API server listening on ${process.env.REACT_APP_API_URL}`);
