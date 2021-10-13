const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');
let express = require('express'); 
let app = express();
app.use(express.json())

const logger = () => {}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_IDENTITY,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

module.exports = {
  logger,
  checkJwt
}