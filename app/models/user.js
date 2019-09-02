var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});