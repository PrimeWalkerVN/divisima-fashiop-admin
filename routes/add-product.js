const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-product',{title:"Thêm sản phẩm"});
});

module.exports = router;