const mongoose = require('mongoose');

const Courses = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Course = module.exports = mongoose.model('Course', Courses);