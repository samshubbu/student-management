const mongoose = require('mongoose');

const Student = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll_no: {
        type: Number,
        required: true
    },
    class_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

});

const Stud = module.exports = mongoose.model('Student', Student);