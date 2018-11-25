const mongoose = require('mongoose');

const Classes = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    }
});

const Clas = module.exports = mongoose.model('Class', Classes);

module.exports.getAllClass = function(classs, callback) {
    Clas.find({}, (err, classes) => {
        if(err) throw err;
    })
}