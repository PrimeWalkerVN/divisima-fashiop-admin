const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField : 'username'},(username, password, done) => {
            //Match user
            Admin.findOne({username: username})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'Tài khoản chưa được đăng ký!'});
                    }
                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: 'Mật khẩu không chính xác!'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, user) {
          done(err, user);
        });
    });
}