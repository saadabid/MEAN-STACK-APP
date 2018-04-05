var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/meanapp',function(err){
    if(err)
    {
        console.log('Not Connected'+err);
    }else
    {
        console.log('Connected');
    }
});
app.get('/home',function(req , res){
    res.send("HELLO FROM HOME");
});

app.post('/users',function(req , res)
{
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email= req.body.email;
    user.save();
    res.send('user created');
});

app.listen(port,function()
{
    console.log("Running the server" + port);
});