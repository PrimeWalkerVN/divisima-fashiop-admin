let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let accountModifyRouter = require('./routes/account-modify');
let accountsRouter = require('./routes/accounts');
let addProductRouter = require('./routes/add-product');
let productsRouter = require('./routes/products');
let recentOrdersRouter = require('./routes/recent-orders');
let revenuesRouter = require('./routes/revenues');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/account-modify',accountModifyRouter);
app.use('/accounts',accountsRouter);
app.use('/add-product',addProductRouter);
app.use('/products',productsRouter);
app.use('/recent-orders',recentOrdersRouter);
app.use('/revenues',revenuesRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
