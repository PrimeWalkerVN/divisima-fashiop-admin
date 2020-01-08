const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
//logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admins/login');
});
router.use('/', function (req, res, next) {next();});
//login
router.get('/login',adminTask.notLoggedIn, adminTask.getSignIn);
router.post('/login', adminTask.postSignIn);

//create account
router.get('/create-account',adminTask.isSuperLoggedIn,adminTask.getCreateAccount); 
router.post('/create-account',adminTask.isSuperLoggedIn,adminTask.postCreateAccount);

module.exports = router;
