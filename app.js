var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var path = require('path');
var model = require('./models');


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/', require('./routes'));



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.get('/', function(req, res, next) {
// 	res.render('error', {
// 	  	message: 'Cannot find page',
// 	  	error: err
// 	  });
// })

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {
  	message: 'Cannot find page',
  	error: err
  });
});

var server = app.listen(3001, function() {
	console.log('server is listening on port 3001');
});