var app = angular.module('app', []);

app.controller('IndexController', function ($http, $log, $scope) {
  
  $scope.drivers = [];
  
  // init map
  var myLatlng = new google.maps.LatLng(52.59491, 13.41432);
  
  var mapOptions = {
      zoom: 11,
      center: myLatlng
    }
    
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // fetch drivers data and subscribe to the updates
  io.socket.get("/drivers/subscribe", function (data) { 
    console.log(data);
    
    $scope.drivers = data;
    
    $scope.drivers.forEach(function(driver, i) {
      $scope.drivers[i].marker = new google.maps.Marker({
            position: new google.maps.LatLng(driver.loc.lat, driver.loc.long),
            map: map,
            title: driver.name
        });
    });
    
    $scope.$digest();
  });

  // add listener to the update events
  io.socket.on("driver", function (event) {
    
    console.log(event);
    
    if (event.verb === "created") {
      
      event.data.marker = new google.maps.Marker({
            position: new google.maps.LatLng(event.data.loc.lat, event.data.loc.long),
            map: map,
            title: event.data.name
      });
      
      $scope.drivers.push(event.data);
      
      $scope.$digest();
      
    } else if (event.verb === "updated") {
      
      var index = _.findIndex($scope.drivers, function(driver) {
        return driver.id === event.id;
      });
      
      _.merge($scope.drivers[index], event.data);
      
      $scope.drivers[index].marker.setPosition(new google.maps.LatLng(event.data.loc.lat, event.data.loc.long));
      
      $scope.$digest();
    } else if (event.verb = "destroyed") {
      
      var drivers = [];
      
      $scope.drivers.forEach(function(driver) {
        if (driver.id !== event.id) {
          drivers.push(driver);
        } else {
          driver.marker.setMap(null);
        }
      });
      
      $scope.drivers = drivers;
      
      $scope.$digest($scope.drivers);
    }
  });

  // create a new driver
  $scope.create = function () {
    
    var data = {
      name : "driver" + _.random(1, 100000), 
      status: 1, 
      loc : {
        long : 13.39 + (_.random(1000, 9999) / 100000), 
        lat : 52.54 + (_.random(1000, 9999) / 100000)}
      };

    $http.post("/drivers", data).success(function (res) {
      // do something
    });
  };
  
  // create a driver
  $scope.update = function (id) {
    
      var data = {
        loc : {
        long : 13.39 + (_.random(1000, 9999) / 100000), 
        lat : 52.54 + (_.random(1000, 9999) / 100000)}
      };
  
      $http.post("/drivers/" + id, data).success(function (res) {
        // do something
      });
  };
  
  // remove driver
  $scope.remove = function (id) {
  
      $http.delete("/drivers/" + id).success(function (res) {
        // do something
      });
  };
  
  // remove driver
  $scope.relocate = function (id) {
  
      $http.post("/drivers/relocate").success(function (res) {
        // do something
      });
  };

});