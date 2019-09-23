const express = require('express');
const defaults = require('../defaults');
const { body, validationResult, check }  = require('express-validator/check');
const flattenError = require('../flattenError');
const CharacterModel = require('../models/CharacterModel');

var router = express.Router();


router.post('/character/add', async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors
        })
        return;
    }
    const {name, height, mass, hair_color, eye_color, birth_year, gender, homeworld, species, vehicles, starships} = req.body;
    var nameFormatted = name.toLowerCase();
    try {
        var character = new CharacterModel({
            name: nameFormatted,
            height: height,
            mass: mass,
            hair_color: hair_color,
            eye_color: eye_color,
            birth_year: birth_year,
            gender: gender,
            homeworld: homeworld,
            species: species,
            vehicles: vehicles,
            starships: starships
        })

        var data = await character.save();
        if (data) {
            res.status(200).json({
                status: true,
                msg: 'Data saved'
            })
        }else {
            res.status(400).json({
                status: false,
                msg: 'Failed to save data'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: "internal server error"
        })
    }
})
router.get('/character/all', async(req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors
        })
        return;
    }
    try {
        var data = await CharacterModel.find();
        if(data) {
            res.status(200).json({
                status: true,
                data: data,
                msg: 'success'
            })
        }else {
            res.status(400).json({
                status: false,
                msg: 'Failed to save data'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: "internal server error"
        })
    }
})
router.get('/character/:name', async(req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors
        })
        return;
    }
    const { name } = req.params;
    nameFormatted = name.toLowerCase();
    try {
        var data = await CharacterModel.findOne({name: nameFormatted});
        if(data) {
            res.status(200).json({
                status: true,
                data: data,
                msg: 'success'
            })
        }else {
            res.status(400).json({
                status: false,
                msg: 'Failed to save data'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: "internal server error"
        })
    }
})

module.exports = router;