var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入数据库配置
require('./config/db.config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter');
var trademarkRouter = require('./routes/product/trademark');
var attrRouter = require('./routes/product/attr');
var categoryRouter = require('./routes/product/category');
var spuRouter = require('./routes/product/spu');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 添加调试中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', trademarkRouter);
app.use('/admin/product', attrRouter);
app.use('/admin/product', categoryRouter);
app.use('/admin/product', spuRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
