const express = require('express');
const router = express.Router();


const superAdmin = require('../controllers/adminTask');
const Admin = require('../models/Admin');

/* GET home page. */
router.get('/', superAdmin.isLoggedIn, superAdmin.isSuperLoggedIn, async function(req, res, next) {
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
});

router.get('/lock-admin/:id', superAdmin.isLoggedIn, function (req, res){
    Admin.findOneAndUpdate({_id: req.params.id},{status: "Khóa"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin-accounts');
        }
    })
});

router.get('/unlock-admin/:id', superAdmin.isLoggedIn, function (req, res){
    Admin.findOneAndUpdate({_id: req.params.id},{status: "Hoạt động"}, function (err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin-accounts');
        }
    })
});

let hbs = require('hbs');

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

module.exports = router;