const express = require('express');
const router = express.Router();
const superAdmin = require('../controllers/adminTask');
const accountTask = require('../controllers/accountTask');

/* GET home page. */
router.get('/', superAdmin.isLoggedIn, accountTask.loadManageUserAccountPage);

//ban/unban user
router.get('/lock-user/:id', superAdmin.isLoggedIn, accountTask.banUser);
router.get('/unlock-user/:id', superAdmin.isLoggedIn, accountTask.unBanUser);

module.exports = router;