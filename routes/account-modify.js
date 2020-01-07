const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
const Admin = require('../models/Admin');

/* GET home page. */
router.get('/', adminTask.isLoggedIn, adminTask.getAccountModify);

router.post('/change-infomation', adminTask.isLoggedIn,adminTask.postAccountModify);

module.exports = router;