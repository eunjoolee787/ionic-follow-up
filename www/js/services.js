angular.module('starter.services', [])

.factory('Session', function($http) {
  return {
    loggedIn: false,
    login: function(){
      $http.post("http://localhost:4000/validateUser", {username: $scope.data.username, password: $scope.data.password})
        .success(function(data) {
          if(data.success)
            $state.go('tab.add');
          else {
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          }
        })
        .error(function (error) {
          console.log(error);
        });
    }
  }};

})
.factory('Prospects', function($http) {

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
});