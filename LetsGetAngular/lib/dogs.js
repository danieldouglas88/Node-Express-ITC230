'use strict'

let dogs = [{"type":"pitbull", "color": "yellow", "local": true},
            {"type":"golden retriever", "color": "orange", "local": false},
            {"type":"labrador", "color": "yellow", "local": false},
            {"type":"poodle", "color": "white & black", "local": true},
            {"type":"samoyed", "color": "white", "local": true}];

exports.getDog = function(typeOfDog){
    
    for (var i=0; i<dogs.length; i++){
        if(dogs[i].type == typeOfDog){
            return dogs[i];
        }
    }
}

exports.deleteDog = function(typeOfDog){
    for (var i=0; i<dogs.length; i++){
        if(dogs[i].type == typeOfDog){
            dogs.splice(i, 1);
        }
    }
}

exports.getAllDogs = function(){
    return dogs;
}