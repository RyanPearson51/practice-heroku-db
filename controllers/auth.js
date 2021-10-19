const axios = require('axios')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
const { checkJwt } = require('../middleware')
const jwtSecret = process.env.secretcode;

// for bcrypt
/*
const saltRounds = 10

 const signup = (req, res) => {
   const { username, p_word } = req.body
   let sql = "INSERT INTO users (username, p_word) VALUES (?, ?)"

   
     sql = mysql.format(sql, [ username, p_word ])
  {
     pool.query(sql, (err, result) => {
       if (err) {
         if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username is taken')
         return handleSQLError(res, err)
       }
       axios(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    method: 'POST',
    //headers: {
      //'content-type': 'application/json'
    //},
    data: {
      //grant_type: 'password',
      username: username,
      password: p_word,
      //audience: process.env.AUTH0_IDENTITY,
      connection: 'Username-Password-Authentication',
      //client_id: process.env.AUTH0_CLIENT_ID,
      //client_secret: process.env.AUTH0_CLIENT_SECRET
    }
     })
     .then(response => {
        const { access_token } = response.data
        res.json({
          access_token
        })
      })
      .catch(e => {
        res.send(e)
      })
   })}}
 

const login = (req, res) => {
  const { username, p_word } = req.body

  axios(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: {
      grant_type: 'password',
      username: username,
      password: p_word,
      audience: process.env.AUTH0_IDENTITY,
      connection: 'Username-Password-Authentication',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET
    }
    
  })
  
  .then(response => {
    const { access_token } = response.data
    res.json({
      access_token
    })
  })
  .catch(e => {
    res.send(e)
  })

   let sql = "SELECT * FROM users WHERE username = ?"
   sql = mysql.format(sql, [ username ])

   pool.query(sql, (err, rows) => {
     if (err) return handleSQLError(res, err)
     if (!rows.length) return res.status(404).send('No matching users')

     const hash = rows[0].p_word
     bcrypt.compare(p_word, hash)
       .then(result => {
         if (!result) return res.status(400).send('Invalid password')

         const data = { ...rows[0] }
         data.p_word = 'REDACTED'

         const token = jwt.sign(data, 'secret')
         res.json({
           msg: 'Login successful',
           token
         })
       })
   })
}

*/
let signup = (req,res) => {
  console.log("POST /createUser", req.body.username);

  let username = req.body.username;
  let password = req.body.p_word;
  
  let passHash = bcrypt.hashSync(password,5);
  console.log(passHash, password);
  let sql = "INSERT INTO users( username, p_word) VALUES (?,?)";
  pool.query(sql, [username,passHash], (err,rows) => {
      if(err){
          console.log("failed to create user", err);
          res.status(500).send("Failed to create user");
      }else{
          res.send("User Created");
      }
  });
}

let login = (req,res) => {
  console.log("-POST login-->", req.body.username);
  const username = req.body.username;
  const password = req.body.p_word;
  pool.query("SELECT username, p_word FROM users WHERE username = ?", [username], (err,rows)=>{
      let goodPassword = false;
      if(err){
          console.error("DB query error-->", err)
      }
      if(!rows.length){
          console.log("Could not find row with that user-->",username);
      }
      if(!err && rows.length == 1){
          let row = rows[0];
          let hash = row.p_word;
          console.log('password:', password,'hash:', hash)
          role = row.role;
          goodPassword = bcrypt.compareSync(password, hash);
      }
      if(goodPassword){
          const unsignedToken = {
              username : username,
              role : role
          }
          const accessToken = jwt.sign(unsignedToken, jwtSecret);
          res.send(accessToken);
          consle.log('logged in')
      }else{
          res.status(401).send("Not Authorized");
      }
  });
  

}

module.exports = {
  signup,
  login
}

