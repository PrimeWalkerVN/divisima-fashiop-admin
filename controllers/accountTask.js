const User = require('../models/Users');
const Admin = require('../models/Admin');
let hbs = require('hbs');

//helper if custom function for hbs
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

//load manager account page
exports.loadManageUserAccountPage = async function(req, res, next) {
    let users = [];
    await User.find(function(err,docs) {
        if(err){
            console.log(err);
        }else{
            if(docs == null){
                users = [];
            }else{
                users = docs;
            }
            res.render('accounts',{title: 'Quản lý tài khoản', users});
        }
    })

    console.log(users);
    console.log("hihiaasdsad");
};

//ban user
exports.banUser = function (req, res){
   
    User.findOneAndUpdate({_id: req.params.id},{status: "Khóa"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/accounts');
        }
    })
};
exports.unBanUser = function (req, res){
    User.findOneAndUpdate({_id: req.params.id},{status: "Hoạt động"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/accounts');
        }
    })
};



//load manager admin page
exports.loadManageAdminAccountPage =  async function(req, res, next) {
    let admins = [];
    await Admin.find({isSuperAdmin: false}, function(err,docs) {
        if(err){
            console.log(err);
        }else{
            if(docs == null){
                admins = [];
            }else{
                admins = docs;
            }
            res.render('admin-accounts',{title: 'Quản lý tài khoản', admins});

        }
    })
};

//ban/unban admin 
exports.banAdmin = function (req, res){
    Admin.findOneAndUpdate({_id: req.params.id},{status: "Khóa"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin-accounts');
        }
    })
};
exports.unBanAdmin = function (req, res){
    Admin.findOneAndUpdate({_id: req.params.id},{status: "Hoạt động"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin-accounts');
        }
    })
};


