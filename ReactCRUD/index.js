'use strict'

let Dawg = require("./models/dog"); // db model
let dbMethods = require("./lib/dbmethods"); // db methods

const express = require("express");
let bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.handlebars', defaultLayout: 'main'}));
app.set("view engine", ".html");

//home.html page
app.get('/', (req, res) => { 
        Dawg.find({}, (err, items) => {
  if (err) return next(err);
        res.render('home', {dogJSON: JSON.stringify(items)});
        }); }); 

//get all dogs for api
app.get('/api/v1/dogs', (req,res) => {
        Dawg.find({}, (err, items) => {
  if (err) return next(err);
    res.send(JSON.stringify(items));
        });
});

//get single dog for api
app.get('/api/v1/dogs/:type', (req,res) => {
     Dawg.findOne({ title: req.params.type}, (err, result) => {
        if (err) return next(err);
         if(result == null){
             res.send("404") 
         }else{
            res.send(JSON.stringify(result));
         }
     });
});

//delete dog for api
app.get('/api/v1/dogs/delete/:type', (req,res) => {
    Dawg.remove({ title:req.params.type }, (err, result) => {
        if (err) return next(err);
        Dawg.countDocuments((err, total) => {
            if (result.n){
            res.send("{'title': '" + (req.params.type + "'} has been removed. There are " + total + " dogs left in the database."))
            }else{
                res.send("404");
            }
        });
    });
});

//create dog for api
app.get('/api/v1/dogs/create/:type/:color/:local', (req, res) => { 
    dbMethods.createDog(req.params.type, req.params.color, req.params.local);
    Dawg.findOne({ title: req.params.type}, (err, result) => {
        if (err) return next(err);
        res.send({"title":req.params.type, "color":req.params.color, "local":req.params.local});
     });  
}); 

//about page
app.get('/about', (req, res) => { 
  res.render('about', {pageName: "about", title: "About"}); 
});

//404 handler
app.use(function(req,res) {
  res.send('404'); 
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});