const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recent-orders',{title:"Quản lý đơn hàng"});
});

module.exports = router;