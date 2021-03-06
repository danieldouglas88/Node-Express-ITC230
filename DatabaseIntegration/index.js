'use strict'

let Dawg = require("./models/dog"); // db model
let dbMethods = require("./lib/dbmethods"); // db methods

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars")
.create({ defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//detail page with delete options
app.get('/detail', (req,res) => {
    Dawg.findOne({ title: req.query.title}, (err, result) => {
        if (err) return next(err);
        res.render('detail', {dogsArray: result, queryString: req.query.title, pageName: "detail"}) 
    });
});

//delete dog from db
app.get('/delete', (req,res) => {
    Dawg.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        Dawg.countDocuments((err, total) => {
   res.render('delete', {queryString: req.query.title, pageName: "delete", title: req.query.title, dbLength: total, del: result.n}) 
        });
    });
});

//create dog in db
app.get('/create', (req, res) => { 
    dbMethods.createDog(req.query.title, req.query.color, req.query.local);
        res.render('create', {queryString: req.query.title, title: req.query.title, color: req.query.color, local: req.query.local, pageName: 'Create'});
   }); 

//home page
app.get('/', (req, res) => {  
    Dawg.find({}, (err, items) => {
  if (err) return next(err);
        console.log(items);
        res.render('home', {pageName: "index", title: "Home", queryString: "home", allDog: items });
    });
   });

//about page
app.get('/about', (req, res) => { 
  res.render('about', {pageName: "about", title: "About"}); 
});

//404 handler
app.use(function(req,res) {
  res.render('404', {pageName: "404", title: "404 - cant find"}); 
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});