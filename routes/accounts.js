const express = require('express');
const router = express.Router();


const superAdmin = require('../controllers/adminTask');
const User = require('../models/Users');

/* GET home page. */
router.get('/', superAdmin.isSuperLoggedIn, async function(req, res, next) {
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
        }
    })

    console.log(users);
    console.log("hihiaasdsad");
    await res.render('accounts',{title: 'Quản lý tài khoản', users});
});

module.exports = router;