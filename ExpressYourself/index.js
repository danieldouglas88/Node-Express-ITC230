'use strict'

let dogs = require("./lib/dogs.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars")
.create({ defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get('/detail', function(req, res) { 
    if (dogs.getDog(req.query.title)){
  res.render('detail', {queryString: req.query.title, pageName: "detail", title: "Detail", dogsArray: dogs.getADog(req.query.title)}); 
    } else {
  res.render('404', {pageName: "404", title: "'" + req.query.title + "' not found"} ); 
    }
});

app.get('/delete', function(req, res) { 
     if (dogs.getDog(req.query.title)){
   res.render('delete', {queryString: req.query.title, pageName: "delete", title: "Delete", deleteDog: dogs.deleteDog(req.query.title), arrayLength: dogs.arrLength()});  
    } else {
  res.render('404', {pageName: "404", title: "'" + req.query.title + "' not found"} ); 
    }
});


app.get('/about', function(req, res) { 
  res.render('about', {pageName: "about", title: "About"} ); 
});


app.get('/', function(req, res) { 
  res.render('home', {pageName: "index", title: "Home", allDogs: dogs.getAllDogs() }); 
});

// define 404 handler
app.use(function(req,res) {
  res.render('404', {pageName: "404", title: "404 - cant find"} ); 
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});