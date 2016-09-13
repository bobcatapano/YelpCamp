var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
   username: {
       type: String,
       index: true
   },
   password: {
     type: String
   },
   email: {
       type: String
   },
   name: {
       type: String
   },
   admin: {
       type: Boolean
   },
   resetPasswordToken: {
     type: String
   },
   resetPasswordExpires: {
     type: String
   }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.updateUsersPassword = function(User, callback)
{
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(User.password, salt, function(err, hash) {
            User.password = hash;
            User.save(callback);
        });
    });
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.getUserByUsername = function(username, callback){
       var query = {username: username};
       User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
       User.findById(id, callback);
}

module.exports.getAllUsers = function(callback){
    var query = {};
    User.find(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}