starter.controller('HomeCtrl', function($scope,$state, $window,$ionicHistory,CongoWeatherFactory,WeatherResquestFactory){


  $scope.towns = CongoWeatherFactory.getTowns().then(function(towns){

        $scope.towns = towns.towns;
  }, function(msg){
    console.log(msg);
  })

  $scope.changeDefaultCity = function(city){
      //WeatherResquestFactory.resetCache();
      CongoWeatherFactory.setDefaultTown(city);
    $window.location.reload(true);
  }
})
