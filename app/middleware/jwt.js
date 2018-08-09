// noinspection JSValidateTypes
/** @type AppConfig */
const config = require("config");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.auth0.domain}.well-known/jwks.json`
    }),
    aud: config.auth0.apiIdentifier,
    issuer: config.auth0.domain,
    algorithms: ["RS256"]
});

module.exports = checkJwt;
