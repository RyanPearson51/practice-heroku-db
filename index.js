let express = require('express');
require('dotenv').config();

let app = express();

let PORT = process.env.PORT;

app.get('/', function(req, res){
    res.send('hello- '+ process.env.secretcode);
})

app.listen(PORT, function(){
    console.log('starting application on port', PORT)
})