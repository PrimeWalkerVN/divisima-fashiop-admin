const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');

/* GET home page. */
router.get('/',adminTask.isLoggedIn, function(req, res, next) {
  res.render('index',{title:'Top bán chạy'});
});

module.exports = router;
