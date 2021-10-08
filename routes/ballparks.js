const express = require('express');

const router = express.Router();

const controller = require('../controllers/ballparks')

//GET users
//show all users
router.get('/ballparks', controller.listBallparks)

//GET users/:id
//show specific user by id
router.get('/ballparks/:id', controller.showBallpark)

//POST users
//create a new user
router.post('/ballparks', controller.createBallpark)

//update users
//update a single user in the database
router.put('/ballparks/:id', controller.updateBallpark)

//delete user
//delete a user from the database
router.delete('/ballparks/:id', controller.deleteBallpark)


module.exports = router;
////