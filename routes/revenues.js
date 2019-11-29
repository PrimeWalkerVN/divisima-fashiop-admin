const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('revenues',{title:"Doanh số bán hàng"});
});
  
module.exports = router;