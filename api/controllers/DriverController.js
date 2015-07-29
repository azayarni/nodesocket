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
			
			//console.log(err, data);
			
			res.send(data.results);
		});
	},
	

	/**
	 * Sockets endpoint. Subscription for driver data updates.
	 */
	subscribe: function (req, res) {
		
		if (!req.isSocket) {
			return res.badRequest('sockets only');
		}

		Driver.find({ status: 1 }).exec(function (err, rows) {
			if (err) {
				return res.negotiate(err);
			}
			
			// subscribe to active drivers
			Driver.subscribe(req, _.pluck(rows, 'id'));
			
			// subscribe for new drivers
			Driver.watch(req);
			
			return res.send(rows);
		});
	},

	/**
	 * Helper method. Updates location of all active drivers.
	 */
	relocate: function (req, res) {

		Driver.find({ status: 1 }).exec(function (err, rows) {
			if (err) return res.badRequest();

			res.ok();

			rows.forEach(function (row) {

				var loc = {
                    long: 13.39 + (_.random(1000, 9999) / 100000),
                    lat: 52.54 + (_.random(1000, 9999) / 100000)
                }

				Driver.update(row.id, { loc: loc }).exec(function (err, data) {

					if (err) return sails.log.error(err);

					Driver.publishUpdate(row.id, { loc: loc });
				});
			});
		});
	}
};

