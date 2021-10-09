let express = require('express');
require('dotenv').config();
const mysql = require('mysql')

let app = express();

let PORT = process.env.PORT;

app.get('/', function(req, res){
    res.send('hello- '+ process.env.secretcode);
})

let ballparksRoutes = require('./routes/ballparks');
app.use(ballparksRoutes);

let usersRoutes = require('./routes/users');
app.use(usersRoutes);

let authRoutes = require('./routes/auth');
app.use(authRoutes);


app.listen(PORT, function(){
    console.log('starting application on port', PORT)
})

