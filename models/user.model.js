const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    contact: {type: String, unique: true},
    username: {type: String}
})
module.exports = mongoose.model('users', userSchema);