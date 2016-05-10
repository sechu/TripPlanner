var Sequelize = require('sequelize');
var db = require('./index.js');
var Place = require('./place.js');


var Activity = db.define('activity', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	age_range: {
		type: Sequelize.STRING,
		validate: {
			is: /[0-9]+\-[0-9]+/
		}
	}
});

Activity.belongsTo(Place, {as: 'place'});



module.exports = Activity;