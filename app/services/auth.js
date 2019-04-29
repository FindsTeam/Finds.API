const jwt = require('express-jwt');
const { expressJwtSecret } = require('jwks-rsa');

const jwksUri = `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`;
const audience = `${process.env.AUTH0_CLIENT_ID}`;
const issuer = `${process.env.AUTH0_DOMAIN}`;

const secret = expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri,
});

const validateAuthToken = jwt({
  secret,
  audience,
  issuer,
  algorithms: ['RS256'],
});

const formatUnauthorizedErrorMiddleware = function formatUnauthorizedErrorMiddleware(
  err,
  req,
  res,
  next,
) {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).json(err);
    return;
  }

  next();
};

module.exports.validateAuthToken = validateAuthToken;
module.exports.formatUnauthorizedErrorMiddleware = formatUnauthorizedErrorMiddleware;
