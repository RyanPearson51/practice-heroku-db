const mysql = require('mysql');
const pool = require('../sql/connection');


function listBallparks(req, res){
    console.log('controller.ballparks.list', req.params)
    //select all users from ballparks 
    pool.query('select ballpark_id, ballpark_name from ballparks', function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
  })
}

let showBallpark = function(req, res){
    console.log('controller.users.show', req.params)
    //code to return single user by id
    //id is path param
    let sql = "";
    //const replacements = []
    sql = mysql.format(sql, [req.params.id]);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}


//create user, assign it an id, add it to users array
//content of user will be inside request body

function createBallpark(req, res){
    console.log('controller.users.create', req.body)
    //SQL to create a new user using req.body
    let sql = "";
    //const replacements = []
    sql = mysql.format(sql, []);
    //in the table i had uploaded and been using for practice, joining date had a weird format so that will start as 00:00:00, but everything else will work correctly
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
}

let updateBallpark = function(req, res){
    console.log('controller.users.update', req.body)
    //code to update a user
    //this will set a new salary for a specific worker
    let sql = "";
    //const replacements = []
    sql = mysql.format(sql, []);
    pool.query(sql, function(err, rows){
        if(err){
            return res.json({
                'error': true, 
                'message': 'error occured:' + err
        })
    } else{
        res.json(rows);
    }
    })
 
}

let deleteBallpark = function(req, res){
    console.log('controller.users.delete', req.body)
     //code to delete a user from the database
     let sql = "";
     //const replacements = []
     sql = mysql.format(sql, []);
     pool.query(sql, function(err, rows){
         if(err){
             return res.json({
                 'error': true, 
                 'message': 'error occured:' + err
         })
     } else{
         res.json(rows);
     }
     })

 
}

module.exports = {
    listBallparks,
    showBallpark,
    createBallpark,
    updateBallpark,
    deleteBallpark
}