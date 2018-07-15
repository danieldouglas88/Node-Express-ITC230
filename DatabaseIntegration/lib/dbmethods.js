
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
return items.length.toString})
}

//return all dogs from DB
exports.returnAll = () => {
    Dog.find({}, (err, items) => {
  if (err) return next(err);
        var i = 0;
        var arr = [];
        while(i<items.length){
        console.log("Title: " + items[i].title + "\nColor: " + items[i].color + "\nLocal: "+ items[i].local + "\n");
        arr.push({title: items[i].title, color: items[i].color, local: items[i].local});
        i++;
        }
        return arr;
});
}
