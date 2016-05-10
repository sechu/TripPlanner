var Sequelize = require('sequelize');
var db = require('./index.js');
var Place = require('./place.js');


var Restaurant = db.define('restaurant', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cuisine: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	price: {
		type: Sequelize.INTEGER,
		validate: {min: 1, max: 5}
	}
});

Restaurant.belongsTo(Place, {as: 'place'});


module.exports = Restaurant;