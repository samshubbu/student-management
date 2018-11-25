const mongoose = require('mongoose');
const config = require('../config/database');

const accessList = mongoose.Schema({
    routepath: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    rolename: {
        type: String,
        required: true
    }
});

const AccessList = module.exports = mongoose.model('AccessList', accessList);


module.exports.adminpath = (adminAccess, callback) => {
    adminAccess.save(callback);
}
