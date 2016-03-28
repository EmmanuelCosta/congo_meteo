// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic','ng-mfb'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.navBar.alignTitle("center")
    $ionicConfigProvider.views.transition("android")
  }
  $stateProvider.state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html',
    abstract: true
  })

  $stateProvider.state('weather', {
    url: '/weather/:city/',
    templateUrl: 'templates/weather.html',
    controller :'WeatherCtrl'
  })


 .state('tab.home', {
 url: '/home',
 views: {
        'home-tab': {
 templateUrl: 'templates/weather.html',
   controller: 'WeatherCtrl'
         }
   }
})

.state('tab.daily', {
url: '/daily',
views: {
       'daily-tab': {
templateUrl: 'templates/daily.html',
  controller: 'WeatherCtrl'
        }
  }
})

  $urlRouterProvider.otherwise('/tab/home');
})


starter.controller('floatingButtonMenuCtrl', function($scope,$window){

  $scope.positions = ['tl', 'tr', 'br', 'bl'];

  $scope.effects = [{
    name: 'Choose an effect here',
  },{
    value: 'slidein',
    name: 'Slide in + fade'
  },{
    value: 'zoomin',
    name: 'Zoom in'
  },{
    value: 'fountain',
    name: 'Fountain'
  }];

  $scope.buttons = [{
    label: 'Actualiser',
    icon: 'ion-refresh',
    funct: 'refresh()'
  },
  {
    label: 'Changer de ville',
    icon: 'ion-paper-airplane',
    funct: 'changeCity()'
  }];

  $scope.chosenEffect = 'zoomin';

  $scope.refresh = function refresh() {

    $window.location.reload(true);
    }

    $scope.changeCity = function changeCity() {

      $window.location.reload(true);
      }

});
