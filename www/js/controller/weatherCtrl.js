starter.controller('WeatherCtrl', function($scope,$filter,$stateParams,WeatherResquestFactory,CongoWeatherFactory){
  $scope.loading=true;
  $scope.ready=false;
  $scope.Math = Math
  $scope.loadingDaily=true;

  //console.log("callllllllllllllllllllllllllllllll "+$stateParams.city);



//  var preferredCityInfo=CongoWeatherFactory.getDef
$scope.defaultCity = CongoWeatherFactory.getDefaultTown();
// console.log("====>   "+defaultTown);
$scope.weatherDaily = WeatherResquestFactory.getDailyWeather($scope.defaultCity).then(function(dailyWeather){
   $scope.weatherDaily = dailyWeather;
      $scope.loadingDaily=false;
      //  console.log("========>>****---- ="+$scope.loadingDaily+  " "+dailyWeather.list[0].weather[0].description);
  },function(msg){
  console.log("========>> ="+msg);
})

  $scope.weather = WeatherResquestFactory.getWeatherInfos($scope.defaultCity).then(function(weather){
       $scope.weather = weather;
        $scope.loading=false;
        $scope.ready=true;
      preferredCityInfo={"city":weather.city,"value":weather.list[0]}
  },function(msg){
    console.log("================> "+msg);
  })

$scope.getPreferredCityInfo = function(){
  return preferredCityInfo;
}

$scope.weatherStatus= [];

$scope.getWeatherStatus = function(status){
    WeatherResquestFactory.getWeatherStatusTranslator(status).then(function(state){
     $scope.weatherStatus.push(state);
},function(msg){
 $scope.weatherStatus = status;
})
}
$scope.getHumidity = function(t){
    return t.humidity;
}

$scope.getSpeed = function(t){
  var number =t.speed*3.6;
    return $filter('number')(number, 1);
}


$scope.weatherImg=[];
$scope.getWeatherImg = function(status){
    WeatherResquestFactory.getWeatherImgPath(status).then(function(state){
      console.log(state);
         $scope.weatherImg.push(state);

    },function(msg){
     $scope.weatherImg = status;
    })
}


$scope.getWeathers = function(){
  return $scope.weather.list;
}

$scope.getWeatherDescription = function(weather){
  return weather.weather[0].description;
}
  $scope.isLoading = function(){
    return loading;
  }

  $scope.isReady = function(){
    return ready;
  }
$scope.getPreferredCity = function(){
  if($scope.loading)
  return {};
  return preferredCityInfo.city.name;
}

$scope.getPreferredCityDate = function(){
  if($scope.loading)
  return {};
  return preferredCityInfo.value.dt;
}

$scope.getPreferredCityDescription = function(){
  if($scope.loading)
  return {};
  return preferredCityInfo.value.weather[0].description;
}

$scope.getDailyCityDate = function (date){

  if($scope.loadingDaily){

    return date.dt;
  }
  return date.dt;
}
$scope.getTemperature = function(t){

  return Math.round(t);
}
$scope.getPreferredCityTemperature = function(){
  if($scope.loading)
  return {};
  return $scope.getTemperature(preferredCityInfo.value.main.temp);
}


  $scope.getDailyWeather = function(){
    return $scope.weatherDaily.list;
  }


$scope.dateTranslator = function(date){
     return WeatherResquestFactory.getDateTranslator(date) ;
}
})
