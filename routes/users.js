const express = require('express')
const usersController = require('../controllers/users')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/users', usersController.getAllUsers)

router.get('/users/:username', usersController.getUserByUsername)

//router.post('/users', checkJwt, usersController.createUser)

router.delete('/users/:username', checkJwt, usersController.deleteUserByUsername)

module.exports = router
