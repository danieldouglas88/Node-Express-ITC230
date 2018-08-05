
var Dog = require("../models/dog");

//create dog in DB
exports.createDog = (tit, col, loc) => {
    new Dog({title:tit, color:col, local: loc}).save(), (err, items) => {
  if (err) return next(err);
} };

//find single dog in DB
exports.findDog = (tit) => {
Dog.findOne({title: tit}, (err, items) => {
  if (err) return next(err);
return items.length.toString;})
}
 

