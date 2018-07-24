'use strict'

let dogs = [
            {"type":"pitbull", "color": "yellow", "local": true},
            {"type":"golden retriever", "color": "orange", "local": false},
            {"type":"labrador", "color": "yellow", "local": false},
            {"type":"poodle", "color": "white & black", "local": true},
            {"type":"samoyed", "color": "white", "local": true},
            {"type":"husky", "color": "grey", "local": true},
            {"type":"terrier", "color": "white & grey", "local": false},
           ];

exports.getDog = (typeOfDog) => {
    for (var i=0; i<dogs.length; i++){
        if(dogs[i].type == typeOfDog){
            return dogs[i];
        }
    }
}

exports.deleteDog = (typeOfDog) => {
    for (var i=0; i<dogs.length; i++){
        if(dogs[i].type == typeOfDog){
            dogs.splice(i, 1);
        }
    }
}

exports.getAllDogs = () => {
    return dogs;
}

exports.create = (type, color, local) =>{
    dogs.push({"type": type, "color": color, "local": local});
}