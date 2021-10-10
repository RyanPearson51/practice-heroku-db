const axios = require('axios')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// for bcrypt
const saltRounds = 10

 const signup = (req, res) => {
   const { username, p_word } = req.body
   let sql = "INSERT INTO users (username, p_word) VALUES (?, ?)"

   bcrypt.hash(p_word, saltRounds, function(err, hash) {
     sql = mysql.format(sql, [ username, hash ])
  
     pool.query(sql, (err, result) => {
       if (err) {
         if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username is taken')
         return handleSQLError(res, err)
       }
       return res.send('Sign-up successful')
     })
   })
 }

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

module.exports = {
  signup,
  login
}