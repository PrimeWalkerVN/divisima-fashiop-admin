const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account-modify',{title:'Chỉnh sửa tài khoản'});
});

module.exports = router;