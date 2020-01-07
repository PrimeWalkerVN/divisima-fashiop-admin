const request = require('request');
const apiUrl = 'https://still-plateau-02404.herokuapp.com/';


//recent order 
exports.recentOrders = function (req, res, next) {
    request(apiUrl+'orders', { json: true }, (err, rspnd, body) => {
      if (err) { return console.log(err); }
      for(let i=0; i<body.result.length; i++){
        if(body.result[i].status == 0) {body.result[i].statusString = 'Đã hủy'}
        if(body.result[i].status == 1) {body.result[i].statusString = 'Đang giao'}
        if(body.result[i].status == 2) {body.result[i].statusString = 'Đã giao'}
      }
      res.render('recent-orders', { title: "Đơn hàng gần đây",orders:body.result });
    });
};

exports.modifyProduct =  function (req, res, next) {
    request(apiUrl + '0/normal?id=' + req.params.productId, { json: true }, (err, rspnd, body) => {
      if (err) { return console.log(err); }
      res.render('modify-product', { title: "Chỉnh sửa sản phẩm", productData: body[0] });
    });
};