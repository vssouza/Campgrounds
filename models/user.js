var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//adds serialize and deserialize methods provided by passport (and other methods)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);