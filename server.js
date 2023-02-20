// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
// Start up an instance of app
var app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors({origin:"*"}))

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
var server = app.listen(8000, function() {
         var port = server.address().port
        console.log("server run on "+port+"......")

    })

app.get('/all',function(req,res)
{
    res.status(200).send(projectData)
});    
app.post('/add',function(req,res){
    projectData={
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    }
    console.log(req.body);
     res.status(200).send(projectData)
})