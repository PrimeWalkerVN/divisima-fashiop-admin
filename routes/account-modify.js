const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
const Admin = require('../models/Admin');

/* GET home page. */
router.get('/', adminTask.isLoggedIn, async function(req, res, next) {
  // console.log('hihihi');
  // console.log(req.user._id);
  await Admin.findById(req.user._id, function(err, user) {
    console.log(user);
    res.render('account-modify',{title:'Chỉnh sửa tài khoản', user});
  })
});

router.post('/change-infomation', adminTask.isLoggedIn, async function(req, res){
  console.log(req.body.name);
  Admin.findOneAndUpdate({_id: req.user._id},
    {$set: {name:req.body.name, email: req.body.email, 
    address:req.body.address, phoneNumber:req.body.phoneNumber}},
    (err,data) => {
      if(err) res.send(500,message);
      res.redirect('/account-modify');
    })
})

module.exports = router;