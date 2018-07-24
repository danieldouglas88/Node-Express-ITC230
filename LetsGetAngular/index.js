'use strict'

let dogs = require("./lib/dogs.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

app.get('/get', function(req, res) { 
    if(req.query.title){
        res.send(JSON.stringify(dogs.getDog(req.query.title))); 
    }else{ 
        res.send(JSON.stringify(dogs.getAllDogs())); 
    }
});

app.get('/delete', function(req, res) { 
    dogs.deleteDog(req.query.title);
    res.send(req.query.title + " has been deleted. Go to Get to see full array contents"); 
});

app.get('/create', function(req, res) { 
    dogs.create(req.query.title, req.query.color, req.query.local);
    res.send(req.query.title + " had been created. Its color is " + req.query.color);
});

app.get('/about', function(req, res) { 
    res.send("This is the aboot page, don't ya know eh?");
});

app.get('/', function(req, res) { 
    res.send("This is my home page for ITC 230.");
});

// define 404 handler
app.use(function(req,res) {
    res.send("404 - ERROR");
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});