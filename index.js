let express = require('express');
require('dotenv').config();

let app = express();

let PORT = process.env.PORT;

app.get('/', function(req, res){
    res.send('hello heroku app is this working??');
})

app.listen(PORT, function(){
    console.log('starting application on port', PORT)
})