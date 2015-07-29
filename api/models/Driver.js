/**
* Driver.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true
    },
    loc: {
      type: "json"
    },
    status: {
      type: "integer",
      defaultsTo: 0,
      required: true
    },
    
    // convert loc to api format
    toJSON: function () {

      var obj = this.toObject();

      if (!obj.loc || !obj.loc.coordinates) return obj;

      var loc = obj.loc;

      obj.loc = {
        long: loc.coordinates[0],
        lat: loc.coordinates[1]
      };

      return obj;
    },
  },

  // conver loc to mongo format
  beforeUpdate: function (values, cb) {

    values.loc = { type: "Point", coordinates: [values.loc.long, values.loc.lat] };

    cb();
  },

  search: function (opts, cb) {
    
    Driver.native(function (err, collection) {
      
      collection.geoNear(parseFloat(opts.long), parseFloat(opts.lat), {
        limit: parseFloat(opts.limit), 
        maxDistance: parseFloat(opts.radius), 
        query: {}, 
        distanceMultiplier: 6371,
        spherical: true
      }, cb);
    });
  }
};

