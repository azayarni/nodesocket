/**
 * OwnerController
 *
 * @description :: Server-side logic for managing owners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function (req, res) {
		Owner.findOne(req.param("id")).populate("dogs").exec(function (err, data) {
			if (err) return res.badRequest(err);
			
			res.send(data);
		});
	}
};

