var express = require('express');
var router = express.Router();

var models = require('./models').db;
var $promise = require('bluebird').Promise;
var Place = require('./models').Place;
var Hotel = require('./models').Hotel;
var Restaurant = require('./models').Restaurant;
var Activity = require('./models').Activity;



router.get('/', function(req, res, next) {
	var obj = {};
	$promise.each([Hotel, Restaurant, Activity], function(db) {
		return db.findAll({}).then(function(result) {
			obj[db.name] = result;
		});
	})
	.then(function(result) {
		var hotels = obj.hotel;
		var restaurants = obj.restaurant;
		var activities = obj.activity;
		var itinerary = {
			rest: restaurants.slice(4, 7),
			act: activities.slice(8, 11)
		}
		res.render('index', {
			itinerary: itinerary,
			hotels: obj.hotel,
	        restaurants: obj.restaurant,
	        activities: obj.activity
		});
	})
	.catch(function(error) {
		console.error(error);
	})
})

router.post('/', function(req, res, next) {
	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email,
		}
	})
	.then(function(values) {
		var user = values[0];
		return Page.create({
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags.trim().split(/\W+/)
		})
		.then(function(page) {
			return page.setAuthor(user);
		});
	})
	.then(function(page) {
		res.redirect(page.route);
	})
	.catch(next);	
});


router.get('/add', function(req, res, next) {
	res.render('addpage')
});


router.get('/:urlTitle', function(req, res, next) {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		},
		include: [
			{model: User, as: 'author'}
		]
	})
	.then(function(page) {
		if (page===null) {
			res.status(404).send();
		} else {
			var tags = page.tags.join(", ").split(", ");
			res.render('wikipage', {
				page: page,
				tags: tags
			});
		}
	})
	.catch(next);
})

router.get('/:urlTitle/similar', function(req, res, next) {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(page) {
		return page.findSimilar()
	})
	.then(function(pages) {
		res.render('index', {
			pages: pages
		});		
	})
	.catch(next);
});


router.get('/:urlTitle/:action', function(req, res, next) {
	var action = req.params.action;
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(page) {
		if (action==='delete') {
			page.destroy();
			res.render('user', {
				title: "Page Destroyed"
			});
		} else {
			var tags = page.tags.join(", ").split(", ");
			res.render('editpage', {
				page: page,
				tags: tags
			});
		}
	})
	.catch(next);
})


module.exports = router;