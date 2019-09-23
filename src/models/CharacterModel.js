const mongoose = require('mongoose');

var CharacterSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    height: {type: String},
    mass: {type: String},
    hair_color: {type: String},
    eye_color: {type: String},
    birth_year: {type: String},
    gender: {type: String},
    homeworld: {type: String},
    species: {type: [String]},
    vehicles: {type: [String]},
    starships: {type: [String]}
})

module.exports = mongoose.model('CharacterModel', CharacterSchema);