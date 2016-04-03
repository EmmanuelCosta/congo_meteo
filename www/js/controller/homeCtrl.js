starter.controller('HomeCtrl', function($scope,$state, $ionicHistory,CongoWeatherFactory,WeatherResquestFactory){

  $scope.towns = CongoWeatherFactory.getTowns().then(function(towns){

        $scope.towns = towns.towns;
  }, function(msg){
    console.log(msg);
  })

  $scope.search = function(city){
      //WeatherResquestFactory.resetCache();
      CongoWeatherFactory.setDefaultTown(city);
  $state.go('/home')
  }
})
