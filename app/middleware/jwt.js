const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports.checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});