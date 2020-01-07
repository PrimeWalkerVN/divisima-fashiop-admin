const express = require('express');
const router = express.Router();
const superAdmin = require('../controllers/adminTask');
const accountTask = require('../controllers/accountTask');


// load manage admin page
router.get('/', superAdmin.isLoggedIn, superAdmin.isSuperLoggedIn,accountTask.loadManageAdminAccountPage);

//ban / unban admin
router.get('/lock-admin/:id', superAdmin.isLoggedIn, accountTask.banAdmin);
router.get('/unlock-admin/:id', superAdmin.isLoggedIn, accountTask.unBanAdmin);

module.exports = router;