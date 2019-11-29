const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('products',{title:"Quản lý sản phẩm"});
});

module.exports = router;