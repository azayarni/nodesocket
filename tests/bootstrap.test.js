var Sails = require('sails');
var should = require('chai').should();
var expect = require('chai').expect();

// Global before hook
before(function (done) {

  this.timeout(15000);

  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'mongo_dev'
    }
  }, function(err, sails) {
    if (err)
      return done(err);
      
      setTimeout(function() {
    
        // Load fixtures
        done(err, sails);
        
      }, 1000);
  });
});

// Global after hook
after(function (done) {
  
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
  

});