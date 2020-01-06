const bcrypt = require('bcryptjs');
const passport = require('passport');
const Admin = require('../models/Admin');
const validator = require("email-validator");

//method get,post for login user 
exports.getSignIn = function(req, res) 
{ 
    let errMessages =  req.flash('error');
    let successMessages =  req.flash('success_messages');
    res.render('login',{ errorMessages: errMessages, successMessages:successMessages, 
        hasErrors: errMessages.length >0, hasSuccess: successMessages.length>0});
};
exports.postSignIn = (req, res, next) => {
    const {username, password} = req.body;
    let errors;
    if(!username  ||!password){
        errors= 'Vui lòng nhập đầy đủ thông tin';
    }

    if(errors){
        req.flash('error_msg',errors);
        let errMessages =  req.flash('error_msg');
        res.render('login',{
            errorMessages: errMessages,
            hasErrors: errMessages.length > 0
        });
    }else{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        successFlash: true,
        failureFlash: true
    })(req, res, next);
}
};


//method get,post for create account of super admin
exports.getCreateAccount=function(req, res) 
{ 
    let errMessages =  req.flash('error_msg');
    let successMessages =  req.flash('success_messages');
    res.render('create-account',{ errorMessages: errMessages, successMessages:successMessages, 
        hasErrors: errMessages.length >0, hasSuccess: successMessages.length>0});
};
exports.postCreateAccount= (req, res) => {
    const {username, name, email, password, password2} = req.body;
    let errors = [];

    if(!username || !name || !email || !password || !password2){
        errors.push({msg: 'Vui lòng nhập đầy đủ thông tin!'});
    }

    if(!username.match(/^[a-zA-Z0-9]{3,30}$/)){
        errors.push({msg: 'Tên tài khoản chỉ chứa các ký tự a-z, A-Z hoặc 0-9, độ dài 3-30 ký tự!'});
    }

    if(!validator.validate(email)){
        errors.push({msg: "Email không hợp lệ!"});
    }

    if(password !== password2){
        errors.push({msg: 'Xác nhận mật khẩu không đúng'});
    }

    if(password.length < 7){
        errors.push({msg: 'Mật khẩu phải dài hơn 7 ký tự'});
    }
    
    if(errors.length > 0){
        req.flash('error_msg',errors);
        let errMessages =  req.flash('error_msg');
        res.render('create-account',{
            errorMessages: errMessages,
            hasErrors: errMessages.length > 0
        });
    }else{
        Admin.findOne({username: username})
            .then(user => {
                if(user){
                    // user exist
                    errors.push({msg: 'Tài khoản đã tồn tại'})
                    req.flash('error_msg',errors);
                    let errMessages =  req.flash('error_msg');
                    res.render('create-account',{
                        errorMessages: errMessages,
                        hasErrors: errMessages.length >0
                    });
                }else{
                    //create new admin
                    const newAdmin = new Admin({
                        username,
                        name,
                        email,
                        password,
                        status: "Hoạt động"
                    });
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                            if(err) throw err;
                            //set new password
                            newAdmin.password = hash;

                            //inactive account
                            newAdmin.isSuperAdmin = false;
                            let successMsg=[];

                            //save into database
                            newAdmin.save()
                                .then(user => {
                                    successMsg.push({msg: 'Tạo tài khoản admin thành công!'});
                                    req.flash('success_messages', successMsg);
                                    res.redirect('/admins/create-account');
                            })
                            .catch(err => console.log(err));                  
                        }))
                }
            });
    }
};




//handle admin already logged in or not
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admins/login');
}
exports.notLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    
}

//handle superadmin already logged in or not
exports.isSuperLoggedIn = function(req, res, next) {
    let isSuperAdmin = req.user.isSuperAdmin;
    if (req.isAuthenticated() && isSuperAdmin) {
        return next();
    }
    res.redirect('/');
}
exports.notSuperLoggedIn = function (req, res, next) {
    let isSuperAdmin = req.user.isSuperAdmin;
    if (req.isAuthenticated() && !isSuperAdmin) {
        return next();
    }
    res.redirect('/');
}