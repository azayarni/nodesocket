var request = require('supertest');

var owner_id, dog_id, driver_id;

describe('APItests', function() {

    describe('create owner', function() {

        it('should return new owner object', function (done) {

            var id = _.random(0, 1000);

            var data = {
                name : "Test owner " + id
            };

            request(sails.hooks.http.app)
                .post('/owners').type('application/json')
                .send(data)
                .expect(201, function(err, res) {
                    
                    //console.log(err, res.body);

                    owner_id = res.body.id;

                    done(err);
                });
        });
    });

    describe('create and assign a dog to the owner', function() {

        it('should return new dog object', function (done) {

            var id = _.random(0, 1000);

            var data = {
                name : "Test dog " + id,
                owner : owner_id
            };

            request(sails.hooks.http.app)
                .post('/dogs').type('application/json')
                .send(data)
                .expect(201, function(err, res) {
                    
                    //console.log(err, res.body);

                    dog_id = res.body.id;

                    done(err);
                });
        });
    });

    describe('create a driver', function() {

        it('should return new driver object', function (done) {

            var id = _.random(0, 1000);

            var data = {
                name : "Test driver " + id,
            };

            request(sails.hooks.http.app)
                .post('/drivers').type('application/json')
                .send(data)
                .expect(201, function(err, res) {
                    
                    //console.log(err, res.body);

                    driver_id = res.body.id;

                    done(err);
                });
        });
    });
    

    describe('update dogs location', function() {

        it('should return ok', function (done) {

            var data = {
                loc : {
                    long: 13.3975693,
                    lat: 52.5493467
                }
            };

            request(sails.hooks.http.app)
                .put('/dogs/' + dog_id).type('application/json')
                .send(data)
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    });

    describe('update drivers location', function() {

        it('should return ok', function (done) {

            var data = {
                loc : {
                    long: 13.3975693,
                    lat: 52.5493467
                }
            };

            request(sails.hooks.http.app)
                .put('/drivers/' + driver_id).type('application/json')
                .send(data)
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    });
    
    describe('get driver', function() {

        it('should return driver object', function (done) {

            request(sails.hooks.http.app)
                .get('/drivers/' + driver_id).type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    }); 
    
    describe('get owner with dogs', function() {

        it('should return dog object', function (done) {

            request(sails.hooks.http.app)
                .get('/owners/' + owner_id).type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    }); 
    
    describe('get dog', function() {

        it('should return dog object', function (done) {

            request(sails.hooks.http.app)
                .get('/dogs/' + dog_id).type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    }); 
    
    describe('list dogs', function() {

        it('should return dogs array', function (done) {

            request(sails.hooks.http.app)
                .get('/dogs').type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body.length);

                    done(err);
                });
        });
    }); 
    
    describe('list drivers', function() {

        it('should return drivers array', function (done) {

            request(sails.hooks.http.app)
                .get('/drivers').type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body.length);

                    done(err);
                });
        });
    }); 
    
    describe('search for drivers', function() {

        it('should return drivers around', function (done) {

            request(sails.hooks.http.app)
                .get('/drivers/search?long=13.3975693&lat=52.5493467&limit=1000&radius=1000').type('application/json')
                .expect(200, function(err, res) {
                    
                    //console.log(err, res.body);

                    done(err);
                });
        });
    }); 
    
});