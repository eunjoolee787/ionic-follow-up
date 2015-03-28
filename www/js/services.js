angular.module('starter.services', [])


.factory('Prospects', function($http) {
  // Might use a resource here that returns a JSON array


  return {
    all: function() {
      return $http.get("http://localhost:4000/prospects");

    },
    remove: function(prospect) {
      prospects.splice(prospects.indexOf(prospect), 1);
    },
    get: function(prospectId) {
      return $http.get("http://localhost:4000/prospects/"+prospectId);
    },
    delete: function(prospectId) {
      return $http.delete("http://localhost:4000/prospects/"+prospectId);
    }
  };
})

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var promise = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        promise.resolve(result);
      }, function(err) {
        promise.reject(err);
      }, options);

      return promise.promise;
    }
  }
}]);


