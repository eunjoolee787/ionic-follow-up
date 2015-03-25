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


.controller('ProspectsCtrl', function($scope, Chats, $ionicScrollDelegate) {
  $scope.scrollTop = function() {
    $ionicScrollDelegate.resize();
  };

  $scope.data = {
    showDelet: false
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };

  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.prospects = [];
  console.log("tony");
  Chats.all()
  .success(function (data) {
    console.log(data);
    $scope.prospects = data;
    return data;
  })
  .error(function (error) {
    console.log(error);
  });

})

.controller('ProspectsDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.prospect = {};
  Chats.get($stateParams.chatId)
  .then(function (response) {
    $scope.prospect = response.data;
  })
})

.controller('ChatEditCtrl', function($scope, $stateParams, Chats, $http) {
  // $scope.prospect = {};
  // Chats.get($stateParams.chatId)
  // .then(function (response) {
  //   $scope.prospect = response.data;
  // })
 var app = this;

  $scope.prospect = {};
  Chats.get($stateParams.chatId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.chatId, person)
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

.controller('ChatTypeCtrl', function($scope, $stateParams, Chats, $http) {
  var app = this;

  $scope.prospect = {};
  Chats.get($stateParams.chatId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.chatId, person)
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

.controller('ChatDecisionCtrl', function($scope, $stateParams, Chats, $http) {
  var app = this;

  $scope.prospect = {};
  Chats.get($stateParams.chatId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.chatId, person)
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