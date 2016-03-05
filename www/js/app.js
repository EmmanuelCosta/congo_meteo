// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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




.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  $stateProvider.state('weather', {
    url: '/weather/:city/',
    templateUrl: 'templates/weather.html',
    controller :'WeatherCtrl'
  })

  $urlRouterProvider.otherwise('/home');
})

.controller('HomeCtrl', function($scope,$state, $ionicHistory,CongoWeatherFactory,WeatherResquestFactory){

  $scope.towns = CongoWeatherFactory.getTowns().then(function(towns){
        $scope.towns = towns;
  }, function(msg){
    alert(msg);
  })

  $scope.search = function(city){
      WeatherResquestFactory.resetCache();
  $state.go('weather', {city: city})
  }
})


.controller('WeatherCtrl', function($scope,$stateParams,WeatherResquestFactory){

  $scope.Math = Math
  console.log("callllllllllllllllllllllllllllllll");
  $scope.weather = WeatherResquestFactory.getWeatherInfos($stateParams.city).then(function(weather){
      $scope.weather = weather;
  },function(msg){
    alert(msg);
  }),

    $scope.dateTranslator = function(date){
    $scope.dateTranslator = WeatherResquestFactory.getDateTranslator(date);

    }

    $scope.weatherStatus = function(status){
    $scope.weatherStatus = WeatherResquestFactory.getWeatherStatusTranslator(status);

    }

})

//service qui interroge un service exterieur pour recuperer la méteo
.factory('WeatherResquestFactory',function($http,$q,$filter){

    var factory = {
      cache : false,
      statusCache :false,
       resetCache : function(){
         factory.cache = false;
         factory.statusCache =false;
       },
      getWeatherInfos : function(city){
//cd2a96cc934942f30bdeb1789109c2ea bilute bilutemailinator
//fd20c0280bee7d8fb8ed2fad6a7eba21
      url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=10"+"&APPID=fd20c0280bee7d8fb8ed2fad6a7eba21";
        var deferred = $q.defer();

        if(factory.cache !=false){

          deferred.resolve(factory.cache);
        }else{
             $http.get(url)
              .success(function(data,status){

                factory.cache = data;
                 deferred.resolve(data);

              })
              .error(function(data, status){
                  deferred.reject("impossible de recuperer les infos du serveur REST");
              })
            }
              return deferred.promise;
      },

      getDateTranslator : function(date){
        var congoWeatherDate={};
        var day = $filter('date')(date*1000,'EEE');

      //  console.log(day+" day = "+(day==="Sat"))
        if(day === "Sun"){
          congoWeatherDate.day = "Dimanche";
        }else if (day === "Mon") {
          congoWeatherDate.day = "Lundi";
        }
        else if (day === "Tue") {
          congoWeatherDate.day = "Mardi";
        }else if (day === "Wed") {
          congoWeatherDate.day = "Mercredi";
        }else if (day === "Thu") {
          congoWeatherDate.day = "Jeudi";
        }else if (day === "Fri") {
          congoWeatherDate.day = "Vendredi";
        }else if (day === "Sat") {
          congoWeatherDate.day = "Samedi";
        }

        var translateDate = $filter('date')(date*1000,'dd/MM');
        congoWeatherDate.date = translateDate;
      return congoWeatherDate;
    },
    getWeatherStatusTranslator : function(weatherKey){
            weatherKey = $filter('lowercase')(weatherKey);
          if(weatherKey ==="clear sky"){
            return "Ensoleillé";
          }
          else if(weatherKey ==="few clouds"){
            return "Légèrement couvert";
          }
          else if(weatherKey ==="scattered clouds"){
            return "Gros nuage";
          }
          else if(weatherKey ==="broken clouds"){
            return "Nuages de pluie";
          }
          else if(weatherKey ==="broken clouds"){
            return "Pluies diluviennes";
          }
          else if(weatherKey ==="shower rain"){
            return "grosses pluies";
          }else if(weatherKey ==="light rain"){
            return "Petites pluies";
          }
          else if(weatherKey ==="moderate rain"){
            return "pluies moyennes";
          }
          else if(weatherKey ==="rain"){
            return "Pluvieux";
          }
        else  if(weatherKey ==="thunderstorm"){
            return "Orageux";
          }
        else  if(weatherKey ==="snow"){
            return "Neigeux";
          }
          else if(weatherKey ==="mist"){
            return "Brumeux";
        }else{
          return weatherKey;
        }
    }
  }



    return factory;
})



.factory('CongoWeatherFactory',function($http,$q){

    var factory = {

      getTowns : function(){
        var deferred = $q.defer();
        $http.get('localDB/area.json')
              .success(function(data, status){
                  factory.towns = data.cities;

                  deferred.resolve(factory.towns);
              })
              .error(function(data, status){
                  deferred.reject("impossible de recuperer les infos");
              })
              return deferred.promise;
      }
    }
    return factory;
})
