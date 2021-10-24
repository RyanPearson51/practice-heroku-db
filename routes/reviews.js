const express = require('express')
const reviewsController = require('../controllers/reviews')
const { checkJwt } = require('../middleware')
const router = express.Router()

router.get('/reviews', reviewsController.listReviews)

router.get('/reviews/:ballpark_id', reviewsController.showReview)

router.post('/reviews', reviewsController.createReview)


module.exports = router
