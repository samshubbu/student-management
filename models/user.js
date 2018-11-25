const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../models/database');

//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles:{
        type:[String],
        default: []
    }
});

const User = module.exports = mongoose.model('User', UserSchema);   

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
 
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    User.find({email: newUser.email}, (err, res) => {
        if(res.length) {
            callback('Email already Exists', null);
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                        newUser.password = hash;
                        newUser.save(callback);
                });
            });
        }
    })
}

module.exports.comparePassword = function(studentPassword, hash, callback ) {
    bcrypt.compare(studentPassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}


