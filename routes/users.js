const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('./../config/database');
const Clas = require('./../models/class');

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        roles:req.body.roles || []
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Failed to Register User'});
        } else {
            res.json({success: true, message: 'Registered Successfully', user: user});
        }
    });
});

// Login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err, user) => {
        if(err) throw err;
        if(!user) {
           return res.send({success: false, message: 'user not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });
                res.status(200).send({
                    success: true,
                    message: 'Login Successfully',
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        password: user.password,
                        email: user.email
                    }
                });
            } else {
                res.send({success: false, message: 'Wrong Password'});
            }
        });
    });
});

module.exports = router;