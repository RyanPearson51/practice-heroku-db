const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserByUsername = (req, res) => {
  let sql = "SELECT * FROM users WHERE username = ?"
  sql = mysql.format(sql, [ req.params.username ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

/*const createUser = (req, res) => {
  const { username, p_word, email } = req.body
  let sql = "INSERT INTO users (username, p_word, email) VALUES (?, ?, ?)"
  sql = mysql.format(sql, [ username, p_word, email ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}*/

const deleteUserByUsername = (req, res) => {
  let sql = "DELETE FROM users WHERE username = ?"
  sql = mysql.format(sql, [ req.params.username ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  //createUser,
  deleteUserByUsername
}