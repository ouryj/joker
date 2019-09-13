let  passportMongoose    = require('passport-local-mongoose'), 
    express              = require('express'),
    mongoose             = require('mongoose');

    let userSchema = new mongoose.Schema({
        name: String,
        age:  Date,
        image: String,
        username: String,
        password: String
    });
    userSchema.plugin(passportMongoose);
    let User = mongoose.model('User', userSchema);
    

    module.exports = User;

   