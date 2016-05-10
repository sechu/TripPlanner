var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripplanner', {logging: false});

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


Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


module.exports = {
	Place: Place,
	Hotel: Hotel,
	Activity: Activity,
	Restaurant: Restaurant
};


// , {
	// 	getterMethods: {
	// 		route: function() { return '/wiki/'+this.urlTitle },
	// 		renderedContent: function() {
	// 			var doubleBrackets = /\[\[(.*?)\]\]/g;
	// 			var rendered = this.content.replace(doubleBrackets, replacer);
	// 			function replacer(match, text) {
	// 				return '<a href="/wiki/'+urlGenerator(text)+'">'+text+'</a>';
	// 			}
	// 			return marked(rendered, function (err, content) {
	// 				return content;
	// 			});
	// 		}
	// 	},
	// 	classMethods: {
	// 		findByTag: function(tag) {
	// 			return Page.findAll({
	// 				where: {
	// 					tags: {
	// 						$overlap: [tag]
	// 					}
	// 				}
	// 			});
	// 		}
	// 	},
	// 	instanceMethods: {
	// 		findSimilar: function() {
	// 			return Page.findAll({
	// 				where: {
	// 					tags: {
	// 						$overlap: this.tags
	// 					},
	// 					title: {
	// 						$ne: this.title 
	// 					}
	// 				}
	// 			});	
	// 		}
	// 	}
	// }

	// Page.hook('beforeValidate', function(page, options){
// 	var space = /\W/g;
// 	page.urlTitle = page.title.replace(space, '_');
// });


