var Sequelize = require('sequelize');
var db = require('./index.js');
var Place = require('./place.js');


var Hotel = db.define('hotel', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	num_stars: {
		type: Sequelize.INTEGER,
		validate: {min: 1, max: 5}
	}, 
	amenities: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	}
});

Hotel.belongsTo(Place, {as: 'place'});


module.exports = Hotel;