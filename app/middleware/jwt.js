const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});

module.exports = checkJwt;