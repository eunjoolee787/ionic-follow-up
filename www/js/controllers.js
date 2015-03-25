angular.module('starter.controllers', [])

//LOGIN
.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http) {
    $scope.data = {};
 
    $scope.login = function() {
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
})

//ADD
.controller('DashCtrl', function($http) {
  var app = this;
  app.people = [];

    app.addPerson = function (person) {
      console.log(person);
      $http.post("http://localhost:4000/form", person)
        .success(function (data) {
          app.people = data;
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        })
    }
    app.toggle = function () {
      console.log("toggle");
    }
})


.controller('ProspectsCtrl', function($scope, Prospects) {
  
  $scope.prospects = [];
  console.log("tony");
  Prospects.all()
  .success(function (data) {
    console.log(data);
    $scope.prospects = data;
    return data;
  })
  .error(function (error) {
    console.log(error);
  });

})

.controller('ProspectsDetailCtrl', function($scope, $stateParams, Prospects) {
  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  })
})

.controller('ProspectsEditCtrl', function($scope, $stateParams, Prospects, $http) {
  // $scope.prospect = {};
  // Prospects.get($stateParams.prospectId)
  // .then(function (response) {
  //   $scope.prospect = response.data;
  // })
 var app = this;

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          app.person = data;
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
})

.controller('ProspectsTypeCtrl', function($scope, $stateParams, Prospects, $http) {
  var app = this;

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          app.people = data;
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
})

.controller('ProspectsDecisionCtrl', function($scope, $stateParams, Prospects, $http) {
  var app = this;

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          app.people = data;
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});