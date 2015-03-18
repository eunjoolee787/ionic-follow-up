angular.module('starter.controllers', [])

.controller('DashCtrl', function($http) {
  var app = this;
  app.people = [];

    app.addPerson = function (person) {
      $http.post("http://localhost:4000/form", person)
        .success(function (data) {
          app.people = data;
          console.log(data);
        })
        .error(function (error) {
          console.log(error);
        })
    }

})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.prospects = [];

  Chats.all()
  .success(function (data) {
    // console.log(data);
    $scope.prospects = data;
    return data;
  })
  .error(function (error) {
    console.log(error);
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});