const express = require('express');
const router = express.Router();
const adminTask = require('../controllers/adminTask');
const productTask = require('../controllers/productTask');


// Manager product page
router.get('/', adminTask.isLoggedIn, function (req, res, next) {
  res.render('products', { title: "Quản lý sản phẩm" });
});
router.get('/add-product', adminTask.isLoggedIn, function (req, res, next) {
  res.render('add-product', { title: "Thêm sản phẩm" });
});

router.get('/recent-orders', adminTask.isLoggedIn, productTask.recentOrders);

router.get('/:productId', adminTask.isLoggedIn,productTask.modifyProduct);

module.exports = router;