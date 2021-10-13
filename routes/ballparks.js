const express = require('express');

const router = express.Router();
const { checkJwt } = require('../middleware')

const controller = require('../controllers/ballparks')

//GET users
//show all users
router.get('/ballparks', controller.listBallparks)

//GET users/:name
//show specific user by name
router.get('/ballparks/:team', controller.showBallpark)

//POST users
//create a new ballpark
router.post('/ballparks', checkJwt, controller.createBallpark)

//update users
//update a single ballpark in the database
router.put('/ballparks/:team', checkJwt, controller.updateBallpark)


module.exports = router;
////