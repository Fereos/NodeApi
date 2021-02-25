
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true, min: 6, max: 255 },
    lastName: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    dateRegistered: { type: Date, default: Date.now() },
    isDisabled: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', userSchema);