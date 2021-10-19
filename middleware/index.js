const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');
let express = require('express'); 
let app = express();
app.use(express.json())
const jwtSecret = process.env.secretcode;

const logger = () => {}

/*
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
});*/

let isAdmin = (req,res,next) => {
  req.isAdmin ? next() : res.status(401).send("Not Authorized");
}


let checkJwt = (req,res,next) => {
  console.log("JWT authentication");

  let token;
  if(req.headers.authorization){
      let bearer = req.headers.authorization.split(" ");
      token = bearer[1];
  }else{ 
      token = null;
  }

  if(!token){
      return res.status(401).send("Not Authorized");
  }

  jwt.verify(token, jwtSecret, (error,decoded) => {
      if(error){
          console.log("Could not verify jwt", error);
          return res.status(401).send("Not Authorized");
      }
      console.log("decoded user-->",decoded);
      req.userName = decoded.username;
      req.isAdmin = decoded.role == 'admin';
      console.log("checkjwt isAdmin-->",req.isAdmin)
      next();
  });
}

module.exports = {
  logger,
  checkJwt
}