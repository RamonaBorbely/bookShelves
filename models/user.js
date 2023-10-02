const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },

    // added this for google auth
    googleId: {
        type: String,
        unique: true,
        sparse: true //
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField : 'email', usernameUnique: true})
userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)
