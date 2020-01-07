const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
const apiUrl = 'https://still-plateau-02404.herokuapp.com/';
const request = require('request');

/* GET home page. */
router.get('/',adminTask.isLoggedIn, adminTask.loadHomePage);

module.exports = router;
