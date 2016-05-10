var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var path = require('path');
var models = require('./models').db;
var $promise = require('bluebird').Promise;
var Place = require('./models').Place;
var Hotel = require('./models').Hotel;
var Restaurant = require('./models').Restaurant;
var Activity = require('./models').Activity;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use('/bootstrap', express.static(path.join(__dirname, './node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, './node_modules/jquery/dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/', require('./routes'));

app.get('/', function(req, res, next) {
	var obj = {};
	$promise.each([Hotel, Restaurant, Activity], function(db) {
		return db.findAll({}).then(function(result) {
			obj[db.name] = result;
		});
	})
	.then(function(result) {
		res.render('index', {
			day: 1,
			hotels: obj.hotel,
	        restaurants: obj.restaurant,
	        activities: obj.activity
		});
	})
	.catch(function(error) {
		console.error(error);
	})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error', {
  	message: 'Cannot find page',
  	error: err
  });
});


models.sync({})
.then(function() {
	app.listen(3001, function() {
		console.log('server is listening on port 3001');
	});
})
.catch(console.error);

