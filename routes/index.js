const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
const apiUrl = 'http://localhost:8080/';
const request = require('request');

/* GET home page. */
router.get('/',adminTask.isLoggedIn, function(req, res, next) {
  request(apiUrl + 'topTen', { json: true }, (err, rspnd, body) => {
    for(let i=0; i<body.length; i++){
      body[i].revenue = body[i].price * body[i].sold;
    }
    res.render('index', { title: "Top bán chạy", topTen: body });
  });
});

module.exports = router;
