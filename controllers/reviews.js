const mysql = require('mysql');
const pool = require('../sql/connection');



function listReviews(req, res){
    console.log('controller.reviews.list', req.params)
    //select all reviews 
    pool.query('select ballpark_name, team, sum(overall_rating)/ count(overall_rating) as overall_rating, count(*) as total_reviews from reviews group by ballpark_id', function(err, rows){
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

let showReview = function(req, res){
    console.log('controller.reviews.show', req.params)
    //code to return single review by ballpark_id
    //id is path param
    let sql = "select * from reviews where ballpark_id = ?";
    //const replacements = []
    sql = mysql.format(sql, [req.params.ballpark_id]);
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


//create new review

function createReview(req, res){
    console.log('controller.reviews.create', req.body)
    //SQL to create a new user using req.body
    //let sql = "INSERT INTO users( username, p_word) VALUES (?,?)";
    //let username = req.body.username;

    let user_id = req.body.user_id;
    let team = req.body.team;
    let ballpark_id = req.body.ballpark_id;
    let overall_rating = req.body.overall_rating;
    let location = req.body.location;
    let food = req.body.food;
    let seating = req.body.seating;
    let comments = req.body.comments;
    let ballpark_name = req.body.ballpark_name;

    let sql = "INSERT INTO reviews(user_id, team, ballpark_id, overall_rating, location, food, seating, comments, ballpark_name) VALUES (?, ?,?,?,?,?,?,?,?)";
    //const replacements = []
    sql = mysql.format(sql, [user_id, team, ballpark_id, overall_rating, location, food, seating, comments, ballpark_name]);

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
    listReviews,
    showReview,
    createReview
    
}