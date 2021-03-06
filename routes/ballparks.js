const express = require('express');

const router = express.Router();
const { checkJwt } = require('../middleware')

const controller = require('../controllers/ballparks')

//GET ballparks
//show all ballparks
router.get('/ballparks', controller.listBallparks)

//GET ballparks/:team
//show specific ballpark by team
router.get('/ballparks/:team', controller.showBallpark)

//POST ballparks
//create a new ballpark
router.post('/ballparks', checkJwt, controller.createBallpark)

//update ballparks
//update a single ballpark in the database
router.put('/ballparks/:team', checkJwt, controller.updateBallpark)


module.exports = router;
////