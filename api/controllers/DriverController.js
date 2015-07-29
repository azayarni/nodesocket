/**
 * DriverController
 *
 * @description :: Server-side logic for managing drivers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function (req, res) {
		Driver.findOne(req.param("id")).exec(function (err, data) {
			if (err) return res.badRequest(err);
			
			res.send(data);
		});
	},
	
	search : function(req, res) {
		Driver.search(req.query, function(err, data) {
			if (err) return res.badRequest(err);
			
			console.log(err, data);
			
			res.send(data);
		});
	}
};

