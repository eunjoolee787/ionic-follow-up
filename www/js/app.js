// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// exampleApp.controller("ExampleController", function($scope, $cordovaCamera) {
 
//     $scope.takePicture = function() {
//         var options = { 
//             quality : 75, 
//             destinationType : Camera.DestinationType.DATA_URL, 
//             sourceType : Camera.PictureSourceType.CAMERA, 
//             allowEdit : true,
//             encodingType: Camera.EncodingType.JPEG,
//             targetWidth: 300,
//             targetHeight: 300,
//             popoverOptions: CameraPopoverOptions,
//             saveToPhotoAlbum: false
//         };
 
//         $cordovaCamera.getPicture(options).then(function(imageData) {
//             $scope.imgURI = "data:image/jpeg;base64," + imageData;
//         }, function(err) {
//             // An error occured. Show a message to the user
//         });
//     }
 
// });

angular.module("starter").controller('PictureCtrl', function($scope, $cordovaCamera) {

  document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  }, false);
});

angular.module("starter").config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl as app'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl as app'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl as app'
        }
      }
    })

    .state('tab.chat-edit', {
      url: '/chats/:chatId/edit',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-edit.html',
          controller: 'ChatEditCtrl as app'
        }
      }
    })

    .state('tab.chat-type', {
      url: '/chats/:chatId/type',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-type.html',
          controller: 'ChatTypeCtrl as app'
        }
      }
    })

    .state('tab.chat-decision', {
      url: '/chats/:chatId/decision',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-decision.html',
          controller: 'ChatDecisionCtrl as app'
        }
      }
    })
  .state('tab.export', {
    url: '/export',
    views: {
      'tab-export': {
        templateUrl: 'templates/tab-export.html',
        controller: 'AccountCtrl as app'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login'); // /tab/dash

});