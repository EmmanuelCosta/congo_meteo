starter.controller('WeatherCtrl', function($scope,$stateParams,WeatherResquestFactory){
  $scope.loading=true;
  $scope.ready=false;
  $scope.Math = Math
  $scope.loadingDaily=true;
  //console.log("callllllllllllllllllllllllllllllll "+$stateParams.city);
  var idCity = $stateParams.city;
  if(typeof idCity === "undefined"){
    idCity="Kinshasa"
  }

  $scope.preferredCityInfo={}
  $scope.weather = WeatherResquestFactory.getWeatherInfos(idCity).then(function(weather){
       $scope.weather = weather;
        $scope.loading=false;
        $scope.ready=true;
        $scope.preferredCityInfo={"city":weather.city,"value":weather.list[0]}
  },function(msg){
    console.log(msg);
  }),

  $scope.weatherDaily = WeatherResquestFactory.getDailyWeather(idCity).then(function(weather){
       $scope.weatherDaily = weather;
        $scope.loadingDaily=false;
  },function(msg){
    console.log(msg);
  }),


    $scope.dateTranslator = function(date){
    $scope.dateTranslator = WeatherResquestFactory.getDateTranslator(date);
  }

    $scope.weatherStatus = function(status){

    $scope.weatherStatus = WeatherResquestFactory.getWeatherStatusTranslator(status).then(function(state){
         $scope.weatherStatus = state;

    },function(msg){
     $scope.weatherStatus = status;
    })
    }
    $scope.weatherImg = function(status){

    $scope.weatherImg = WeatherResquestFactory.getWeatherImgPath(status).then(function(state){
         $scope.weatherImg = state;

    },function(msg){
     $scope.weatherImg = status;
    })
    }



})
