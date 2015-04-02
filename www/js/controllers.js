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
.controller('DashCtrl', function($http, $scope) {
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


.controller('ProspectsDetailCtrl', function($scope, $stateParams, Prospects, $ionicPopup) {
  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  })

   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Delete',
       template: 'Are you sure you want to delete this contact?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         Prospects.delete($stateParams.prospectId)
       } else {
         console.log('You are not sure');
       }
     });
   };

   // Save Export CSV File
   $scope.exportRecord= function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Export Record',
         template: 'Are you sure you want to export this contact?'
     });
     confirmPopup.then(function(res) {
       if(res) {
      cordova.plugins.email.open({
      to:      'max@mustermann.de',
      cc:      'erika@mustermann.de',
      bcc:     ['john@doe.com', 'jane@doe.com'],
      subject: 'Greetings',
      body:    'How are you? Nice greetings from Leipzig'
    });
       } else {
         console.log('You are not sure');
       }
     });
   };

})




.controller('ProspectsEditCtrl', function($scope, $stateParams, Prospects, $http, $ionicHistory) {
 var app = this;

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
    if ($scope.prospect.previouslysaved === "true"){
     $scope.prospect.previouslysaved = true;
     } else {
      $scope.prospect.previouslysaved = false;
     }
      if ($scope.prospect.previouslybaptized === "true"){
       $scope.prospect.previouslybaptized = true;
     } else {
      $scope.prospect.previouslybaptized = false;
     }
      if ($scope.prospect.joinchurch === "true"){
       $scope.prospect.joinchurch = true;
     } else {
      $scope.prospect.joinchurch = false;
     }
    $scope.prospect.modifieddate = new Date();
    console.log(response.data);
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          app.person = data;
          console.log(data);
          $ionicHistory.goBack();
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
  // $scope.today = new Date();
})

.controller('ProspectsTypeCtrl', function($scope, $stateParams, Prospects, $http, $ionicHistory) {
  var app = this;

  // $scope.doRefresh = function() {
  //   Prospects.get($stateParams.prospectId)
  //   .then(function (response) {
  //      {
  //      $scope.prospect = response.data;
  //       if ($scope.prospect.visit === "true"){
  //        $scope.prospect.visit = true;
  //      } else {
  //       $scope.prospect.visit = false;
  //      }
  //      if ($scope.prospect.letter === "true"){
  //        $scope.prospect.letter = true;
  //      } else {
  //       $scope.prospect.letter = false;
  //      }
  //      if ($scope.prospect.visitchurch === "true"){
  //        $scope.prospect.visitchurch = true;
  //      } else {
  //       $scope.prospect.visitchurch = false;
  //      }
  //      $scope.$broadcast('scroll.refreshComplete');
  //     }
  //   });
  // };

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
  if ($scope.prospect.visit === "true"){
     $scope.prospect.visit = true;
   } else {
    $scope.prospect.visit = false;
   }
   if ($scope.prospect.letter === "true"){
     $scope.prospect.letter = true;
   } else {
    $scope.prospect.letter = false;
   }
   if ($scope.prospect.visitchurch === "true"){
     $scope.prospect.visitchurch = true;
   } else {
    $scope.prospect.visitchurch = false;
   }
   if ($scope.prospect.phonecall === "true"){
     $scope.prospect.phonecall = true;
   } else {
    $scope.prospect.phonecall = false;
   }
   if ($scope.prospect.emailed === "true"){
     $scope.prospect.emailed = true;
   } else {
    $scope.prospect.emailed = false;
   }
    $scope.prospect.modifieddateType = new Date();
    console.log($scope.prospect);
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          // app.people = data;
          app.person = data;
          console.log(data);
        // $scope.state.go('tab.lists-detail');
        // $ionicGoBack($event);
        // $rootScope.$viewHistory.currentView = $rootScope.$viewHistory.backView;
        // $state.go('tab.lists-detail');
        $ionicHistory.goBack();
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
    // $scope.today = new Date();
})

.controller('ProspectsDecisionCtrl', function($scope, $stateParams, Prospects, $http, $ionicHistory) {
  var app = this;

  $scope.prospect = {};
  Prospects.get($stateParams.prospectId)
  .then(function (response) {
    $scope.prospect = response.data;
    if ($scope.prospect.saved === "true"){
     $scope.prospect.saved = true;
     } else {
      $scope.prospect.saved = false;
     }
    if ($scope.prospect.baptized === "true"){
     $scope.prospect.baptized = true;
     } else {
      $scope.prospect.baptized = false;
     }
     if ($scope.prospect.joinedthechurch === "true"){
     $scope.prospect.joinedthechurch = true;
     } else {
      $scope.prospect.joinedthechurch = false;
     }
    $scope.prospect.modifieddateDecision = new Date();
    console.log(response.data);
  })

  app.editPerson = function (person) {
      $http.put("http://localhost:4000/prospects/"+$stateParams.prospectId, person)
        .success(function (data) {
          // app.people = data;
          app.person = data;
          console.log(data);
          $ionicHistory.goBack();
        })
        .error(function (error) {
          console.log(error);
        })
    }

    app.toggle = function () {
    console.log("toggle");
  }
    // $scope.today = new Date();
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});