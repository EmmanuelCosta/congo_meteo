//service qui interroge un service exterieur pour recuperer la méteo
starter.factory('WeatherResquestFactory',function($http,$q,$filter){

    var factory = {
      cache : false,
      statusCache :false,
      cacheDaily:false,
      retryDaily:0,
       resetCache : function(){
         factory.cache = false;
         factory.statusCache =false;
         factory.cacheDaily =false;
       },
      getWeatherInfos : function(city){
//cd2a96cc934942f30bdeb1789109c2ea bilute bilutemailinator
//fd20c0280bee7d8fb8ed2fad6a7eba21
      url = "http://api.openweathermap.org/data/2.5/forecast/weather?q=" + city + "&mode=json&units=metric&cnt=10"+"&APPID=fd20c0280bee7d8fb8ed2fad6a7eba21";
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

      getDailyWeather : function getDailyWeather(city){
    console.log("************call try = "+factory.retryDaily);
  //cd2a96cc934942f30bdeb1789109c2ea bilute bilutemailinator
  //fd20c0280bee7d8fb8ed2fad6a7eba21
        url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=10"+"&APPID=fd20c0280bee7d8fb8ed2fad6a7eba21";
          var deferred = $q.defer();

          if(factory.cacheDaily !=false){
    console.log("************call here 1 "+factory.cacheDaily);
            deferred.resolve(factory.cacheDaily);
          }else{
                console.log("************call here 2");
               $http.get(url)
                .success(function(data,status){

                  factory.cacheDaily = data;
                  console.log("************call here 2 = "+ status);
                   deferred.resolve(data);

                })
                .error(function(data, status){
  console.log("************call status = "+status);
                  if(factory.retryDaily<5){

                    console.log("************call retry = "+factory.retryDaily);
                    factory.retryDaily++;
                  }else{
                        console.log("************call end 1");
                    factory.retryDaily =0;
                      deferred.reject("impossible de recuperer les infos du serveur REST");
                  }

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
    getWeatherStatusTranslator : function(state){
            state = $filter('lowercase')(state);
            var deferred = $q.defer();
          //  console.log(state)
             $http.get('localDB/weatherStatus.json')
                  .success(function(data, status){
                   //  console.log("in "+state)
                      for(var keyName in data.status){
                         var value = data.status[keyName];
                         //console.log("1 "+value.state+" "+state)
                         if(value.state === state){
                            deferred.resolve(value.french);
                            return;
                         }
                     }
                  })
                  .error(function(data, status){
                          deferred.reject("impossible de recuperer les infos");
                      })
          return deferred.promise;
    },
    getWeatherImgPath : function(state){
            state = $filter('lowercase')(state);
            var deferred = $q.defer();
            //console.log(state)
             $http.get('localDB/weatherStatus.json')
                  .success(function(data, status){
                   //  console.log("in "+state)
                      for(var keyName in data.status){
                         var value = data.status[keyName];
                        // console.log("1 "+value.state+" "+state)
                         if(value.state === state){
                            deferred.resolve(value.imgSrc);
                            return;
                         }
                     }
                  })
                  .error(function(data, status){
                          deferred.reject("impossible de recuperer les infos");
                      })
          return deferred.promise;
    }
  }



    return factory;
})
