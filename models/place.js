var Sequelize = require('sequelize');
var db = require('./index.js');


var Place = db.define('place', {
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false
		},
		state: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING
		},
		location: {
			type: Sequelize.ARRAY(Sequelize.FLOAT)
		}
	}
);



module.exports = Place;
