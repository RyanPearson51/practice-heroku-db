const express = require('express')
const reviewsController = require('../controllers/reviews')
const { checkJwt } = require('../middleware')
const router = express.Router()


module.exports = router
