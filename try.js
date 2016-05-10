

var Promise = require('bluebird');
var db = require('./models').db;
var Place = require('./models').Place;
var Hotel = require('./models').Hotel;
var Restaurant = require('./models').Restaurant;
var Activity = require('./models').Activity;

Place.sync({force: true})
.then(function() {
	return Promise.all([
		Activity.sync({force: true}),
		Hotel.sync({force: true}),
		Restaurant.sync({force: true})
	])
})
.then(function() {
	return Place.create({
	address: "75 Wall St", city: "New York", state: "NY", phone: "123-456-7890", location: [40.705137, -74.007624]
	});
})
.then(function() {
	console.log('done');
})
.catch(function(err) {
	console.log(err);
})