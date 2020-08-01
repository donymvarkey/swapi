const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const defaults = require('../defaults');
const middlewares = require('../middlewares');
const { body, validationResult, check }  = require('express-validator/check');
const flattenError = require('../flattenError');
const UserModel = require('../models/UserModel');

var router = express.Router();

router.post('/user/register', [
    body('name').exists(),
    body('email').exists(),
    body('password').exists()
], async (req, res) => {
    try {
        const {name, email, password} = req.body;

        var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        var user = new UserModel({
           name: name,
           email: email,
           password: hash
        })

        var data = await user.save();
        if (data) {
            res.status(200).json({
                status: true,
                msg: 'success'
            })
        }else {
            res.status(400).json({
                status: false,
                msg: 'failed'
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

router.post('/user/login', [
    body('email').exists(),
    body('password').exists()
], async (req, res) => {
    const {email, password} = req.body;
    var errors, data;
    
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors
        })
        return;
    }

    try {
        data = await UserModel.findOne({email: email});
        if (data == null || data == undefined) {
            res.status(404).json({
                status: false,
                msg: "user not found"
            })
            return; start
        }

        if (bcrypt.compareSync(password, data.password)) {
            signiningData = {
                username: data.email,
                id: data._id,
                privilege: data.privilege
            }

            token = jwt.sign(signiningData, defaults.signature);
            signiningData['token'] = token;

            res.status(200).json({
                status: true,
                msg: 'success',
                token: signiningData
            })
        } else {
            res.status(401).json({
                status: false,
                msg: "invalid username or password"
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
router.get('/user/check/username', [
    body('username').exists()
], async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors
        })
        return;
    }
    try {
        var data = await UserModel.findOne({email: username});
        if (data) {
            res.status(400).json({
                status: false,
                msg: 'username exists'
            })
        }else {
            res.status(200).json({
                status: true,
                msg: 'username available'
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


//--------------------------Only for admin creation-----------------------------------
router.post('/admin', async (req, res) => {
    var username = 'admin';
    var password = 'admin';

    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    var user = new UserModel({
        username: username,
        password: hash,
        privilege: defaults.PRIVILLAGES.ADMIN
    })

    var data = await user.save();

    if (data) {
        res.status(200).json({
            status: true,
            data: {
                username: username,
                password: password
            },
            msg: 'success'
        })
    }else {
        res.status(400).json({
            status: false,
            msg: 'failed'
        })
    }
})
//---------------------------------------------------------------------------

module.exports = router;